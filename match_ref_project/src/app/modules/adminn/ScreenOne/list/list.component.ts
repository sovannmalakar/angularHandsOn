import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import {MockServerResultsService} from './service/mock-server-results-service';
import {PagedData} from './model/paged-data';
import {CorporateEmployee} from './model/corporate-employee';
import {Page} from './model/page';
import { Router } from '@angular/router';
import { DataService } from '../add/service/data.service';

@Component({
  selector: 'app-list',
  providers: [
      MockServerResultsService,
      DataService
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss',
               '../../../../../../node_modules/@swimlane/ngx-datatable/release/index.css',
                '../../../../../vendor/libs/ngx-datatable/ngx-datatable.scss',
                '../../../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
                '../../../../../vendor/libs/ng-select/ng-select.scss'],
 encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  // constructor() { }

  // rows = [];

  // ngOnInit() {
  //   this.fetch((data) => {
  //     this.rows = data;
  //   });
  // }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `https://raw.githubusercontent.com/swimlane/ngx-datatable/master/assets/data/100k.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }

  page = new Page();
  rows = new Array<CorporateEmployee>();
  selected = [];

  selectedPersonId2 = 10;
  limitOptions = [
    {
      key: '10',
      value: 10
    },
    {
      key: '25',
      value: 25
    },
    {
      key: '50',
      value: 50
    },
    {
      key: '100',
      value: 100
    },
    {
      key: '250',
      value: 250
    },
    {
      key: '500',
      value: 500
    }
  ];

  constructor(private serverResultsService: MockServerResultsService, private router: Router, private data:  DataService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  @ViewChild('myTable') table;

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */


  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.gotoTop();
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  show(offset , pageSize) {
    const startval = (pageSize * offset) + 1;
    const endVal = (offset + 1) * pageSize;
    return startval + '-' + endVal;
  }

  onActivate(event) {
  }

  filterSize (e) {
    this.page.size = Number(e);
    this.setPage({ offset: 0 });
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  addAdvertisement() {
    localStorage.setItem('dataSource', '');
    this.router.navigate(['/adminScreenOne/add']);
  }

  edit (e, row) {
    localStorage.setItem('dataSource', JSON.stringify(row));
    this.router.navigate(['/adminScreenOne/add']);
  }

}
