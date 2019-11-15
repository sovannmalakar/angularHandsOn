import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public baseURL = 'http://match-beta.yeslaw.net/api/account/login?';
  constructor( private loginService: SessionService,private http: HttpClient) { }
  public loginServiceCall(uname: string, password: string) {
    if (uname != null && password != null ) {
      return this.http.get(this.baseURL + 'Username=' + uname + '&Password=' + password).subscribe((data) => {
        var responseData = Array.from(Object.keys(data), k=>data[k]);
        var token = responseData[0].token;
        localStorage.setItem('user_token', token);
      });
    } else {
      return 'Please provide username and password.';
    }
  }

  isSignIn()
  {
   // return this.navComponent.isLogIn = true;
  }

}
