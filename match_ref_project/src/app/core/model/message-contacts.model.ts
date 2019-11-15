import { ProductModel } from './product.model';

export class MessageContactsModel {
      partnerGuid: string;
      contactFirstName: string;
      contactLastName: string;
      companyName: string;
      partnerTypeId: 0;
      website: string;
      email: string;
      phone: string;
      notes: string;
      onSiteAvailability: true;
      remoteSiteAvailability: true;
      products: ProductModel;
      lastMessageId: 0;
      lastMessageDate: Date;
      lastMessage: string;
}
