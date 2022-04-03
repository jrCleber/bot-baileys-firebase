import { DbFirestore } from '../../firebase/db';
import { CollectionsName } from '../../utils/enum';
import { CustomerCRUDService } from './customer.service';
import { CustomerEntitie } from './entitie/customer.entitie';

// instantiating firestore
const dbFirestore = new DbFirestore(CollectionsName.customerColl);

// instantiating entity
const customerEntitie = new CustomerEntitie();

// instantiating service and injecting dependencies
const customerCRUDService = new CustomerCRUDService(customerEntitie, dbFirestore);

// exporting module service
export { customerCRUDService };
