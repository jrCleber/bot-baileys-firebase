import { DbFirestore } from '../../firebase/db';
import { CollectionsName } from '../../utils/enum';
import { customerCRUDService } from '../customer/customer.module';
import { orderCRUDService } from '../order/order.module';
import { BrokerService } from './broker.service';

// instantiating firestore
const dbFirestore = new DbFirestore(CollectionsName.chatControllerColl);

// instantiating service and injecting dependencies
const brokerService = new BrokerService(dbFirestore, customerCRUDService, orderCRUDService);

// exporting module service
export { brokerService };
