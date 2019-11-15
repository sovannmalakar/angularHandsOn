export class JobFollowUpsModel {
    fromPartnerGuid: string;
      fromPartnerCompanyName: string;
      fromPartnerCity: string;
      fromPartnerState: string;
      fromPartnerCountry: string;
      fromPartnerLatitude: number;
      fromPartnerLongitude: number;
      fromPartnerDistanceFromMe: number;
      applicationGuid: string;
      advertismentGuid: string;
      notes: string;
      messages: [
        {
          advertisementApplicationMessageGuid: string;
          message: string;
        }
      ];
}
