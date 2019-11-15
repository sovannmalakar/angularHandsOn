import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public Text: string ;
  constructor() {  }
  ngOnInit() {  this.Text = 'Advance Search'; }
  public changeText(): void {
    if (this.Text === 'Advance Search') {
      this.Text = 'Simple Search';
    } else {
      this.Text = 'Advance Search';
    }
  }

}
