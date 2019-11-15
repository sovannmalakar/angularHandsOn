import { Component, ViewEncapsulation, AfterViewChecked, ViewChild, ElementRef, OnInit, Input,  AfterViewInit } from '@angular/core';
import { AppService } from '../../../../app/app.service';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { isSameDay, isSameMonth, differenceInDays, addDays, addMinutes } from 'date-fns';
import { NgbModal, NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { CustomCalendarService } from './../services/custom-calendar.service';
import { first } from 'rxjs/operators';

import { CalendarViewModel } from './../../../core/model/calendar-view.model';
import { CalendarEntryModel } from './../../../core/model/add/calendar-entry.model';
import { ToastrService } from 'ngx-toastr';

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();


@Component({
  selector: 'app-custom-calendar-container',
  templateUrl: './custom-calendar-container.component.html',
  styleUrls: ['../../../../vendor/libs/angular-calendar/angular-calendar.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  encapsulation: ViewEncapsulation.None
})
export class CustomCalendarContainerComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @Input() pageTitleFromDashBoard: string;

  @ViewChild('newEventModal') newEventModal;

  isRTL: boolean;
  fromDashBoard = false;

  events: CalendarEvent[] = [];
  clientsData: CalendarViewModel;
  view = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen = false;
  locale = 'en';
  autofocus = true;
  isEdit = false;

  nativeFromDateModel: any;
  nativeToDateModel: Date;

  addEventModel: CalendarEntryModel = {
    calendarGuid: '',
    calendarEntryType: 2,
    startDate: new Date(),
    endDate: new Date(),
    title : '',
    notes : '',
  };

  calendarDropdownTypes = [
    {value : 1 , label: 'Vacation '},
    {value : 2 , label: 'PersonalWork'},
    {value : 3 , label: 'Job'},
    // {value : 4 , label: 'MatchJob'}
  ];

  refresh: Subject<any> = new Subject();

  constructor(private appService: AppService, private toaster: ToastrService,
    private customCalendarService: CustomCalendarService,
    private modalService: NgbModal , private global: GlobalsService,
    private ngbDateParserFormatter: NgbDateParserFormatter) {
   }

  ngOnInit() {

    this.getCalendar();
  }

  ngAfterViewInit ( ) {
      if (this.pageTitleFromDashBoard) {
        this.fromDashBoard = true;
        this.global.setPageTitleValue(this.pageTitleFromDashBoard);
      } else {
        this.fromDashBoard = false;
        this.global.setPageTitleValue('Calendar');
      }
  }

  onFromDateSelect(date) {
    // tslint:disable-next-line:max-line-length
    // this.addEventModel.startDate = this.nativeFromDateModel ? this.nativeFromDateModel : new Date() ;
  }

  onToDateSelect(date) {
    // this.addEventModel.endDate = this.nativeToDateModel ? this.nativeToDateModel : new Date() ;
  }

  calendarEntryTypeChanged (e) {
    this.addEventModel.calendarEntryType = e;
  }

  getCalendar () {
    if (this.view === 'month') {
      this.getMonthData();
    } else if (this.view === 'week') {
      this.getWeekData();
    } else if (this.view === 'day') {
      this.getDayData();
    }
  }

  getMonthData () {
    const month = this.viewDate.getUTCMonth() + 1; // months from 1-12
    const year = this.viewDate.getUTCFullYear();
    this.customCalendarService.getMonth({month: month , year: year})
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
        const myData = this.customCalendarService.eventMap(this.clientsData);
        this.events = this.createEvents(myData);
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  getWeekData () {
    const month = this.viewDate.getUTCMonth() + 1; // months from 1-12
    const year = this.viewDate.getUTCFullYear();
    const day = this.viewDate.getUTCDate();
    this.customCalendarService.getWeek({day: day, month: month , year: year})
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
        const myData = this.customCalendarService.eventMap(this.clientsData);
        this.events = this.createEvents(myData);
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  getDayData () {
    const month = this.viewDate.getUTCMonth() + 1; // months from 1-12
    const year = this.viewDate.getUTCFullYear();
    const day = this.viewDate.getUTCDate();
    this.customCalendarService.getDay({day: day , month: month , year: year})
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
        const myData = this.customCalendarService.eventMap(this.clientsData);
        this.events = this.createEvents(myData);
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  createEvent(_event: CalendarEvent) {
    // Extend event object
    Object.assign(_event, {
      draggable: true,
      resizable: {
        // Disable event resizing in RTL mode
        beforeStart: !this.isRTL,
        afterEnd: !this.isRTL
      },
      actions: [{
        label: '<i class="ion ion-md-create"></i>',
        onClick: ({ event }) => this.edit(event)
      }, {
        label: '<i class="ion ion-md-close"></i>',
        onClick: ({ event }) => this.delete(event) // this.events = this.events.filter(ev => ev !== event)
      }]
    });

    // Set default "end" option if event resizeable
    if (!_event.end && !this.isRTL) {
      _event.end = addMinutes(_event.start, 30);
    }

    return _event;
  }

  edit (data) {
    this.nativeFromDateModel = this.ngbDateParserFormatter.format(data.startDate);
    this.isEdit = true;
    this.addEventModel = data;
    this.modalService.open(this.newEventModal);
    console.log(data);
  }


  createEvents(events: CalendarEvent[]): CalendarEvent[] {
    return events.map(_event => this.createEvent(_event));
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent) {
    // RTL support for drag event
    if (!this.fromDashBoard) {
      if (this.isRTL && this.view === 'week') {
        const delta = differenceInDays(event.start, newStart);
        newStart = addDays(event.start, delta);
        if (event.end) {
          newEnd = addDays(event.end, delta);
        }
      }
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    // Open/close month event details
    if (isSameMonth(date, this.viewDate) && !this.fromDashBoard) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent) {
    if (!this.fromDashBoard) {
      alert(`Event "${event.title}" clicked!`);
    }
  }

  addEvent(content) {
    this.isEdit = false;
    // Open modal and add event after close
    this.autofocus = true;
    this.modalService.open(content);
  }

  saveEntryToDb () {
       if (!this.addEventModel.title) {
        this.toaster.warning('Event Title is required');
       } else if (!this.addEventModel.notes) {
        this.toaster.warning('Event Title is required');
       } else {
        this.customCalendarService.addCalendar(this.addEventModel)
         .pipe(first())
         .subscribe(result1 => {
           if (result1.isSuccess) {
             this.events.push(this.createEvent({
               title: result1.model.title,
               cssClass: 'cal-event-info',
               start: result1.model.startDate,
               end: result1.model.endDate
             }));
             this.toaster.success('Event added successfully');
             this.addEventModel.title = '';
             this.addEventModel.notes = '';
              this.addEventModel.calendarEntryType = 2;
              this.addEventModel.startDate = new Date();
              this.addEventModel.endDate = new Date();
             this.refresh.next();
             this.modalService.dismissAll();
             this.getCalendar();
           }
         }, err => {
           if (!err.ok) {
             this.global.showError(err);
             this.modalService.dismissAll();
           }
         });
       }
}

editEntryToDb () {
  this.customCalendarService.editCalendar(this.addEventModel)
         .pipe(first())
         .subscribe(result1 => {
           if (result1.isSuccess) {
             this.events.push(this.createEvent({
               title: result1.model.title,
               cssClass: 'cal-event-info',
               start: result1.model.startDate,
               end: result1.model.endDate
             }));
             this.toaster.success('Event Updated successfully');
             this.addEventModel.title = '';
             this.addEventModel.notes = '';
              this.addEventModel.calendarEntryType = 2;
              this.addEventModel.startDate = new Date();
              this.addEventModel.endDate = new Date();
             this.refresh.next();
             this.modalService.dismissAll();
             this.getCalendar();
           }
         }, err => {
           if (!err.ok) {
             this.global.showError(err);
             this.modalService.dismissAll();
           }
         });
}

delete (e) {
  this.customCalendarService.deleteCalendar(e.calendarGuid)
         .pipe(first())
         .subscribe(result1 => {
           if (result1.isSuccess) {
            this.events = this.events.filter(ev => ev !== e);
             this.toaster.success('Event Deleted successfully');
           }
         }, err => {
           if (!err.ok) {
             this.global.showError(err);
             this.modalService.dismissAll();
           }
         });
}

  // ------------------------------------------------------------------
  // RTL support
  // Far from a perfect solution, but there is no choice
  //

  @ViewChild('calendarContainer') calendarContainer: ElementRef; // tslint:disable-line

  ngAfterViewChecked() {
    if (this.isRTL && this.view !== 'month') {
      const re = /margin-left:\s*([\d.]+?(?:px|%))/;
      const elements: HTMLElement[] = this.calendarContainer.nativeElement.querySelectorAll('.cal-event-container');

      elements.forEach(el =>
        el.setAttribute(
          'style',
          el.getAttribute('style').replace(re, (_m: string, $1: string) => `margin-right: ${$1}`)
        )
      );
    }
  }

}
