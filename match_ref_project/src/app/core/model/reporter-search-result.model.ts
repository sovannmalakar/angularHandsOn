

export class ReporterSearchResultModel {
    fullName: string;
    partnerGuid: string;
    companyName: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude?: number;
    longitude?: number;
    distance: number;
    isPartnerInContact: boolean;
    partnerTypeId: number;
    products: string[];
    length: number;
}
