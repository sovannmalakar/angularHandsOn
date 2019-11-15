
export class PartnerSignupModel {
    partnerTypeId: number;
    partnerContactFName: string;
    partnerContactLName: string;
    partnerContactPhone: string;
    partnerContactEmail: string;
    partnerBillName: string;
    partnerBillPhone: string;
    partnerBillAddress1: string;
    partnerBillAddress2: string;
    partnerBillCity: string;
    partnerBillState: string;
    partnerBillZip: string;
    partnerBillCountry: string;
    partnerBillFax: string;
    latitude?: number;
    longitude?: number;
    password: string;
    userType: number;
    productGuids: string[];
}
