import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrConfirmationInformationViewerComponent } from './hr-confirmation-information-viewer.component';

describe('HrConfirmationInformationViewerComponent', () => {
  let component: HrConfirmationInformationViewerComponent;
  let fixture: ComponentFixture<HrConfirmationInformationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrConfirmationInformationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrConfirmationInformationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
