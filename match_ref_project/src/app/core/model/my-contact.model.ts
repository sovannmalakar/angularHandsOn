import { ProductModel } from './product.model';



export class MyContactModel {
    fullName: string;
    partnerGuid: string;
    contactFirstName: string;
    contactLastName: string;
    companyName: string;
    partnerTypeId: number;
    website: string;
    email: string;
    phone: string;
    notes: string;
    products: ProductModel[];
    length: number;
}
