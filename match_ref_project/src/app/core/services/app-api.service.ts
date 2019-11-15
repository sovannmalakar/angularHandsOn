import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../http/framework-http-client.service';
import { Observable } from 'rxjs';
import { ProductModel } from '../model/product.model';
import { environment } from './../../../environments/environment';
import { ReturnListModel } from '../model/return-list.model';

import { CertificationModel } from '../model/certification.model';
import { MembershipModel } from '../model/membership.model';


@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public getAllProductsForSelection (): Observable<ReturnListModel<ProductModel>> {
    return this.frameworkHttpClientService.getList<ProductModel>(environment.baseUrl + '/api/account/getallproductsforselection');
  }

  public getAllCertificationForSelection (): Observable<ReturnListModel<CertificationModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.getList<CertificationModel>(environment.baseUrl + '/api/account/getallcertificationsforselection');
  }

  public getAllMembershipForSelection (): Observable<ReturnListModel<MembershipModel>> {
    return this.frameworkHttpClientService.getList<MembershipModel>(environment.baseUrl + '/api/account/getallmembershipsforselection');
  }

}
