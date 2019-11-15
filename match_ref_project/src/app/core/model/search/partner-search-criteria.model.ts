import { BaseSearchCriteria } from './base-search-criteria.model';


declare interface PartnerSearchCriteria extends BaseSearchCriteria {
    partnerName: string;
    zipCode: string;
    withInDistanceInMiles?: number;
}
