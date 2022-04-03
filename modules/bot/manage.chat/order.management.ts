import { delay, proto, WASocket } from '@adiwajshing/baileys';
import { ActionButton, DefaultCommandsKeys, TDataTemp, TOrder } from '../../../types/types';
import { FieldName } from '../../../utils/enum';
import { BrokerService } from '../../broker/broker.service';

export class OrderManagement {
   // eslint-disable-next-line prettier/prettier
   constructor() { }

   public brokerService: BrokerService;
   public botProfile: typeof import('../../../json.config/bot.profile.json');
   public chatActions: typeof import('../../../json.config/chat.actions.json');
   public fieldValue: typeof import('firebase-admin').firestore.FieldValue;
   public displayOrder: (data: TDataTemp) => string;
   public createButtons: (actionsList: ActionButton[]) => proto.IHydratedTemplateButton[];
   public seeTyping: (sock: WASocket, msgKey: proto.IMessageKey) => void;

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

   public readonly validateQuantity = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const receivedText = this._checkReceivedText(received);

      if (receivedText) {
         if (Number.parseInt(receivedText) && Number.parseInt(receivedText) > 0) {
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces!.data();

            const orderList: TOrder[] = documentData[FieldName.tempOrderList];
            const index = orderList.length - 1;

            const order = orderList[index];

            /**
             * NOTE: in firebase it is still not possible to update an item in the array, either we remove or add it.
             * so we will remove the order object captured in orderList from the database
             */
            await this.brokerService.brokerController.updateDoc(
               jid,
               FieldName.tempOrderList,
               this.fieldValue.arrayRemove(order),
            );

            order.quantity = parseInt(receivedText);

            /* replacing order in the database array */
            await this.brokerService.brokerController.updateDoc(
               jid,
               FieldName.tempOrderList,
               this.fieldValue.arrayUnion(order),
            );

            sock
               .sendMessage(jid, {
                  text: 'Você deseja adcionar um novo item ao pedido?',
                  footer: this.botProfile.shortName,
                  templateButtons: this.createButtons(this.chatActions.buttonsAddItemOrder),
               })
               .then((result) => {
                  sock.sendPresenceUpdate('paused', jid);
                  this.brokerService.brokerController.updateDoc(
                     jid,
                     FieldName.subStage,
                     'addOrder',
                  );
                  console.log('Succsses - f validateQuantity: ', result);
               })
               .catch((err) => console.log('Error - f validateQuantity: ', err));
         } else {
            sock
               .sendMessage(jid, {
                  text: `Então🤨! A quantidade digitada *(* ${receivedText} *)* para o produto deve ser um número inteiro maior que zero.\n
                  ⚠ *ATENÇÃO* ⚠
                  ❱❱ DIGITE UM VALOR *NUMÉRICO INTEIRO*
                  ➥ *Ex: 2*\n
                  Ou clique no botão e cancele o pedido.`.replace(/^ +/gm, ''),
               })
               .then((result) => {
                  sock.sendPresenceUpdate('paused', jid);
                  console.log('Succsses - f validateQuantity - < 0: ', result);
               })
               .catch((err) => console.log('Error - f validateQuantity - < 0: ', err));
         }
      } else {
         sock
            .sendMessage(jid, {
               text: 'Desculpe! Houve um erro interno.\nDigite novamente a qunatidade:',
            })
            .then((result) => {
               sock.sendPresenceUpdate('paused', jid);
               console.log('Succsses - f validateQuantity - internal error: ', result);
            })
            .catch((err) => console.log('Error - f validateQuantity - internal error: ', err));
      }
   };

   public readonly addOrder = (
      received: proto.IWebMessageInfo,
      sock?: WASocket,
   ): DefaultCommandsKeys => {
      const jid = received.key.remoteJid;
      this.brokerService.brokerController.updateDoc(jid, FieldName.subStage, null);
      return 'initialOrder';
   };

   public readonly notAddOrder = async (received: proto.IWebMessageInfo, sock: WASocket) => {
      this.seeTyping(sock, received.key);

      const jid = received.key.remoteJid;

      const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
      const documentData = documentReferemces!.data() as TDataTemp;

      const textDisplayOrder = `*produtos*\n\n${this.displayOrder(documentData)}`
         .toUpperCase()
         .replace(/^ +/gm, '');

      sock
         .sendMessage(jid, {
            text: textDisplayOrder,
            footer: this.botProfile.shortName,
            templateButtons: this.createButtons(this.chatActions.buttonsOrder),
         })
         .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f notAdd: ', result);
         })
         .catch((err) => console.log('Error - f notAdd: ', err));
   };
}
