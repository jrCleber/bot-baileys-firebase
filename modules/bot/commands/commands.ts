import { proto } from '@adiwajshing/baileys';

function messageReceiver(
   received: proto.IWebMessageInfo,
   options: typeof import('../../../json.config/chat.options.json'),
) {
   if (received.message?.templateButtonReplyMessage) {
      const content = received.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
      return options.order.openOrder.includes(content);
   } else if (received.message?.conversation) {
      const content = received.message.conversation.toLowerCase();
      return options.order.openOrder.includes(content);
   } else if (received.message?.extendedTextMessage) {
      const content = received.message.extendedTextMessage.text.toLowerCase();
      return options.order.openOrder.includes(content);
   } else if (received.message?.ephemeralMessage) {
      if (received.message.ephemeralMessage.message?.templateButtonReplyMessage) {
         const content =
            received.message.ephemeralMessage.message.templateButtonReplyMessage.selectedDisplayText.toLowerCase();
         return options.order.openOrder.includes(content);
      } else if (received.message.ephemeralMessage?.message.conversation) {
         const content = received.message.ephemeralMessage.message.conversation.toLowerCase();
         return options.order.openOrder.includes(content);
      } else if (received.message.ephemeralMessage?.message.extendedTextMessage.text) {
         const content =
            received.message.ephemeralMessage.message.extendedTextMessage.text.toLowerCase();
         return options.order.openOrder.includes(content);
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

   public readonly initialOrder = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly sendMenuImage = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly cancelChat = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly otherOptions = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly callBot = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly accordingOrder = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly cancelOrder = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);
}

class OrderCommands {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly options: typeof import('../../../json.config/chat.options.json')) { }

   public readonly addOrder = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);

   public readonly notAddOrder = (received: proto.IWebMessageInfo) =>
      messageReceiver(received, this.options);
}

export { DefaultCommands, OrderCommands };
