import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from './../model/paged-data';
import { CorporateEmployee } from './../model/corporate-employee';
import { Page } from './../model/page';
const companyData = require('assets/json/company.json');
const listData = require('assets/json/listData.json');

import { ReturnModel } from './../../../../../core/model/return.model';
import { MyAdvertisementModel } from './../../../../../core/model/my-advertisement.model';
import { FrameworkHttpClientService } from './../../../../../core/http/framework-http-client.service';
import { environment } from './../../../../../../environments/environment';


/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class MockServerResultsService {

    constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    // public getResults(page: Page): Observable<PagedData<CorporateEmployee>> {
    //     return of(companyData).pipe(map(data => this.getPagedData(page)));
    // }
    public getResults(page: Page): Observable<PagedData<CorporateEmployee>> {
        return of(listData).pipe(map(data => this.getPagedData(page)));
    }

    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
     */
    private getPagedData(page: Page): PagedData<CorporateEmployee> {
        const pagedData = new PagedData<CorporateEmployee>();
        page.totalElements = listData.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++) {
            const jsonObj = listData[i];
            // const employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
            // tslint:disable-next-line:max-line-length
            const employee = new CorporateEmployee(jsonObj.contactFirstName, jsonObj.contactLastName, jsonObj.partnerCompanyName, jsonObj.jobName, jsonObj.startDate , jsonObj.endDate);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }

}
