import { proto } from '@adiwajshing/baileys';

function messageReceiver(received: proto.IWebMessageInfo) {
   if (received.message?.templateButtonReplyMessage) {
      const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
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
}

class DefaultCommands {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly options: typeof import('../../../json.config/chat.options.json')) { }

   public readonly initialOrder = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly sendMenuImage = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly cancelChat = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly otherOptions = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly callBot = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly accordingOrder = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly cancelOrder = (received: proto.IWebMessageInfo) => messageReceiver(received);
}

class OrderCommands {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly options: typeof import('../../../json.config/chat.options.json')) { }

   public readonly addOrder = (received: proto.IWebMessageInfo) => messageReceiver(received);
   public readonly notAddOrder = (received: proto.IWebMessageInfo) => messageReceiver(received);
}

export { DefaultCommands, OrderCommands };
