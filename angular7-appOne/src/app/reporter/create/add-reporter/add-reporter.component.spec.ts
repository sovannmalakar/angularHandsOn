import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReporterComponent } from './add-reporter.component';

describe('AddReporterComponent', () => {
  let component: AddReporterComponent;
  let fixture: ComponentFixture<AddReporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
