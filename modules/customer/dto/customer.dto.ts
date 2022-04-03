export type Metadata = {
   createAt: number;
   updateAt?: number;
};

export type Address = {
   zipCode?: string;
   state?: string;
   city: string;
   district: string;
   publicPlace: string;
   number: string;
   addOns?: string;
   lastDelivery?: boolean;
   suspiciousAddress?: boolean;
};

export type CustomerDTO = {
   customerId?: string;
   name?: string;
   pushName: string;
   waid: string;
   profilePictureUrl?: string;
   metadata?: Metadata;
   address?: Address;
};
