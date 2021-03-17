import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBeneficiariesComponent } from './hr-beneficiaries.component';

describe('HrBeneficiariesComponent', () => {
  let component: HrBeneficiariesComponent;
  let fixture: ComponentFixture<HrBeneficiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrBeneficiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
