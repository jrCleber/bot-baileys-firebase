import makeWASocket, {
   ConnectionState,
   DisconnectReason,
   fetchLatestBaileysVersion,
   proto,
   SocketConfig,
   useSingleFileAuthState,
   WASocket,
} from '@adiwajshing/baileys';
import { DefaultCommandsKeys } from '../../types/types';
import { ChatManagement } from './manage.chat/chat.management';
import { Boom } from 'boom';
import { checkPath } from '../../utils/check.path';
import P from 'pino';
import { DefaultCommands } from './commands/commands';
import { DbFirestore } from '../../firebase/db';
import { FieldName } from '../../utils/enum';

type ISession = { sessionName: string };

export class BotStartupService {
   constructor(private chatManagement: ChatManagement, private defaultCommands: DefaultCommands) {
      this._brokerController = chatManagement.brokerService.brokerController;
   }

   private readonly _brokerController: DbFirestore;
   private _command: DefaultCommandsKeys;
   private readonly _pathMd = './sessionsMD/';

   private _isgroup(jid: string) {
      const regexp = new RegExp(/^\d{18}@g.us$/);
      return regexp.test(jid);
   }

   private _connectionUpdate(sock: WASocket, sessionName: string) {
      sock.ev.on(
         'connection.update',
         ({ connection, lastDisconnect, qr }: Partial<ConnectionState>) => {
            if (qr) {
               console.log('qrcode: ', qr);
            }
            if (connection === 'close') {
               const shouldRecnnect =
                  (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
               if (shouldRecnnect) {
                  this.execute({ sessionName });
               }
            } else if (connection === 'open') {
               console.log('CONNECTED WHATSAPP MD');
            }
         },
      );
   }

   public async execute({ sessionName }: ISession) {
      checkPath(this._pathMd);

      const { version } = await fetchLatestBaileysVersion();
      const { state, saveState } = useSingleFileAuthState(this._pathMd + sessionName + '.json');

      const settings: Partial<SocketConfig> = {
         printQRInTerminal: true,
         connectTimeoutMs: 60_000,
         auth: state,
         logger: P({ level: 'error' }),
         version,
         getMessage: async (key: proto.IMessageKey) => {
            return { conversation: 'hi' };
         },
      };

      const sock = makeWASocket(settings);

      this._connectionUpdate(sock, sessionName);

      sock.ev.on('creds.update', saveState);

      sock.ev.on('messages.upsert', async ({ messages, type }) => {
         const received = messages[0];
         const jid = received.key.remoteJid;

         if (!this._isgroup(jid) && !received.key.fromMe && jid !== 'status@broadcast') {
            console.log('MESSAGE: ', received);

            const documentReferemces = await this._brokerController.getDocumetId(jid);

            if (documentReferemces && documentReferemces.exists) {
               const documentData = documentReferemces.data();
               this._command = documentData[FieldName.codeStage];
            } else {
               this._command = 'initialChat';
               this._brokerController.insertDocWithId(jid, {
                  [FieldName.codeStage]: this._command,
               });
            }

            for (const [key, func] of Object.entries(this.defaultCommands)) {
               if (typeof func === 'function' && func(received)) {
                  this._command = key as DefaultCommandsKeys;
                  break;
               }
            }

            const management = this.chatManagement[this._command];

            if (management) {
               management(received, sock);
            } else {
               console.log('Error - f management: ', management);
            }
         }
      });
   }
}
