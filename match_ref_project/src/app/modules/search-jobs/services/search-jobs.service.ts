import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map, debounceTime } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import { JobSearchCriteria } from './../../../core/model/search/job-search-criteria.model';
import { JobSearchResultModel } from './../../../core/model/Job-search-result.model';

import { ZipCodeModel } from './../../../core/model/zip-code.model';


@Injectable({
  providedIn: 'root'
})
export class SearchJobsService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }


  public searchJobs(jobSearchCriteria: JobSearchCriteria): Observable<ReturnModel<JobSearchResultModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .getWithParams<JobSearchResultModel>(environment.baseUrl + '/api/partner/searchjobs', jobSearchCriteria)
               .map((result) => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
              });
  }

  public getLocationAutoComplete(term): Observable<ReturnModel<ZipCodeModel>> {
    return this.frameworkHttpClientService.getWithParams<ZipCodeModel>(environment.baseUrl + '/api/partner/getcoordinatesforcity', term)
      .pipe( debounceTime(500), map(result => {
        if (result && result.isSuccess) {
          return result;
         } else {
          throw result.errorHolder;
         }
      }));
  }
}
