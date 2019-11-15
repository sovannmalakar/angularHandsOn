import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterTableViewComponent } from './reporter-table-view.component';

describe('ReporterTableViewComponent', () => {
  let component: ReporterTableViewComponent;
  let fixture: ComponentFixture<ReporterTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporterTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
