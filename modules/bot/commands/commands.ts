import { proto } from '@adiwajshing/baileys';

class DefaultCommands {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly options: typeof import('../../../json.config/chat.options.json')) { }

   public readonly initialOrder = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.order.openOrder.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.order.openOrder.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.order.openOrder.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.order.openOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.order.openOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.order.openOrder.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly sendMenuImage = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.seeMenu.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.seeMenu.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.seeMenu.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.seeMenu.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.seeMenu.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.seeMenu.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly cancelChat = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.return.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.return.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.return.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.return.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.return.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.return.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly otherOptions = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.otherOptions.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.otherOptions.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.otherOptions.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.otherOptions.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.otherOptions.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.otherOptions.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly callBot = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.callBot.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.callBot.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.callBot.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.callBot.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.callBot.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.callBot.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly accordingOrder = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.order.accordingOrder.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.order.accordingOrder.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.order.accordingOrder.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.order.accordingOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.order.accordingOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.order.accordingOrder.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly cancelOrder = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.cancel.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.cancel.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text.toLowerCase();
         return this.options.cancel.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.cancel.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
            return this.options.cancel.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content =
               received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
            return this.options.cancel.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };
}

class OrderCommands {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly options: typeof import('../../../json.config/chat.options.json')) { }

   public readonly addOrder = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.order.addOrder.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.order.addOrder.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text;
         return this.options.order.addOrder.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.order.addOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation;
            return this.options.order.addOrder.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content = received.message.ephemeralMessage.message.extendedTextMessage.text;
            return this.options.order.addOrder.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };

   public readonly notAddOrder = (received: proto.IWebMessageInfo) => {
      if (received.message?.templateButtonReplyMessage) {
         const content =
            received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return this.options.notAdd.includes(content);
      } else if (received.message?.conversation) {
         const content = received.message.conversation.toLowerCase();
         return this.options.notAdd.includes(content);
      } else if (received.message?.extendedTextMessage) {
         const content = received.message.extendedTextMessage.text;
         return this.options.notAdd.includes(content);
      } else if (received.message?.ephemeralMessage) {
         if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
            const content =
               received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
            return this.options.notAdd.includes(content);
         } else if (received.message.ephemeralMessage?.message.conversation) {
            const content = received.message.ephemeralMessage.message.conversation;
            return this.options.notAdd.includes(content);
         } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
            const content = received.message.ephemeralMessage.message.extendedTextMessage.text;
            return this.options.notAdd.includes(content);
         } else {
            return false;
         }
      } else {
         return false;
      }
   };
}

export { DefaultCommands, OrderCommands };
