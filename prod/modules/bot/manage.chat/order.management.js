"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderManagement = void 0;
const enum_1 = require("../../../utils/enum");
class OrderManagement {
    constructor() {
        this.validateQuantity = async (received, sock) => {
            this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const receivedText = this.checkReceivedText(received);
            if (receivedText) {
                if (Number.parseInt(receivedText) && Number.parseInt(receivedText) > 0) {
                    const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
                    const documentData = documentReferemces.data();
                    const orderList = documentData[enum_1.FieldName.tempOrderList];
                    const index = orderList.length - 1;
                    const order = orderList[index];
                    await this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.tempOrderList, this.fieldValue.arrayRemove(order));
                    order.quantity = parseInt(receivedText);
                    await this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.tempOrderList, this.fieldValue.arrayUnion(order));
                    sock
                        .sendMessage(jid, {
                        text: 'Você deseja adcionar um novo item ao pedido?',
                        footer: this.botProfile.shortName,
                        templateButtons: this.createButtons(this.chatActions.buttonsAddItemOrder),
                    })
                        .then((result) => {
                        sock.sendPresenceUpdate('paused', jid);
                        this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, 'addOrder');
                        console.log('Succsses - f validateQuantity: ', result);
                    })
                        .catch((err) => console.log('Error - f validateQuantity: ', err));
                }
                else {
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
            }
            else {
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
        this.addOrder = (received, sock) => {
            const jid = received.key.remoteJid;
            this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, null);
            return 'initialOrder';
        };
        this.notAddOrder = async (received, sock) => {
            this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
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
}
exports.OrderManagement = OrderManagement;
