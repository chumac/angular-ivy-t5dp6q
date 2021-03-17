import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDeductionsComponent } from './fixed-deductions.component';

describe('FixedDeductionsComponent', () => {
  let component: FixedDeductionsComponent;
  let fixture: ComponentFixture<FixedDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
