import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggedInUserModel } from './../model/logged-in-user.model';


import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  // private currentUserSubject: BehaviorSubject<LoggedInUserModel>;
  // public currentUser: Observable<LoggedInUserModel>;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    // this.currentUserSubject = new BehaviorSubject<LoggedInUserModel>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }



  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                 this.sessionService.setCurrentUserValue(user);
            }

            return user;
        }));
}



}
