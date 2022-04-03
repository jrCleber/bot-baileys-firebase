export type Metadata = {
   createAt: number;
   finishedAt?: number;
   updateat?: number;
};

export type Product = {
   title: string;
   description: string;
   price: number;
   quantity?: number;
   category: string;
   productId: string;
};

export type OrderDTO = {
   customerId: string | any;
   productList: Product[] | any;
   metadata: Metadata | any;
   status?: 'complete' | 'incomplete' | 'paused' | 'canceled' | 'producing';
};
