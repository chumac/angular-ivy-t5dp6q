import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeploymentComponent } from './team-deployment.component';

describe('TeamDeploymentComponent', () => {
  let component: TeamDeploymentComponent;
  let fixture: ComponentFixture<TeamDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
