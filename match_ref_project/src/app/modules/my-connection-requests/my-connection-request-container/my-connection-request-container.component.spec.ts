import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionRequestContainerComponent } from './my-connection-request-container.component';

describe('MyConnectionRequestContainerComponent', () => {
  let component: MyConnectionRequestContainerComponent;
  let fixture: ComponentFixture<MyConnectionRequestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionRequestContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
