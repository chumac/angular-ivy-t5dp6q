import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDeductionComponent } from './fix-deduction.component';

describe('FixedDeductionComponent', () => {
  let component: FixedDeductionComponent;
  let fixture: ComponentFixture<FixedDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
