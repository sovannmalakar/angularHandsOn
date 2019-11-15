import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporterServiceService {
  //public token: string;
  public baseURL = "http://match-beta.yeslaw.net/";
  public apiURL: string = 'http://match-beta.yeslaw.net/api/account/login?Username=user1&Password=user1';
  public repoterURL = this.baseURL +"api/partner/searchreporters";
  constructor(public http: HttpClient) { }
  /*getToken(user_url: string)
  {
    this.apiURL = user_url;
    return this.http.get(this.apiURL);
  }*/
  getUserData()
  {
    /*this.getToken(this.apiURL).subscribe((data) => {
      var responseData = Array.from(Object.keys(data), k=>data[k]);
      var token = responseData[0].token;
      localStorage.setItem('user_token', token);
    });
    let reporterToken = localStorage.getItem("reporter_token");
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + reporterToken);
    let httpOptions = {
      headers: headers_object
    };*/
    var reporterData;
    debugger
    reporterData = this.http.get(this.repoterURL).subscribe((data) => {
    reporterData = Array.from(Object.keys(data), k=>data[k]);
    var listData = JSON.stringify(reporterData[0]);
    localStorage.setItem('list_data', listData);
   });
   // console.log(localStorage.getItem("list_data"));
    return localStorage.getItem("list_data");
  }

}
