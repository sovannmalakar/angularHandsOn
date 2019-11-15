import { Component, OnInit, Host, HostListener,  } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogIn = false;
  constructor(private sideBarService: SidebarService) { }

  ngOnInit() {
  }
  @HostListener('showhide')
  showhide(){
    this.sideBarService.toggle();
  }

}
