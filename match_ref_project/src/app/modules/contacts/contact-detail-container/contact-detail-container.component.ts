import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { GlobalsService } from './../../../../app/shared/globals.service';

@Component({
  selector: 'app-contact-detail-container',
  templateUrl: './contact-detail-container.component.html',
  styleUrls: ['./contact-detail-container.component.scss']
})
export class ContactDetailContainerComponent implements OnInit {

  id = '';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private global: GlobalsService) {
      this.global.setPageTitleValue('Contact Details');
     }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
