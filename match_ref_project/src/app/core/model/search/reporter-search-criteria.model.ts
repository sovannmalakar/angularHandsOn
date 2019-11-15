import { BaseSearchCriteria } from './base-search-criteria.model';

export class ReporterSearchCriteria extends BaseSearchCriteria {
    maxAllowedMiles?: number;
    location: string;
    latitude?: number;
    longitude?: number;
    productGuids: string[];
}
