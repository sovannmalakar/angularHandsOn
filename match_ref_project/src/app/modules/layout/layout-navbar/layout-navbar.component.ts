import { Component, Input, HostBinding, AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AppService } from '../../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './../../../core/services/session.service';
import { LoggedInUserModel } from './../../../core/model/logged-in-user.model';
import { GlobalsService } from './../../../../app/shared/globals.service';



import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements AfterViewInit {
  isExpanded = false;
  isRTL: boolean;
  currentUser: LoggedInUserModel;
  currentUserTypeValue;
  pageTitle: string;
  @Input() sidenavToggle = true;
  headerData: string;
  @HostBinding('class.layout-navbar') private hostClassMain = true;

  private updateSuccess: EventEmitter<boolean> = new EventEmitter();

  constructor(private appService: AppService,
     private layoutService: LayoutService, private router: Router,
    private sessionService: SessionService ,
     private global: GlobalsService,
     public cd: ChangeDetectorRef,
     private modalService: NgbModal) {
      // this.global.pageTitle.subscribe(y => this.headerData = y);
      this.sessionService.currentUser.subscribe(x => this.currentUser = x);
      this.global.pageTitle.subscribe(y =>  this.pageTitle = y);
      switch (this.currentUser.userType) {
        case this.global.userType.Firm:
        this.currentUserTypeValue = 'Firm';
        break;

        case this.global.userType.Reporter:
        this.currentUserTypeValue = 'Reporter';
        break;

        case this.global.userType.Lawyer:
        this.currentUserTypeValue = 'Lawyer';
        break;

        // case this.global.PartnerTypes.SuperAdmin:
        // this.currentUserTypeValue = 'SuperAdmin';
        // break;

        // case this.global.PartnerTypes.SupportAdmin:
        // this.currentUserTypeValue = 'SupportAdmin';
        // break;

        // case this.global.PartnerTypes.LimitedAdmin:
        // this.currentUserTypeValue = 'LimitedAdmin';
        // break;

        // case this.global.PartnerTypes.FirmAdmin:
        // this.currentUserTypeValue = 'FirmAdmin';
        // break;
      }
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/landing']);
}

  goToMyProfile () {
    this.router.navigate(['/userProfile']);
  }

  ngAfterViewInit () {
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  notifyChild () {
    this.updateSuccess.emit(true);
  }
}
