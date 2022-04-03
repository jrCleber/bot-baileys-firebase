import { CustomerEntitie } from './entitie/customer.entitie';
import { DbFirestore } from '../../firebase/db';
import { CustomerDTO } from './dto/customer.dto';
import { v4 } from 'uuid';

type TUpdate = {
   idDoc: string;
   field: string;
   data: any;
};

type TFind = {
   waid: string;
};

export class CustomerCRUDService {
   // eslint-disable-next-line prettier/prettier
   constructor(private readonly customerEntitie: CustomerEntitie, private readonly customerControll: DbFirestore) { }

   private _toLoad(customerDTO: CustomerDTO) {
      // loading variable
      this.customerEntitie.toLoad(customerDTO);
      // generating the id
      this.customerEntitie.customerId = v4();
      // entering creation date
      this.customerEntitie.metadata = {
         createAt: Date.now(),
      };
   }

   public async insertDocument(customerDTO: CustomerDTO) {
      this._toLoad(customerDTO);

      this.customerControll.insertDocWithId(
         this.customerEntitie.waid,
         this.customerEntitie.toMap(),
      );

      return this.customerEntitie.customerId;
   }

   public updateDocument({ idDoc, field, data }: TUpdate) {
      this.customerControll.updateDoc(idDoc, field, data);
   }

   public async findOne({ waid }: TFind) {
      return await this.customerControll.getDocumetId(waid);
   }
}
