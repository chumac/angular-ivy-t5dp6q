import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfessionalQualificationViewerComponent } from './hr-professional-qualification-viewer.component';

describe('HrProfessionalQualificationViewerComponent', () => {
  let component: HrProfessionalQualificationViewerComponent;
  let fixture: ComponentFixture<HrProfessionalQualificationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfessionalQualificationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfessionalQualificationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
