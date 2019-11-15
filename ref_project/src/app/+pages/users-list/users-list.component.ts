import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService) {
    this.appService.pageTitle = 'User list - Pages';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: Object[] = [];
  originalUsersData: Object[] = [];

  loadData() {
    this.http.get(this.dataUrl)
      .subscribe((data: any) => {
        this.originalUsersData = data.slice(0);
        this.update();
      });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    this.totalItems = this.originalUsersData.length;
    this.usersData = this.paginate(this.originalUsersData);
  }



  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }
}
