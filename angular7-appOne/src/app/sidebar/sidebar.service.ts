import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public show: boolean = true;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  toggle() {
    this.show = !this.show;
    this.change.emit(this.show);
  }
}
