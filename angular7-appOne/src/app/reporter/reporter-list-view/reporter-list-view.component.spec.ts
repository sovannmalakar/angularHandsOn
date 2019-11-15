import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterListViewComponent } from './reporter-list-view.component';

describe('ReporterListViewComponent', () => {
  let component: ReporterListViewComponent;
  let fixture: ComponentFixture<ReporterListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporterListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
