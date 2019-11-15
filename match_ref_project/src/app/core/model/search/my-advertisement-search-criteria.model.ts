import { BaseSearchCriteria } from './base-search-criteria.model';


export  class MyAdvertisementSearchCriteria extends BaseSearchCriteria {
    productGuids?: string[];
    advertisementGuid?: string;
}

