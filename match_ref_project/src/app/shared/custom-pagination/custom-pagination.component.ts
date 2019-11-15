import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnInit {

  constructor() { }

  @Input() collectionSize;
  @Input() page;
  @Input() pageSize;

  @Output() pageEvent = new EventEmitter<number>();

  ngOnInit() {
  }

  onPageChange(e) {
    this.pageEvent.emit(e);
  }

}
