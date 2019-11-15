import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobsContainerComponent } from './search-jobs-container.component';

describe('SearchJobsContainerComponent', () => {
  let component: SearchJobsContainerComponent;
  let fixture: ComponentFixture<SearchJobsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
