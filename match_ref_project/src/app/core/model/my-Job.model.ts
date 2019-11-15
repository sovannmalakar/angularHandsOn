


export class MyJobModel {
    jobGuid: string;
    orderingPartnerGuid: string;
    orderingPartnerCompanyName: string;
    orderingContactFirstName: string;
    orderingContactLastName: string;
    jobName: string;
    notes: string;
    startDate?: string;
    endDate?: string;
    status: number;
    displayLocationAddress1: string;
    displayLocationAddress2: string;
    displayLocationCity: string;
    displayLocationState: string;
    displayLocationZip: string;
    displayLocationCountry: string;
    actualLocationAddress1: string;
    actualLocationAddress2: string;
    actualLocationCity: string;
    actualLocationState: string;
    actualLocationZip: string;
    actualLocationCountry: string;
    latitude: number;
    longitude: number;
    proximityInMiles?: number;
    showDetailsInOrderingPartnerCalendar: boolean;
}
