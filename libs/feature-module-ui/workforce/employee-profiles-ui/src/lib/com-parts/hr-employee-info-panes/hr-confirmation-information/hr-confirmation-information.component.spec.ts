import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrConfirmationInformationComponent } from './hr-confirmation-information.component';

describe('HrConfirmationInformationComponent', () => {
  let component: HrConfirmationInformationComponent;
  let fixture: ComponentFixture<HrConfirmationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrConfirmationInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrConfirmationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
