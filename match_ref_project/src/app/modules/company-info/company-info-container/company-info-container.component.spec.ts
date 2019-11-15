import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoContainerComponent } from './company-info-container.component';

describe('CompanyInfoContainerComponent', () => {
  let component: CompanyInfoContainerComponent;
  let fixture: ComponentFixture<CompanyInfoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInfoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
