import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGeneralInformationComponent } from './hr-general-information.component';

describe('HrGeneralInformationComponent', () => {
  let component: HrGeneralInformationComponent;
  let fixture: ComponentFixture<HrGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
