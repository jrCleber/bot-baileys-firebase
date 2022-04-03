"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCommands = exports.DefaultCommands = void 0;
class DefaultCommands {
    constructor(options) {
        this.options = options;
        this.initialOrder = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.order.openOrder.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.order.openOrder.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.order.openOrder.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.order.openOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.order.openOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.order.openOrder.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.sendMenuImage = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.seeMenu.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.seeMenu.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.seeMenu.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.seeMenu.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.seeMenu.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.seeMenu.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.cancelChat = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.return.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.return.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.return.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.return.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.return.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.return.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.otherOptions = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.otherOptions.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.otherOptions.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.otherOptions.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.otherOptions.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.otherOptions.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.otherOptions.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.callBot = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.callBot.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.callBot.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.callBot.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.callBot.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.callBot.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.callBot.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.accordingOrder = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.order.accordingOrder.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.order.accordingOrder.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.order.accordingOrder.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.order.accordingOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.order.accordingOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.order.accordingOrder.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.cancelOrder = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.cancel.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.cancel.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text.toLowerCase();
                return this.options.cancel.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.cancel.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
                    return this.options.cancel.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
                    return this.options.cancel.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
    }
}
exports.DefaultCommands = DefaultCommands;
class OrderCommands {
    constructor(options) {
        this.options = options;
        this.addOrder = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.order.addOrder.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.order.addOrder.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text;
                return this.options.order.addOrder.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.order.addOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation;
                    return this.options.order.addOrder.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text;
                    return this.options.order.addOrder.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        this.notAddOrder = (received) => {
            if (received.message?.templateButtonReplyMessage) {
                const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                return this.options.notAdd.includes(content);
            }
            else if (received.message?.conversation) {
                const content = received.message.conversation.toLowerCase();
                return this.options.notAdd.includes(content);
            }
            else if (received.message?.extendedTextMessage) {
                const content = received.message.extendedTextMessage.text;
                return this.options.notAdd.includes(content);
            }
            else if (received.message?.ephemeralMessage) {
                if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
                    const content = received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
                    return this.options.notAdd.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.conversation) {
                    const content = received.message.ephemeralMessage.message.conversation;
                    return this.options.notAdd.includes(content);
                }
                else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
                    const content = received.message.ephemeralMessage.message.extendedTextMessage.text;
                    return this.options.notAdd.includes(content);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
    }
}
exports.OrderCommands = OrderCommands;
