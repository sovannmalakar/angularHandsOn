
import { Component, ViewEncapsulation, Output, EventEmitter, Input, AfterViewInit, OnInit } from '@angular/core';
import { AppApiService } from './../../core/services/app-api.service';
import { GlobalsService } from '../globals.service';
import { PartnerProfileModel } from '../../core/model/partner-profile.model';

@Component({
  selector: 'ngx-chips-example', // tslint:disable-line
  template: `
<div class="card mb-4">
  <h6 class="card-header">
    Service Offered
  </h6>
  <div class="card-body demo-vertical-spacing-sm">
    <tag-input
        ngDefaultControl
      [(ngModel)]="items"
      secondaryPlaceholder = "Enter Service names"
      placeholder = "+ Service"
      [onlyFromAutocomplete]="true"
      name='items'
      [editable]= 'true'
      (onRemove)="onChange($event)"
      (onAdd)="onChange($event)"
      >
      <tag-input-dropdown
      [identifyBy]="'productGuid'" [displayBy]="'productName'"
        [showDropdownIfEmpty]="true"
        [autocompleteItems]="autocompleteItems">
      </tag-input-dropdown>
    </tag-input>

    <div>

    </div>

    <!-- Variations -->


    <!-- Validation states -->


  </div>
</div>
  `,
  styleUrls: [
    '../../../vendor/libs/ngx-chips/ngx-chips.scss',
    '../../../vendor/libs/ng2-dropdown-menu/ng2-dropdown-menu.scss'
  ],
  // Have to use `ViewEncapsulation.None` to restyle ng2-dropdown-menu
  encapsulation: ViewEncapsulation.None
})
export class NgxChipsExampleComponent implements OnInit {

  items;
  autocompleteItems = [];
  disabled = false;
  @Output() productSelected = new EventEmitter();
  @Input() child;

  constructor(private global: GlobalsService , private appApiService: AppApiService ) {
    this.appApiService.getAllProductsForSelection().subscribe((data) => {
      console.log(data);
      this.autocompleteItems = data.model;
    });

  }

  onChange (e) {
    if (this.items.length > 0) {
      const mapValue = this.items.map((f) => f.value);
      this.productSelected.emit(mapValue);
    }
  }

  ngOnInit() {
    setTimeout( () =>  {
      console.log(this.global.userData);
      this.items = this.global.userData;
    }, 3000);
  }

}
