
import { BaseSearchCriteria } from './base-search-criteria.model';

export class JobSearchCriteria extends BaseSearchCriteria {
    maxAllowedMiles?: number;
    latitude?: number;
    longitude?: number;
    productGuids: string[];
}
