import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGeneralInformationViewerComponent } from './hr-general-information-viewer.component';

describe('HrGeneralInformationViewerComponent', () => {
  let component: HrGeneralInformationViewerComponent;
  let fixture: ComponentFixture<HrGeneralInformationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGeneralInformationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGeneralInformationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
