import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public show:boolean = true;
  constructor(private sideBarService:SidebarService) { }

  ngOnInit() {
    this.sideBarService.change.subscribe(show=>{this.show=show});
  }
  
}
