import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  public getHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type',  'application/json');
    var token = localStorage.getItem('user_token');
    if (token) {
       httpHeaders.append('Authorization' , 'Bearer ' + token);
    }
    return httpHeaders;
  }

  getToken(user_url: string)
   {
    return this.http.get(user_url).subscribe((data) => {
      var responseData = Array.from(Object.keys(data), k=>data[k]);
      var token = responseData[0].token;
      localStorage.setItem('user_token', token);
    });
   }

}
