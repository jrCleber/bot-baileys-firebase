"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressManagement = void 0;
const axios_1 = __importDefault(require("axios"));
const enum_1 = require("../../../utils/enum");
class AddressManagement {
    constructor() {
        this.checkZipCode = async (received, sock) => {
            await this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const receivedText = this.checkReceivedText(received);
            if (receivedText) {
                const regexp = new RegExp(/[\d]+/gm);
                const match = receivedText.match(regexp);
                let zipCode = '';
                match.forEach((z) => (zipCode += z));
                if (zipCode.length === 8) {
                    const response = await this._getCep(zipCode);
                    if (response.data.erro) {
                        this._responseError(received, sock);
                    }
                    else {
                        const cep = response.data;
                        const address = {};
                        address.zipCode = cep.cep;
                        address.uf = cep.uf;
                        address.city = cep.localidade;
                        let sendText;
                        if (cep.bairro === '') {
                            sendText = `*Cidade:* ${address.city}\n
                  Digite agora o seu bairro:`.replace(/^ +/gm, '');
                            this._responseSuccess(received, sock, sendText);
                            this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, 'checkDistrict');
                        }
                        else if (cep.logradouro === '') {
                            address.distryct = cep.bairro;
                            sendText = `➠ *Cidade:* ${address.city}
                  ➠ *Bairro:* ${address.distryct}\n
                  Digite agora o seu logradouro: (rua, ou avenida, ou rodovia, etc)`.replace(/^ +/gm, '');
                            this._responseSuccess(received, sock, sendText);
                            this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, 'checkPublicPlace');
                        }
                        else {
                            address.distryct = cep.bairro;
                            address.publicPlace = cep.logradouro;
                            sendText = `➠ *Cidade:* ${address.city}
                  ➠ *Bairro:* ${address.distryct}
                  ➠ *Logradouro*: ${address.publicPlace}\n
                  Digite agora o numero da residência para a entrega:`.replace(/^ +/gm, '');
                            this._responseSuccess(received, sock, sendText);
                            this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.subStage, 'checkNumber');
                        }
                        this.brokerService.brokerController.updateDoc(jid, enum_1.FieldName.tempAddress, address);
                    }
                }
                else {
                    this._responseError(received, sock);
                }
            }
        };
        this.checkDistrict = async (received, sock) => {
            await this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            const address = documentData[enum_1.FieldName.tempAddress];
            address.distryct = this.checkReceivedText(received);
            this.brokerService.brokerController.updateManyFields(jid, {
                [enum_1.FieldName.tempAddress]: address,
                [enum_1.FieldName.subStage]: 'checkPublicPlace',
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
        this.checkPublicPlace = async (received, sock) => {
            await this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            const address = documentData[enum_1.FieldName.tempAddress];
            address.publicPlace = this.checkReceivedText(received);
            this.brokerService.brokerController.updateManyFields(jid, {
                [enum_1.FieldName.tempAddress]: address,
                [enum_1.FieldName.subStage]: 'checkNumber',
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
        this.checkNumber = async (received, sock) => {
            await this.seeTyping(sock, received.key);
            const jid = received.key.remoteJid;
            const documentReferemces = await this.brokerService.brokerController.getDocumetId(jid);
            const documentData = documentReferemces.data();
            const address = documentData[enum_1.FieldName.tempAddress];
            address.number = this.checkReceivedText(received);
            this.brokerService.brokerController.updateManyFields(jid, {
                [enum_1.FieldName.tempAddress]: address,
                [enum_1.FieldName.codeStage]: 'orderEnd',
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
    async _getCep(zipCode) {
        const instance = axios_1.default.create({ baseURL: 'https://viacep.com.br/' });
        return await instance.get(`ws/${zipCode}/json/`);
    }
    _responseError(received, sock) {
        const jid = received.key.remoteJid;
        sock
            .sendMessage(jid, { text: 'Este *CEP* não não é válido.\nDigite novamente o cep:' }, { quoted: received })
            .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f AddressManagement - _responseError: ', result);
        })
            .catch((err) => console.log('Error - f AddressManagement - _responseError: ', err));
    }
    _responseSuccess(received, sock, text) {
        const jid = received.key.remoteJid;
        sock
            .sendMessage(jid, { text })
            .then((result) => {
            sock.sendPresenceUpdate('paused', jid);
            console.log('Succsses - f AddressManagement - _responseSuccess: ', result);
        })
            .catch((err) => console.log('Error - f AddressManagement - _responseSuccess: ', err));
    }
}
exports.AddressManagement = AddressManagement;
