"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotStartupService = void 0;
const baileys_1 = __importStar(require("@adiwajshing/baileys"));
const check_path_1 = require("../../utils/check.path");
const pino_1 = __importDefault(require("pino"));
const enum_1 = require("../../utils/enum");
class BotStartupService {
    constructor(chatManagement, defaultCommands) {
        this.chatManagement = chatManagement;
        this.defaultCommands = defaultCommands;
        this._pathMd = './sessionsMD/';
        this._brokerController = chatManagement.brokerService.brokerController;
    }
    _isgroup(jid) {
        const regexp = new RegExp(/^\d{18}@g.us$/);
        return regexp.test(jid);
    }
    _connectionUpdate(sock, sessionName) {
        sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
            if (qr) {
                console.log('qrcode: ', qr);
            }
            if (connection === 'close') {
                const shouldRecnnect = lastDisconnect.error?.output?.statusCode !== baileys_1.DisconnectReason.loggedOut;
                if (shouldRecnnect) {
                    this.execute({ sessionName });
                }
            }
            else if (connection === 'open') {
                console.log('CONNECTED WHATSAPP MD');
            }
        });
    }
    async execute({ sessionName }) {
        (0, check_path_1.checkPath)(this._pathMd);
        const { version } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveState } = (0, baileys_1.useSingleFileAuthState)(this._pathMd + sessionName + '.json');
        const settings = {
            printQRInTerminal: true,
            connectTimeoutMs: 60000,
            auth: state,
            logger: (0, pino_1.default)({ level: 'error' }),
            version,
            getMessage: async (key) => {
                return { conversation: 'hi' };
            },
        };
        const sock = (0, baileys_1.default)(settings);
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
                    this._command = documentData[enum_1.FieldName.codeStage];
                }
                else {
                    this._command = 'initialChat';
                    this._brokerController.insertDocWithId(jid, {
                        [enum_1.FieldName.codeStage]: this._command,
                    });
                }
                for (const [key, func] of Object.entries(this.defaultCommands)) {
                    if (typeof func === 'function' && func(received)) {
                        this._command = key;
                        break;
                    }
                }
                const management = this.chatManagement[this._command];
                if (management) {
                    management(received, sock);
                }
                else {
                    console.log('Error - f management: ', management);
                }
            }
        });
    }
}
exports.BotStartupService = BotStartupService;
