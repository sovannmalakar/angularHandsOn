import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportersContainerComponent } from './search-reporters-container.component';

describe('SearchReportersContainerComponent', () => {
  let component: SearchReportersContainerComponent;
  let fixture: ComponentFixture<SearchReportersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReportersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReportersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
