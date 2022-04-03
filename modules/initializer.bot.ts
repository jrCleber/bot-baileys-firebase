/**
 * @author jrCleber
 * @copyright
 */
// importing bot startup service
import { botStartupService } from './bot/bot.module';
// naming the session
const sessionName = 'sessionName';
// running bot
botStartupService.execute({ sessionName });
