export type DefaultCommandsKeys =
   | 'initialChat'
   | 'initialOrder'
   | 'sendMenuImage'
   | 'cancelChat'
   | 'otherOptions'
   | 'callBot'
   | 'accordingOrder'
   | 'cancelOrder'
   | 'addOrder'
   | 'notAddOrder';

export type OrderCommandsKeys = 'validateQuantity' | 'addOrder' | 'notaAdd';

export type AddressCommandsKeys =
   | 'checkZipCode'
   | 'checkDistrict'
   | 'checkPublicPlace'
   | 'checkNumber';

export type ActionButton = {
   displayText: string;
   id: string;
};

export type TProduct = {
   title: string;
   description: string;
   price: number;
   category: string;
   id: string;
};

export type TOrder = {
   title: string;
   price: number;
   description: string;
   quantity?: number;
   category: string;
   productId: string;
};

export type TAddress = {
   zipCode?: string;
   uf?: string;
   city?: string;
   distryct?: string;
   publicPlace?: string;
   number?: string;
};

export type TDataTemp = {
   codeStage?: string;
   subStage?: string | import('firebase-admin').firestore.FieldValue;
   tempAddress?: TAddress | import('firebase-admin').firestore.FieldValue;
   tempOrderList?: TOrder[] | import('firebase-admin').firestore.FieldValue;
   createAt?: number | import('firebase-admin').firestore.FieldValue;
   finishedAt?: number | import('firebase-admin').firestore.FieldValue;
   customerId?: string | import('firebase-admin').firestore.FieldValue;
};

export type TCEP = {
   cep: string;
   logradouro: string;
   complemento: string;
   bairro: string;
   localidade: string;
   uf: string;
};
