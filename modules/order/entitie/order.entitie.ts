import { Metadata, OrderDTO, Product } from '../dto/order.dto';

export class OrderEntitie {
   // eslint-disable-next-line prettier/prettier
   constructor() { }
   public orderId?: string;
   public customerId: string;
   public productList: Product[] | any;
   public metadata: Metadata;
   public status?: 'complete' | 'incomplete' | 'paused' | 'canceled' | 'producing';

   public toLoad(props: Omit<OrderEntitie, 'orderId' | 'toLoad' | 'toMap'>) {
      Object.assign(this, props);
   }

   public toMap() {
      const nonEmptyFields: OrderDTO = {
         customerId: '',
         productList: [],
         metadata: {},
      };
      for (const [key, value] of Object.entries(this)) {
         if (value) {
            nonEmptyFields[key] = value;
         }
      }
      return nonEmptyFields;
   }
}
