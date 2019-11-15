import { ProductModel } from './product.model';


export class MyAdvertisementModel {
    advertisementGuid: string;
    partnerGuid: string;
    partnerCompanyName: string;
    contactFirstName: string;
    contactLastName: string;
    jobName: string;
    notes: string;
    startDate: string;
    endDate: string;
    locationAddress1: string;
    locationAddress2: string;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    locationZip: string;
    expirationDate?: string;
    proximityInMiles?: number;
    latitude: number;
    longitude: number;
    requiredServices: ProductModel[];
    optionalServices: ProductModel[];
    status: number;
}
