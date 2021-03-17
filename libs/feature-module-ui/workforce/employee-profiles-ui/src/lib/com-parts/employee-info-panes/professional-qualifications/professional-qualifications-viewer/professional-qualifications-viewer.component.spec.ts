import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalQualificationsViewerComponent } from './professional-qualifications-viewer.component';

describe('ProfessionalQualificationsViewerComponent', () => {
  let component: ProfessionalQualificationsViewerComponent;
  let fixture: ComponentFixture<ProfessionalQualificationsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalQualificationsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalQualificationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
