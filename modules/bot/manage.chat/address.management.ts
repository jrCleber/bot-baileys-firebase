import { proto, WASocket } from '@adiwajshing/baileys';
import { ActionButton, TAddress, TCEP, TDataTemp } from '../../../types/types';
import { BrokerService } from '../../broker/broker.service';
import axios from 'axios';
import { FieldName } from '../../../utils/enum';

export class AddressManagement {
   // eslint-disable-next-line prettier/prettier
   constructor() { }

   public brokerService: BrokerService;
   public botProfile: typeof import('../../../json.config/bot.profile.json');
   public chatActions: typeof import('../../../json.config/chat.actions.json');
   public fieldValue: typeof import('firebase-admin').firestore.FieldValue;
   public createButtons: (actionsList: ActionButton[]) => proto.IHydratedTemplateButton[];
   public seeTyping: (sock: WASocket, msgKey: proto.IMessageKey) => Promise<void>;
   public displayOrder: (data: TDataTemp) => string;

   private async _getCep(zipCode: string) {
      const instance = axios.create({ baseURL: 'https://viacep.com.br/' });
      return await instance.get(`ws/${zipCode}/json/`);
   }

   private _checkReceivedText(received: proto.IWebMessageInfo): string {
      let receivedText: string;

      if (received.message?.conversation) {
         receivedText = received.message.conversation;
      } else if (received.message?.extendedTextMessage) {
         receivedText = received.message.extendedTextMessage.text;
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.conversation) {
            receivedText = received.message.ephemeralMessage.message.conversation;
         } else if (received.message.ephemeralMessage.message?.extendedTextMessage) {
            receivedText = received.message.ephemeralMessage.message.extendedTextMessage.text;
         }
      }

      return receivedText;
   }

   private _responseError(received: proto.IWebMessageInfo, sock: WASocket) {
      const jid = received.key.remoteJid;
      sock
         .sendMessage(
            jid,
            { text: 'Este *CEP* não não é válido.\nDigite novamente o cep:' },
            { quoted: received },
         )
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f AddressManagement - _responseError: ', result);
         })
         .catch((err) => console.log('Error - f AddressManagement - _responseError: ', err));
   }

   private _responseSuccess(received: proto.IWebMessageInfo, sock: WASocket, text: string) {
      const jid = received.key.remoteJid;
      sock
         .sendMessage(jid, { text })
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f AddressManagement - _responseSuccess: ', result);
         })
         .catch((err) => console.log('Error - f AddressManagement - _responseSuccess: ', err));
   }

   public readonly checkZipCode = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      await this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const receivedText = this._checkReceivedText(received);

      if (receivedText) {
         const regexp = new RegExp(/[\d]+/gm);
         const match = receivedText.match(regexp);

         let zipCode = '';
         match.forEach((z) => (zipCode += z));

         if (zipCode.length === 8) {
            const response = await this._getCep(zipCode);
            if (response.data.erro) {
               this._responseError(received, sock);
            } else {
               const cep: TCEP = response.data;
               const address: TAddress = {};

               address.zipCode = cep.cep;
               address.uf = cep.uf;
               address.city = cep.localidade;

               let sendText: string;
               if (cep.bairro === '') {
                  sendText = `*Cidade:* ${address.city}\n
                  Digite agora o seu bairro:`.replace(/^ +/gm, '');
                  this._responseSuccess(received, sock, sendText);
                  this.brokerService.brokerController.updateDoc(
                     jid,
                     FieldName.subStage,
                     'checkDistrict',
                  );
               } else if (cep.logradouro === '') {
                  address.distryct = cep.bairro;
                  sendText = `➠ *Cidade:* ${address.city}
                  ➠ *Bairro:* ${address.distryct}\n
                  Digite agora o seu logradouro: (rua, ou avenida, ou rodovia, etc)`.replace(
                     /^ +/gm,
                     '',
                  );
                  this._responseSuccess(received, sock, sendText);
                  this.brokerService.brokerController.updateDoc(
                     jid,
                     FieldName.subStage,
                     'checkPublicPlace',
                  );
               } else {
                  address.distryct = cep.bairro;
                  address.publicPlace = cep.logradouro;
                  sendText = `➠ *Cidade:* ${address.city}
                  ➠ *Bairro:* ${address.distryct}
                  ➠ *Logradouro*: ${address.publicPlace}\n
                  Digite agora o numero da residência para a entrega:`.replace(/^ +/gm, '');
                  this._responseSuccess(received, sock, sendText);
                  this.brokerService.brokerController.updateDoc(
                     jid,
                     FieldName.subStage,
                     'checkNumber',
                  );
               }
               this.brokerService.brokerController.updateDoc(jid, FieldName.tempAddress, address);
            }
         } else {
            this._responseError(received, sock);
         }
      }
   };

   public readonly checkDistrict = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      await this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
      const documentData = documentReferemces!.data();

      const address: TAddress = documentData[FieldName.tempAddress];
      address.distryct = this._checkReceivedText(received);

      this.brokerService.brokerController.updateManyFields(jid, {
         [FieldName.tempAddress]: address,
         [FieldName.subStage]: 'checkPublicPlace',
      });

      sock
         .sendMessage(jid, {
            text: '*Digite agora o logradouro.*\n(rua, avenida, rodovia, etc)\n\n*Ex:* Rua Dom Joaquim Silva',
         })
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f checkDistrict: ', result);
         })
         .catch((err) => console.log('Error - f checkDistrict: ', err));
   };

   public readonly checkPublicPlace = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      await this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
      const documentData = documentReferemces!.data();

      const address: TAddress = documentData[FieldName.tempAddress];
      address.publicPlace = this._checkReceivedText(received);

      this.brokerService.brokerController.updateManyFields(jid, {
         [FieldName.tempAddress]: address,
         [FieldName.subStage]: 'checkNumber',
      });

      sock
         .sendMessage(jid, {
            text: '*Digite agora o número se houver.*\n\n*Ex:* 1254 ou S/N',
         })
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f checkPublicPlace: ', result);
         })
         .catch((err) => console.log('Error - f checkPublicPlace: ', err));
   };

   public readonly checkNumber = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      await this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
      const documentData = documentReferemces!.data() as TDataTemp;

      const address = documentData[FieldName.tempAddress] as TAddress;
      address.number = this._checkReceivedText(received);

      this.brokerService.brokerController.updateManyFields(jid, {
         [FieldName.tempAddress]: address,
         [FieldName.codeStage]: 'orderEnd',
      });

      documentData.tempAddress = address;

      const textDisplayOrder = `*produtos*\n\n${this.displayOrder(documentData)}`
         .toUpperCase()
         .replace(/^ +/gm, '');
      sock
         .sendMessage(jid, {
            text: textDisplayOrder,
            footer: this.botProfile.shortName,
            templateButtons: this.createButtons(this.chatActions.buttosnOrderEnd),
         })
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f checkNumber - textDisplayOrder: ', result);
         })
         .catch((err) => console.log('Error - f checkNumber - textDisplayOrder: ', err));
   };
}
