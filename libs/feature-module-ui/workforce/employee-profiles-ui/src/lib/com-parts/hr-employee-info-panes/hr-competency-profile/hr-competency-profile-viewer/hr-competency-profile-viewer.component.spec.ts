import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCompetencyProfileViewerComponent } from './hr-competency-profile-viewer.component';

describe('HrCompetencyProfileViewerComponent', () => {
  let component: HrCompetencyProfileViewerComponent;
  let fixture: ComponentFixture<HrCompetencyProfileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCompetencyProfileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCompetencyProfileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
