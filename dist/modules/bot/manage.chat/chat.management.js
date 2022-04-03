"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManagement = void 0;
const baileys_1 = require("@adiwajshing/baileys");
const fs_1 = require("fs");
const enum_1 = require("../../../utils/enum");
const dayjs_1 = __importDefault(require("dayjs"));
class ChatManagement {
    constructor(brokerService, orderManagement, orderCommands, addressmanagement, botProfile, chatActions, productList, fieldValue) {
        this.brokerService = brokerService;
        this.orderManagement = orderManagement;
        this.orderCommands = orderCommands;
        this.addressmanagement = addressmanagement;
        this.botProfile = botProfile;
        this.chatActions = chatActions;
        this.productList = productList;
        this.fieldValue = fieldValue;
        this.initialChat = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            let profilePictureUrl;
            try {
                profilePictureUrl = await sock.profilePictureUrl(jid);
            }
            catch (error) {
                profilePictureUrl = null;
            }
            this.brokerService.customerController
                .insertDocument({
                pushName: received.pushName,
                profilePictureUrl,
                waid: jid,
            })
                .then((customerId) => this.brokerService.brokerController.insertDocWithId(jid, {
                createAt: Date.now(),
                customerId,
                [enum_1.FieldName.codeStage]: 'startService',
            }));
            sock
                .sendMessage(jid, {
                text: `Oi! Bem vindo ao *${this.botProfile.companyName}*!
            Eu sou o *${this.botProfile.botName}* 🤖, e estou aqui para auxiliar no seu atendimento.
            Qual o seu *nome*?😁`.replace(/^ +/gm, ''),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f initialChat: ', result);
            })
                .catch((err) => console.log('Error - f initialChat: ', err));
        };
        this.startService = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            sock
                .sendMessage(jid, {
                text: `Ótimo *${this._checkReceivedText(received)}*, então vmos iniciar o seu atendimento!
            Como eu posso te ajudar?😁`.replace(/^ +/gm, ''),
                footer: this.botProfile.shortName,
                templateButtons: this._createButtons(this.chatActions.buttonsListInit),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                this.brokerService.customerController.updateDocument({
                    idDoc: jid,
                    field: 'name',
                    data: this._checkReceivedText(received),
                });
                console.log('Succsses - f initialChat: ', result);
            })
                .catch((err) => console.log('Error - f initialChat: ', err));
        };
        this.sendMenuImage = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const pathImage = './data/assets/';
            const dir = (0, fs_1.opendirSync)(pathImage);
            let page = 1;
            for await (const dirent of dir) {
                sock
                    .sendMessage(jid, {
                    caption: `Página ${page}`,
                    image: { url: pathImage + dirent.name },
                })
                    .then((result) => console.log('Succsses - f sendMenu: ', result))
                    .catch((err) => console.log('Error - f sendMenu image: ', err));
                page++;
                await (0, baileys_1.delay)(700);
            }
            await (0, baileys_1.delay)(1500);
            sock
                .sendMessage(jid, {
                text: 'Quandp estiver pronto,\nclique em *Fazer um pedido* para continuarmos o atendimento',
                footer: this.botProfile.shortName,
                templateButtons: this._createButtons(this.chatActions.buttonsViewMenu),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f sendMenu: ', result);
            })
                .catch((err) => console.log('Error - f sendMenu image: ', err));
        };
        this.otherOptions = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            sock
                .sendMessage(jid, {
                text: 'Em que mais eu posso te ajudar?🤔',
                footer: this.botProfile.shortName,
                templateButtons: this._createButtons(this.chatActions.buttonsOtherOptions),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f otherOptions: ', result);
            })
                .catch((err) => console.log('Error - f otherOptions image: ', err));
        };
        this.callBot = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            sock
                .sendMessage(jid, {
                text: 'Ooooiii! Você me chamou!?🧐\nNo que eu posso te ajudar?',
                footer: this.botProfile.shortName,
                templateButtons: this._createButtons(this.chatActions.buttonsListInit),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                this.brokerService.brokerController.insertDocWithId(jid, { createAt: Date.now() });
                console.log('Succsses - f callBot: ', result);
            })
                .catch((err) => console.log('Error - f callBot image: ', err));
        };
        this.initialOrder = async (received, sock, addOrder = false) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            if (!addOrder) {
                this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.codeStage, 'openOrder');
            }
            sock
                .sendMessage(jid, {
                title: `🍔 ${this.botProfile.companyName.toUpperCase()} 🍟`,
                text: 'Clique no botão para abrir o cardápio!',
                buttonText: '➠ cardápio'.toUpperCase(),
                footer: this.botProfile.shortName + '\nVeja online: https://example.com.br/products',
                sections: this._createList(),
            })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f initOrder: ', result);
            })
                .catch((err) => console.log('Error - f initOrder: ', err));
        };
        this.openOrder = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            let itemSelected = {
                title: '',
                description: '',
                price: 0,
                category: '',
                id: '',
            };
            if (received.message.listResponseMessage) {
                const listResponse = received.message.listResponseMessage;
                itemSelected = this.productList.find((item) => item.id === listResponse.singleSelectReply.selectedRowId);
                const order = {
                    title: itemSelected.title,
                    price: itemSelected.price,
                    category: itemSelected.category,
                    description: itemSelected.description,
                    productId: itemSelected.id,
                };
                this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.tempOrderList, this.fieldValue.arrayUnion(order));
                sock
                    .sendMessage(jid, {
                    text: `*${received.pushName.toUpperCase()}*
               Digite agora a quantidade para o produto *${order.title.toUpperCase()}*\n
               ⚠ ATENÇÃO ⚠
               ❱❱❱ DIGITE UM VALOR NUMÉRICO INTEIRO
               ➥ Ex: 2\n
               Ou clique no botão e cancele o pedido.`.replace(/^ +/gm, ''),
                    footer: this.botProfile.shortName,
                    templateButtons: this._createButtons(this.chatActions.buttonCancell),
                })
                    .then((result) => {
                    sock.sendPresenceUpdate('paused', jid);
                    this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, 'validateQuantity');
                    console.log('Succsses - f openOrder: ', result);
                })
                    .catch((err) => console.log('Error - f openOrder image: ', err));
            }
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            this._command = documentData[enum_1.FieldName.subStage];
            for (const [key, func] of Object.entries(this.orderCommands)) {
                if (typeof func === 'function' && func(received)) {
                    this._command = key;
                    break;
                }
            }
            this.orderManagement.brokerService = this.brokerService;
            this.orderManagement.botProfile = this.botProfile;
            this.orderManagement.chatActions = this.chatActions;
            this.orderManagement.fieldValue = this.fieldValue;
            this.orderManagement.seeTyping = this._seeTyping;
            this.orderManagement.createButtons = this._createButtons;
            this.orderManagement.displayOrder = this._displayOrder;
            this.orderManagement.checkReceivedText = this._checkReceivedText;
            const management = this.orderManagement[this._command];
            if (management) {
                const response = management(received, sock);
                if (response === 'initialOrder') {
                    this.initialOrder(received, sock, true);
                }
            }
            else if (!itemSelected) {
                sock
                    .sendMessage(jid, {
                    title: `🍔 ${this.botProfile.companyName.toUpperCase()} 🍟`,
                    text: `Então🤨! Esse item que você digitou:
               👉🏼 *(* ${received.message.conversation} *)*\n
               *Não existe no cardápio.*\n
               Cique no *botão* para abrir o cadápio e selecione um item:`.replace(/^ +/gm, ''),
                    buttonText: '➠ cardápio'.toUpperCase(),
                    footer: this.botProfile.shortName + '\nVeja online: https://example.com.br/products',
                    sections: this._createList(),
                })
                    .then((result) => {
                    sock.sendPresenceUpdate('paused', jid);
                    console.log('Succsses - f openOrder !itemSelected: ', result);
                })
                    .catch((err) => console.log('Error - f openOrder !itemSelected: ', err));
            }
        };
        this.accordingOrder = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            sock
                .sendMessage(jid, { text: 'Ótimo😉!\nEntão vamos começão a cadastrar o seu endereço.' })
                .then(async (result) => {
                await (0, baileys_1.delay)(600);
                sock
                    .sendMessage(jid, { text: 'Digite o seu *CEP:*' })
                    .then((result) => {
                    sock.sendPresenceUpdate('paused', jid);
                    console.log('Succsses - f okOrder - inner: ', result);
                })
                    .catch((err) => console.log('Error - f okOrder - inner: ', err));
                console.log('Succsses - f okOrder: ', result);
            })
                .catch((err) => console.log('Error - f okOrder: ', err));
            this.brokerService.brokerController.updateManyFields(jid, {
                [enum_1.FieldName.codeStage]: 'registerAddress',
                [enum_1.FieldName.subStage]: 'checkZipCode',
            });
        };
        this.registerAddress = async (received, sock) => {
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            this.addressmanagement.fieldValue = this.fieldValue;
            this.addressmanagement.brokerService = this.brokerService;
            this.addressmanagement.seeTyping = this._seeTyping;
            this.addressmanagement.displayOrder = this._displayOrder;
            this.addressmanagement.chatActions = this.chatActions;
            this.addressmanagement.createButtons = this._createButtons;
            this.addressmanagement.botProfile = this.botProfile;
            this.addressmanagement.checkReceivedText = this._checkReceivedText;
            this._command = documentData[enum_1.FieldName.subStage];
            const management = this.addressmanagement[this._command];
            if (management) {
                management(received, sock);
            }
        };
        this.orderEnd = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            sock
                .sendMessage(jid, {
                text: `Beleza! O seu pedido foi anotado e enviado para a produçao.\n
            Obrigado pela preferência! 😁\n
            Para me chamar novamente é só digitar *${this.botProfile.baseName}*! 😉`.replace(/^ +/gm, ''),
            })
                .then(async (result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f orderEnd: ', result);
            })
                .catch((err) => console.log('Error - f orderEnd: ', err));
            const orderReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const orderData = orderReferemces.data();
            this.brokerService.customerController.updateDocument({
                idDoc: jid,
                field: 'address',
                data: orderData.tempAddress,
            });
            const customerReferences = await this.brokerService.customerController.findOne({
                waid: jid,
            });
            const customerData = customerReferences.data();
            orderData.finishedAt = Date.now();
            const { orderId } = this.brokerService.orderController.insertDocument({
                customerId: orderData.customerId,
                productList: orderData.tempOrderList,
                status: 'producing',
                metadata: {
                    createAt: orderData.createAt,
                    finishedAt: orderData.finishedAt,
                },
            });
            this._redirectOrder({ sock, customer: customerData, dataTemp: orderData });
            console.log({ orderId });
            const resettingFields = {
                codeStage: '',
                subStage: this.fieldValue.delete(),
                tempAddress: this.fieldValue.delete(),
                tempOrderList: this.fieldValue.delete(),
                createAt: this.fieldValue.delete(),
                customerId: this.fieldValue.delete(),
            };
            this.brokerService.brokerController.updateManyFields(jid, resettingFields);
        };
        this.cancelOrder = async (received, sock) => {
            await this._seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            documentData.finishedAt = Date.now();
            const { orderId } = this.brokerService.orderController.insertDocument({
                customerId: documentData.customerId,
                productList: documentData.tempOrderList,
                status: 'canceled',
                metadata: {
                    createAt: documentData.createAt,
                    finishedAt: documentData.finishedAt,
                },
            });
            console.log({ orderId });
            const resettingFields = {
                codeStage: '',
                subStage: this.fieldValue.delete(),
                tempAddress: this.fieldValue.delete(),
                tempOrderList: this.fieldValue.delete(),
                createAt: this.fieldValue.delete(),
                customerId: this.fieldValue.delete(),
            };
            this.brokerService.brokerController.updateManyFields(jid, resettingFields);
            sock
                .sendMessage(jid, {
                text: `Entendi! O seu pedido foi cancelado com sucesso.\n
            Até a proxima! 😁\n
            Para me chamar novamente é só digitar *${this.botProfile.shortName}*! 😉`.replace(/^ +/gm, ''),
            })
                .then(async (result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f cancelOrder: ', result);
            })
                .catch((err) => console.log('Error - f cancelOrder: ', err));
        };
    }
    _checkReceivedText(received) {
        let receivedText;
        if (received.message?.conversation) {
            receivedText = received.message.conversation;
        }
        else if (received.message?.extendedTextMessage) {
            receivedText = received.message.extendedTextMessage.text;
        }
        else if (received.message?.ephemeralMessage) {
            if (received.message.ephemeralMessage.message?.conversation) {
                receivedText = received.message.ephemeralMessage.message.conversation;
            }
            else if (received.message.ephemeralMessage.message?.extendedTextMessage) {
                receivedText = received.message.ephemeralMessage.message.extendedTextMessage.text;
            }
        }
        return receivedText;
    }
    _createJid(jid) {
        if (jid.includes('@g.us') || jid.includes('@s.whatsapp.net')) {
            return this._checkNumbersBr(jid);
        }
        return jid.includes('-') ? `${jid}@g.us` : `${this._checkNumbersBr(jid)}@s.whatsapp.net`;
    }
    _checkNumbersBr(jid) {
        const regexp = new RegExp(/^(\d{2})(\d{2})\d{1}(\d{8})$/);
        if (regexp.test(jid)) {
            const match = regexp.exec(jid);
            if (match && match[1] === '55' && Number.isInteger(Number.parseInt(match[2]))) {
                const ddd = Number.parseInt(match[2]);
                if (ddd < 31) {
                    return match[0];
                }
                else if (ddd >= 31) {
                    return match[1] + match[2] + match[3];
                }
            }
        }
        else {
            return jid;
        }
    }
    _redirectOrder({ sock, customer, dataTemp }) {
        const contact = customer.waid.split('@')[0];
        const redirectMessage = `*PEDIDO*\n
      *Data/Hora:* ${(0, dayjs_1.default)(dataTemp.createAt).format('DD-MM-YYYY HH:MM:ss')}\n
      *CLIENTE:*
      *Nome:* ${customer.name}
      *Telefone:* ${contact}\n
      ${this._displayOrder(dataTemp).toUpperCase()}\n
      *Número do pedido:* ${dataTemp.createAt}`.replace(/^ +/gm, '');
        this.botProfile.redirectNumber.forEach(async (number) => {
            const jid = this._createJid(number);
            await this._seeTyping(sock, { remoteJid: jid });
            sock
                .sendMessage(jid, { text: redirectMessage })
                .then((result) => {
                sock.sendPresenceUpdate('paused', jid);
                console.log('Succsses - f _redirectOrder: ', result);
            })
                .catch((err) => console.log('Error - f _redirectOrder: ', err));
        });
    }
    async _seeTyping(sock, msgKey) {
        const jid = msgKey.remoteJid;
        await sock.sendReadReceipt(jid, msgKey.participant, [msgKey.id]);
        await sock.presenceSubscribe(jid);
        await (0, baileys_1.delay)(500);
        await sock.sendPresenceUpdate('composing', jid);
        await (0, baileys_1.delay)(1000);
    }
    _displayOrder(data) {
        let totalOrder = 0.0;
        let textOrder = '';
        const orderList = data.tempOrderList;
        const address = data.tempAddress;
        orderList.forEach((order) => {
            totalOrder += order.quantity * order.price;
            textOrder += '```' + order.title + '```\n';
            textOrder +=
                '```' +
                    order.quantity +
                    ' x ' +
                    order.price.toLocaleString('us', { style: 'currency', currency: 'BRL' });
            textOrder +=
                ' = ' +
                    (order.quantity * order.price).toLocaleString('us', {
                        style: 'currency',
                        currency: 'BRL',
                    }) +
                    '```\n\n';
        });
        textOrder += `total do pedido: *${totalOrder.toLocaleString('us', {
            style: 'currency',
            currency: 'BRL',
        })}*`;
        if (address) {
            textOrder += `\n\n*cidade:*  ${address.city}
         *bairro:*  ${address.distryct}
         *rua/localização:*  ${address.publicPlace}
         *número:*  ${address.number}`;
        }
        return textOrder;
    }
    _createButtons(actionsList) {
        let index = 0;
        return Array.from(actionsList, (action) => {
            const quickReplyButton = {
                id: action.id,
                displayText: action.displayText,
            };
            index++;
            return { index, quickReplyButton };
        });
    }
    _createList() {
        const category = [...new Set(this.productList.map((p) => p.category))];
        return Array.from(category, (c) => {
            const rows = [];
            const title = c.toUpperCase();
            this.productList.forEach((p) => {
                if (p.category === c) {
                    rows.push({
                        title: `${p.title} ${p.price.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                        })}`,
                        description: p.description,
                        rowId: p.id,
                    });
                }
            });
            return { title, rows };
        });
    }
}
exports.ChatManagement = ChatManagement;
