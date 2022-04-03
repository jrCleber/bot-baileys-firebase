"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botStartupService = void 0;
const commands_1 = require("./commands/commands");
const address_management_1 = require("./manage.chat/address.management");
const chat_management_1 = require("./manage.chat/chat.management");
const order_management_1 = require("./manage.chat/order.management");
const broker_module_1 = require("../broker/broker.module");
const bot_startup_service_1 = require("./bot.startup.service");
const firestore_1 = require("firebase-admin/firestore");
const bot_profile_json_1 = __importDefault(require("../../json.config/bot.profile.json"));
const chat_options_json_1 = __importDefault(require("../../json.config/chat.options.json"));
const chat_actions_json_1 = __importDefault(require("../../json.config/chat.actions.json"));
const products_json_1 = __importDefault(require("../../data/products.json"));
const defaultCommands = new commands_1.DefaultCommands(chat_options_json_1.default);
const orderCommands = new commands_1.OrderCommands(chat_options_json_1.default);
const orderManagement = new order_management_1.OrderManagement();
const addressManagement = new address_management_1.AddressManagement();
const chatManagement = new chat_management_1.ChatManagement(broker_module_1.brokerService, orderManagement, orderCommands, addressManagement, bot_profile_json_1.default, chat_actions_json_1.default, products_json_1.default, firestore_1.FieldValue);
const botStartupService = new bot_startup_service_1.BotStartupService(chatManagement, defaultCommands);
exports.botStartupService = botStartupService;