import { Address, CustomerDTO, Metadata } from '../dto/customer.dto';

export class CustomerEntitie {
   // eslint-disable-next-line prettier/prettier
   constructor() { }
   public customerId?: string;
   public name?: string;
   public pushName: string;
   public waid: string;
   public profilePictureUrl?: string;
   public metadata: Metadata;
   public address?: Address;

   public toLoad(props: Omit<CustomerEntitie, 'metadata' | 'toLoad' | 'toMap' | 'customerId'>) {
      Object.assign(this, props);
   }

   public toMap(): CustomerDTO {
      const nonEmptyFields: CustomerDTO = {
         pushName: '',
         metadata: {
            createAt: 0,
            updateAt: 0,
         },
         waid: '',
      };
      for (const [key, value] of Object.entries(this)) {
         if (value) {
            nonEmptyFields[key] = value;
         }
      }
      return nonEmptyFields;
   }
}
