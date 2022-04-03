import { DbFirestore } from '../../firebase/db';
import { CollectionsName } from '../../utils/enum';
import { OrderEntitie } from './entitie/order.entitie';
import { OrderCRUDService } from './order.service';

// instantiating firestore
const dbFirestore = new DbFirestore(CollectionsName.orderColl);

// instantiating entity
const orderEntitie = new OrderEntitie();

// instantiating service and injecting dependencies
const orderCRUDService = new OrderCRUDService(orderEntitie, dbFirestore);

// exporting module service
export { orderCRUDService };
