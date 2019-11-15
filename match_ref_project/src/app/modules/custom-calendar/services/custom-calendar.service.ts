import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';
import { CalendarViewModel } from './../../../core/model/calendar-view.model';
import { CalendarEntryModel } from './../../../core/model/add/calendar-entry.model';

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
@Injectable({
  providedIn: 'root'
})
export class CustomCalendarService {


  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  getMonth(myCalendarReq): Observable<ReturnModel<CalendarViewModel>> {
    return this.frameworkHttpClientService
               .getWithParams<CalendarViewModel>(environment.baseUrl + '/api/partner/calendarbymonth', myCalendarReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  getWeek(myCalendarReq): Observable<ReturnModel<CalendarViewModel>> {
    return this.frameworkHttpClientService
               .getWithParams<CalendarViewModel>(environment.baseUrl + '/api/partner/calendarbyweek', myCalendarReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  getDay(myCalendarReq): Observable<ReturnModel<CalendarViewModel>> {
    return this.frameworkHttpClientService
               .getWithParams<CalendarViewModel>(environment.baseUrl + '/api/partner/calendarbyday', myCalendarReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  eventMap (customResp) {
    const arr = [];
    let cssClass = 'cal-event-success';
    customResp.map( (f) => {
      if (f.calendarEntryType === 1 ) {
        cssClass = 'cal-event-success';
      } else if (f.calendarEntryType === 2) {
        cssClass = 'cal-event-warning';
      } else if (f.calendarEntryType === 3) {
        cssClass = 'cal-event-info';
      } else if (f.calendarEntryType === 4) {
        cssClass = 'cal-event-danger';
      }
      arr.push({
        title : f.title ,
        calendarGuid : f.calendarGuid,
        notes : f.notes,
        calendarEntryType : f.calendarEntryType,
        start: new Date(f.startDate),
        end: new Date(f.endDate) ,
        startDate : new Date(f.startDate) ,
         endDate : new Date(f.endDate) ,
         allDay : true,
         cssClass: cssClass
        });
    });
    return arr;
  }

  public addCalendar(saveCalendarReq): Observable<ReturnModel<CalendarEntryModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .post<CalendarEntryModel>(environment.baseUrl + '/api/partner/addcalendarentry', saveCalendarReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  public editCalendar(editCalendarReq): Observable<ReturnModel<CalendarEntryModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .put<CalendarEntryModel>(environment.baseUrl + '/api/partner/updatecalendarentry', editCalendarReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  public deleteCalendar(deleteCalendarReq): Observable<ReturnModel<CalendarEntryModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .deleteWithParams<CalendarEntryModel>(environment.baseUrl + '/api/partner/deletecalendarentry', {guid : deleteCalendarReq})
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }
}


interface EventColor {
  primary: string;
  secondary: string;
}

interface EventAction {
  label: string;
  cssClass?: string;
  onClick({event}: {event: CalendarEvent}): any;
}


interface CalendarEvent<MetaType = any> {
  start: Date;
  end?: Date;
  title: string;
  color: EventColor;
  actions?: EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: MetaType;
}
