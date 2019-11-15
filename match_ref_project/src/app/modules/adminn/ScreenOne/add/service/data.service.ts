import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>('default message 1');
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: string) {
      this.messageSource.next(message);
    }
}
