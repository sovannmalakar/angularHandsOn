
import { JobPostStatsByCitynameAndJobCountModel } from './job-post-stats-by-cityname-and-job-count.model';

export class DashboardModel {
    totalContacts: number;
    totalContactRequests: number;
    totalMyJobs: number;
    totalMyAds: number;
    totalAdReplies: number;
    jobStats?: JobPostStatsByCitynameAndJobCountModel;
}
