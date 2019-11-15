import { Component, OnInit } from '@angular/core';
import { ReporterServiceService } from '../service/reporter-service.service';
import {Reporter} from '../reporterModel/reporter.model';

@Component({
  selector: 'app-reporter-table-view',
  templateUrl: './reporter-table-view.component.html',
  styleUrls: ['./reporter-table-view.component.css']
})
export class ReporterTableViewComponent implements OnInit {
  reporterModel: Reporter[];
  constructor(public reporterService: ReporterServiceService) { }

  ngOnInit() {
    this.reporterModel =  JSON.parse(this.reporterService.getUserData());
    console.log(this.reporterModel[0]);
  }

}
