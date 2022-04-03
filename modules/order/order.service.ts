import { v4 } from 'uuid';
import { DbFirestore } from '../../firebase/db';
import { OrderDTO } from './dto/order.dto';
import { OrderEntitie } from './entitie/order.entitie';

export class OrderCRUDService {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly orderEntitie: OrderEntitie, private readonly orderController: DbFirestore) { }

   private _toLoad(orderDTO: OrderDTO) {
      // loading variable
      this.orderEntitie.toLoad(orderDTO);
      // generating the id
      this.orderEntitie.orderId = v4();
      // entering creation date
      this.orderEntitie.metadata = orderDTO.metadata;
   }

   public insertDocument(orderDTO: OrderDTO) {
      this._toLoad(orderDTO);

      this.orderController.insertDocWithId(this.orderEntitie.orderId, this.orderEntitie.toMap());

      return { orderId: this.orderEntitie.orderId };
   }
}
