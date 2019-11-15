import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTemplateCmpComponent } from './block-template-cmp.component';

describe('BlockTemplateCmpComponent', () => {
  let component: BlockTemplateCmpComponent;
  let fixture: ComponentFixture<BlockTemplateCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTemplateCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTemplateCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
