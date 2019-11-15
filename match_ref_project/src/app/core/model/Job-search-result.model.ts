export class JobSearchResultModel {
    advertisementJobGuid: string;
    partnerGuid: string;
    firstName: string;
    lastName: string;
    title: string;
    notes: string;
    displayCity: string;
    displayState: string;
    displayZip: string;
    distance: number;
    latitude: number;
    longitude: number;
    neededServices: string[];
    optionalServices: string[];
}
