import { Component, Input, ChangeDetectionStrategy, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../../app.service';
import { LayoutService } from '../layout.service';
import { Subscription } from 'rxjs';
import { GlobalsService } from '../../../shared/globals.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidenavComponent implements AfterViewInit, OnDestroy {
  hideIfLawyer = false;
  hideIfReporter = false;
  @Input() orientation = 'vertical';

  @HostBinding('class.layout-sidenav') private hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') private hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') private hostClassFlex = false;
  mySubscription: Subscription;
  constructor(private router: Router,
     private appService: AppService,
      private layoutService: LayoutService,
      private global: GlobalsService,
      private session: SessionService) {

        this.hideIfLawyer = session.currentUserValue.userType === global.userType.Lawyer ? true : false;
        this.hideIfReporter = session.currentUserValue.userType === global.userType.Reporter ? true : false;
    // Set host classes
    this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngAfterViewInit() {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();
  }

  getClasses() {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }


}
