import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarContainerComponent } from './custom-calendar-container.component';

describe('CustomCalendarContainerComponent', () => {
  let component: CustomCalendarContainerComponent;
  let fixture: ComponentFixture<CustomCalendarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalendarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalendarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
