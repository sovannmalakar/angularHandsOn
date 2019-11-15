import { ProductModel } from './../model/product.module';
export class CorporateEmployee {
    advertisementGuid: string;
    partnerGuid: string;
    partnerCompanyName: string;
    contactFirstName: string;
    contactLastName: string;
    jobName: string;
    notes: string;
    startDate: Date;
    endDate: Date;
    locationAddress1: string;
    locationAddress2: string;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    locationZip: number;
    expirationDate: Date;
    proximityInMiles: any;
    latitude: any;
    longitude: any;
    requiredServices: ProductModel[];
    optionalServices: ProductModel[];
    status: number;
    applications: any;
    createdDate: Date;
    createdBy: string;
    modifiedBy: string;

    // tslint:disable-next-line:max-line-length
    constructor(contactFirstName: string, contactLastName: string, partnerCompanyName: string, jobName: string, startDate: Date, endDate: Date) {
        this.contactFirstName = contactFirstName;
        this.contactLastName = contactLastName;
        this.partnerCompanyName = partnerCompanyName;
        this.jobName = jobName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
