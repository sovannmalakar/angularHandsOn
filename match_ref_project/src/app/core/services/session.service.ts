import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggedInUserModel } from '../model/logged-in-user.model';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUserSubject: BehaviorSubject<LoggedInUserModel>;
  public currentUser: Observable<LoggedInUserModel>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedInUserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUserModel {
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(model: LoggedInUserModel ) {
    this.currentUserSubject.next(model);
  }

  public getHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders;
    httpHeaders.append('Content-Type',  'application/json');
    const user = this.currentUserValue;
    if (user) {
       httpHeaders.append('Authorization' , 'Bearer ' + user.token);
    }
    return httpHeaders;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.setCurrentUserValue(null);
    // this.currentUserSubject.next(null);
}

}
