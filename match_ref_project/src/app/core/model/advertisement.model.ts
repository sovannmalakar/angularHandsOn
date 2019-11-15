import { ProductModel } from './product.model';

export class AdvertisementModel {
    advertisementGuid: string;
    advertiserPartnerGuid: string;
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
    latitude: number;
    longitude: number;
    proximityInMiles?: number;
    status: number;
    acceptedPartnerGuid?: string;
    acceptedPartnerFirstName: string;
    acceptedPartnerLastName: string;
    acceptedDateTime?: string;
    acceptedPartnerJobGuid?: string;
    requiredServices: ProductModel[];
    optionalServices: ProductModel[];
}
