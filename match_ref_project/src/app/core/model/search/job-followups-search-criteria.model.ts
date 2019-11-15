
import { BaseSearchCriteria } from './base-search-criteria.model';

export class JobFollowupsSearchCriteria extends BaseSearchCriteria {
    AdvertisementGuid?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    productGuids: string[];
}
