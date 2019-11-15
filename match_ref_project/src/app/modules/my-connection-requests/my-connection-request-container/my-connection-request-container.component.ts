import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { ApiService } from './../../../../app/core/services/api.service';
import { AppService } from './../../../../app/app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-connection-request-container',
  templateUrl: './my-connection-request-container.component.html',
  styleUrls: ['./my-connection-request-container.component.scss',
  './../../../../vendor/styles/pages/contacts.scss']
})
export class MyConnectionRequestContainerComponent implements OnInit {

  viewMode = 'col';
  constructor(private apiService: ApiService,
    private global: GlobalsService,
    private appService: AppService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService) {
      this.global.setPageTitleValue('My Connection Request');
  }

  contactsData;
     modalTitle = '';
     reply = {
      advertisementReplyMessageGuid : '',
      message : ''
    };


  ngOnInit() {
    this.contactsData = [
      {
        'partnerGuid': '17a7c6cb-cd1c-4659-bc0d-ea3e08d10ff6',
        'contactFirstName': 'Norrie',
        'contactLastName': 'Duplan',
        'companyName': 'Treutel, Powlowski and Gorczany',
        'website': 'apple.com',
        'email': 'nduplan0@blog.com',
        'phone': '6074236682',
        'products': [{}],
        'avatar': 'https://robohash.org/quaeratdoloreeum.jpg?size=50x50&set=set1'
      },
      {
        'partnerGuid': '4044274b-8bdd-42fb-8f9c-e74c50b3d06c',
        'contactFirstName': 'Halli',
        'contactLastName': 'Ridsdale',
        'companyName': 'Homenick, Dare and Morar',
        'website': 'ustream.tv',
        'email': 'hridsdale1@icq.com',
        'phone': '7752416746',
        'products': [{}, {}, {}],
        'avatar': 'https://robohash.org/omnisatqui.jpg?size=50x50&set=set1'
      },
      {
        'partnerGuid': '003454c6-9ba1-4c08-a495-ef91b410f67c',
        'contactFirstName': 'Andrea',
        'contactLastName': 'Provis',
        'companyName': 'Dooley-Lynch',
        'website': 'sogou.com',
        'email': 'aprovis2@wiley.com',
        'phone': '9517390807',
        'products': [{}, {}],
        'avatar': 'https://robohash.org/maximenecessitatibuseveniet.bmp?size=50x50&set=set1'
      },
      {
        'partnerGuid': 'c0613acf-f89f-498b-931c-82e8061df4e8',
        'contactFirstName': 'Shandeigh',
        'contactLastName': 'Rayson',
        'companyName': 'Littel, Schaefer and Boehm',
        'website': 'tuttocitta.it',
        'email': 'srayson3@altervista.org',
        'phone': '6122542245',
        'products': [{}, {}, {}, {}],
        'avatar': 'https://robohash.org/etminusrepellat.png?size=50x50&set=set1'
      },
      {
        'partnerGuid': '2df9f0d5-593f-4725-a7cb-90bb1bf8a388',
        'contactFirstName': 'Aurelia',
        'contactLastName': 'Hegg',
        'companyName': 'Beier-Deckow',
        'website': 'fema.gov',
        'email': 'ahegg4@hatena.ne.jp',
        'phone': '3794874439',
        'products': [{}, {}, {}],
        'avatar': 'https://robohash.org/velidvoluptates.bmp?size=50x50&set=set1'
      },
      {
        'partnerGuid': '373e0237-a7f2-49d9-8fb1-2ec5fe92e2f8',
        'contactFirstName': 'Frankie',
        'contactLastName': 'Iamittii',
        'companyName': 'Barrows, Wolf and Boyle',
        'website': 'icio.us',
        'email': 'fiamittii5@msn.com',
        'phone': '4706425727',
        'products': [{}, {}, {}, {}],
        'avatar': 'https://robohash.org/consequunturvoluptatemsunt.png?size=50x50&set=set1'
      },
      {
        'partnerGuid': 'ed980a86-31d9-4bdf-993e-c0ba684e821f',
        'contactFirstName': 'Gay',
        'contactLastName': 'Skelcher',
        'companyName': 'Reichel and Sons',
        'website': 'gmpg.org',
        'email': 'gskelcher6@auda.org.au',
        'phone': '3600008897',
        'products': [{}],
        'avatar': 'https://robohash.org/vitaeeumdolorum.png?size=50x50&set=set1'
      },
      {
        'partnerGuid': '24caa4cf-2323-49a2-bbd4-0a22b54222ad',
        'contactFirstName': 'Dani',
        'contactLastName': 'Linthead',
        'companyName': 'Orn, Bradtke and Abshire',
        'website': 'epa.gov',
        'email': 'dlinthead7@wix.com',
        'phone': '2353503071',
        'products': [{}],
        'avatar': 'https://robohash.org/eiusnisimagni.png?size=50x50&set=set1'
      },
      {
        'partnerGuid': '5baea746-30d1-4f0c-8946-0055302b1d35',
        'contactFirstName': 'Nathalia',
        'contactLastName': 'Eaves',
        'companyName': 'Connelly, Bauch and Schowalter',
        'website': 'free.fr',
        'email': 'neaves8@opensource.org',
        'phone': '9596478990',
        'products': [{}],
        'avatar': 'https://robohash.org/uttemporepraesentium.bmp?size=50x50&set=set1'
      },
      {
        'partnerGuid': '8635fc5c-57c5-4868-b97d-c7d8abe8dc01',
        'contactFirstName': 'Anselm',
        'contactLastName': 'Raeside',
        'companyName': 'Berge, Boyle and Kiehn',
        'website': 'unesco.org',
        'email': 'araeside9@ca.gov',
        'phone': '1312195010',
        'products': [{}],
        'avatar': 'https://robohash.org/voluptascorruptieligendi.jpg?size=50x50&set=set1'
      }
    ];
  }

  openModalForReply(content, options ) {
    this.modalTitle = options.data.contactFirstName ? options.data.contactFirstName : 'User' ;
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

  submitReply () {
    this.reply.message  = '';
    this.toastr.success('Accepted successfully!');
    this.modalService.dismissAll();
  }


  confirmToConnect (content, options) {
    this.modalTitle = options.data.contactFirstName ? options.data.contactFirstName : 'Contact' ;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  submitDisConnect () {
    this.reply.message  = '';
    this.toastr.success('Successfully Declined!');
    this.modalService.dismissAll();
  }

}


