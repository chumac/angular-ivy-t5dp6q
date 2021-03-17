import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTeamViewerComponent } from './hr-team-viewer.component';

describe('HrTeamViewerComponent', () => {
  let component: HrTeamViewerComponent;
  let fixture: ComponentFixture<HrTeamViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTeamViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTeamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
