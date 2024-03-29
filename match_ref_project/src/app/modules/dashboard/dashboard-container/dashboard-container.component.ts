import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { GlobalsService } from '../../../shared/globals.service';
import { SearchJobsService } from '../../search-jobs/services/search-jobs.service';
import { JobSearchCriteria } from './../../../core/model/search/job-search-criteria.model';
import { first } from 'rxjs/operators';
import { JobSearchResultModel } from './../../../core/model/Job-search-result.model';
import { CustomCalendarContainerComponent} from './../../custom-calendar/custom-calendar-container/custom-calendar-container.component';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
 import { DashboardService } from './../services/dashboard.service';
 import { DashboardModel } from '../../../core/model/dashboard.model';
@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  displayRangeModel = 12;
  dashBoardStats: DashboardModel = {
    totalContacts: 0,
    totalContactRequests: 0,
    totalMyJobs: 0,
    totalMyAds: 0,
    totalAdReplies: 0
  };
  constructor(
    private searchJobsService: SearchJobsService,
     private global: GlobalsService,
     private route: Router,
     private sessionService: SessionService,
     private dashboardService: DashboardService
  ) {
    this.global.setPageTitleValue('Dashboard');
  }

  clientsData: JobSearchResultModel;
  collectionSize;
  baseSearchRequest = this.global.baseSearchReq;
  markerData;
  refreshMap = true;

  defaultRequest = {
    maxAllowedMiles: 100,
    location: this.sessionService.currentUserValue.userCity,
    latitude: this.sessionService.currentUserValue.userLatitude,
    longitude: this.sessionService.currentUserValue.userLongitude,
    productGuids: []
  };

  requestModel: JobSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};

   // Chart 1
  //

  chart1Data = [
    {
    label: 'Visits',
    data: [14, 37, 30, 46, 80, 42, 33, 13, 25, 6, 88, 96],
    borderWidth: 1,
    fill: false
  }, {
    label: 'Returns',
    data: [56, 17, 19, 96, 73, 46, 67, 40, 77, 43, 64, 54],
    borderWidth: 1,
    borderDash: [5, 5]
  }];
  chart1Options = {
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa',
          autoSkipPadding: 50
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa',
          maxTicksLimit: 5
        }
      }]
    },

    responsive: false,
    maintainAspectRatio: false
  };
  chart1Colors = [{
    backgroundColor: 'rgba(38, 180, 255, 0.1)',
    borderColor: '#26B4FF'
  }, {
    backgroundColor: 'rgba(136, 151, 170, 0.1)',
    borderColor: '#8897aa'
  }];


  // Chart 2
  //

  chart2Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 0
  }];
  chart2Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart2Colors = [{
    backgroundColor: '#673AB7'
  }];


  // Chart 3
  //

  chart3Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart3Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart3Colors = [{
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#009688',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 4
  //

  chart4Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart4Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart4Colors = [{
    backgroundColor: 'rgba(206, 221, 54, 0)',
    borderColor: 'rgba(206, 221, 54, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 5
  //

  chart5Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart5Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart5Colors = [{
    backgroundColor: 'rgba(136, 151, 170, .2)',
    borderColor: 'rgba(136, 151, 170, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 6
  //

  chart6Data = [{
    data: [1225, 654, 211],
    borderWidth: 1
  }];
  chart6Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart6Colors = [{
    backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
    borderColor: ['#647c8a', '#2196f3', '#02bc77']
  }];


  // Chart 7
  //

  chart7Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 0
  }];
  chart7Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart7Colors = [{
    backgroundColor: '#8897AA'
  }];


  // Chart 8
  //

  chart8Data = [{
    data: [1225, 654, 211, 402],
    borderWidth: 1
  }];
  chart8Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart8Colors = [{
    backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)', 'rgba(206, 221, 54, 0.5)'],
    borderColor: ['#647c8a', '#2196f3', '#02bc77', 'rgba(206, 221, 54, 1)']
  }];

  // Resize charts
  //

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  ngOnInit() {
    this.getJobs();
    this.getStats();
  }

  getStats () {
    this.dashboardService.getDashboardData()
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.dashBoardStats = result.model;
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  getJobs () {
    this.searchJobsService.searchJobs(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
         this.collectionSize = result.totalRecords;
         this.refreshMap = false;
         setTimeout(() => {
           this.refreshMap = true;
         }, 100);
        this.markerData = this.clientsData;
        this.markerData = this.markerData.map ((f) => {
          return {jobName: f.jobName ,
             latitude: f.latitude ,
              longitude : f.longitude,
               city: f.locationCity,
              state: f.locationState,
              address: f.locationAddress1,
              country: f.locationCountry,
              zip: f.locationZip,
              company: f.advertiserPartnerCompanyName,
              type: 'job'
            };
        });
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  navigateToDetail (type) {
    switch (type) {
      case 1:
        this.route.navigate(['/contacts/']);
        break;
      case 2:
      this.route.navigate(['/myConnectionRequests/connectioRequests/']);
        break;
      case 3:
        this.route.navigate(['/jobs/']);
        break;
      case 4:
        this.route.navigate(['/advertisement/']);
        break;
      case 5:
        this.route.navigate(['/jobreplies/']);
        break;
      case 6:
        this.route.navigate(['/advertisement/']);
        break;
      case 7:
        this.route.navigate(['/calendar/']);
        break;
      default:
        break;
    }
  }

}
