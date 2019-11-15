import { BaseSearchCriteria } from './base-search-criteria.model';


export class MyJobSearchCriteria extends BaseSearchCriteria {

    location: string;
    latitude: number;
    longitude: number;
    maxAllowedMiles?: number;
    partnerGuid?: string;
    showCompleted: boolean;
    productGuids: string[];
}
