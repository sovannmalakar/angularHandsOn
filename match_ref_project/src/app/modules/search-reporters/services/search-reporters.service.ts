

import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map, debounce, debounceTime } from 'rxjs/operators';
import { SessionService } from './../../../core/services/session.service';

import { ReturnModel } from './../../../core/model/return.model';
import { ReporterSearchCriteria } from './../../../core/model/search/reporter-search-criteria.model';
import { ReporterSearchResultModel } from './../../../core/model/reporter-search-result.model';

import { ZipCodeModel } from './../../../core/model/zip-code.model';

@Injectable({
  providedIn: 'root'
})
export class SearchReportersService {

  constructor(
    private frameworkHttpClientService: FrameworkHttpClientService,
    private sessionService: SessionService) { }

  public getLocationAutoComplete(term): Observable<ReturnModel<ZipCodeModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.getWithParams<ZipCodeModel>(environment.baseUrl + '/api/partner/getcoordinatesforcity', term)
      .pipe(debounceTime(500) , map(result => {
        if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
      }));
  }

  public searchReporters(reporterSearchCriteria: ReporterSearchCriteria): Observable<ReturnModel<ReporterSearchResultModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.getWithParams<ReporterSearchResultModel>(environment.baseUrl + '/api/partner/searchreporters', reporterSearchCriteria)
    .map((result) => {
      if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
    });
  }
}
