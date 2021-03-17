import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeploymentViewerComponent } from './team-deployment-viewer.component';

describe('TeamDeploymentViewerComponent', () => {
  let component: TeamDeploymentViewerComponent;
  let fixture: ComponentFixture<TeamDeploymentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDeploymentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeploymentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
