import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from '../login-service/login-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { AppService } from 'src/app/app.service';
import { NavServiceService } from 'src/app/navbar/nav-service.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  public username: string;
  public password: string;
  constructor(private appService: NavServiceService, private router: Router, private service: LoginServiceService, private formBuilder: FormBuilder) { }
  ngOnInit() {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  loginServer(username: string, password: string) {
     console.log("login service is going to call");
     this.service.loginServiceCall(username, password);
  }
  onSubmit() {
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;
      if (this.username == null && this.password == null) {
        this.error = "Please provide username and password";
      } else {
      console.log(this.loginForm.value.username);  // { first: '', last: '' } // false
      this.loginServer(this.username, this.password);
      debugger
      var user_token = localStorage.getItem('user_token');
      localStorage.removeItem('user_token');
      localStorage.removeItem('reporter_token');
      if (user_token == '' || user_token == null)
       {
        this.error = "Unrecognized User";
       } else {
         this.error = "Successfully logged in";
         debugger
         //this.service.isSignIn();
         this.appService.setSignStatus(true);
         this.router.navigate(['user']);
        }
      }
  }
}