import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-template-cmp',
  templateUrl: './block-template-cmp.component.html',
  styleUrls: ['./block-template-cmp.component.scss']
})
export class BlockTemplateCmpComponent implements OnInit {
  message;
  constructor() { }

  ngOnInit() {
  }

}
