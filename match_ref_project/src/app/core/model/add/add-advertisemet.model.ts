import { ProductModel } from '../product.model';

  export class AddAdvertisementModel {
    advertiserPartnerCompanyName: string;
    advertiserContactFirstName: string;
    advertiserContactLastName: string;
    jobName: string;
    notes: string;
    startDate: string;
    endDate: string;
    expirationDate?: string;
    locationAddress1: string;
    locationAddress2: string;
    locationCity: string;
    locationState: string;
    locationZip: string;
    locationCountry: string;
    proximityInMiles?: number;
    status: number;
    requiredServices: ProductModel[];
    optionalServices: ProductModel[];
  }
