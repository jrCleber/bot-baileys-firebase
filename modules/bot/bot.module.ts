import { DefaultCommands, OrderCommands } from './commands/commands';
import { AddressManagement } from './manage.chat/address.management';
import { ChatManagement } from './manage.chat/chat.management';
import { OrderManagement } from './manage.chat/order.management';
import { brokerService } from '../broker/broker.module';
import { BotStartupService } from './bot.startup.service';
import { FieldValue } from 'firebase-admin/firestore';
import botProfile from '../../json.config/bot.profile.json';
import chatOptions from '../../json.config/chat.options.json';
import chatActions from '../../json.config/chat.actions.json';
import productList from '../../data/products.json';

// instantiating commands and injecting dependency
const defaultCommands = new DefaultCommands(chatOptions);
const orderCommands = new OrderCommands(chatOptions);

// instantiating auxiliary managers and injecting dependency
const orderManagement = new OrderManagement();
const addressManagement = new AddressManagement();

// instantiating main manager and injecting the dependencies
const chatManagement = new ChatManagement(
   brokerService,
   orderManagement,
   orderCommands,
   addressManagement,
   botProfile,
   chatActions,
   productList,
   FieldValue,
);

// instantiating bot startup service and injecting the dependencies
const botStartupService = new BotStartupService(chatManagement, defaultCommands);

// exporting module service
export { botStartupService };
