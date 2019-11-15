import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionRequestsComponent } from './my-connection-requests.component';

describe('MyConnectionRequestsComponent', () => {
  let component: MyConnectionRequestsComponent;
  let fixture: ComponentFixture<MyConnectionRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
