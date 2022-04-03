/* eslint-disable prettier/prettier */
import { DbFirestore } from '../../firebase/db';
import { CustomerCRUDService } from '../customer/customer.service';
import { OrderCRUDService } from '../order/order.service';

export class BrokerService {
   constructor(
      public readonly brokerController: DbFirestore,
      public readonly customerController: CustomerCRUDService,
      public readonly orderController: OrderCRUDService,
   ) { }
}
