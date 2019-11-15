import { Component, OnInit } from '@angular/core';
import { ReporterServiceService } from '../service/reporter-service.service';
import {Reporter} from '../reporterModel/reporter.model';

@Component({
  selector: 'app-reporter-list',
  templateUrl: './reporter-list.component.html',
  styleUrls: ['./reporter-list.component.css']
})
export class ReporterListComponent implements OnInit {
  reporterModel: Reporter[];
  constructor(public reporterService: ReporterServiceService) { }
  isTable = true;
  ngOnInit() {
    this.reporterModel =  JSON.parse(this.reporterService.getUserData());
    console.log(this.reporterModel[0]);
  }
  toggleView()
  {
    if(this.isTable)
    {
      this.isTable = false;
    }else{
      this.isTable = true;
    }
  }
}
