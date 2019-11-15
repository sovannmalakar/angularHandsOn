import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRepliesContainerComponent } from './job-replies-container.component';

describe('JobRepliesContainerComponent', () => {
  let component: JobRepliesContainerComponent;
  let fixture: ComponentFixture<JobRepliesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRepliesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRepliesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
