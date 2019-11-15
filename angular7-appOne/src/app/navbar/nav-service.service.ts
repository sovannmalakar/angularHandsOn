import { Injectable } from '@angular/core';
import { NavbarComponent } from './navbar.component';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  constructor(private navComponent: NavbarComponent) { }
  getSignInStatus()
  {
    return this.navComponent.isLogIn;
  }
setSignStatus(status: boolean)
{
  this.navComponent.isLogIn = status;
}
}
