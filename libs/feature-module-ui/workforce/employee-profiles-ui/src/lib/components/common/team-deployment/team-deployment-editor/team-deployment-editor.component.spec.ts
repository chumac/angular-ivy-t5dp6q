import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeploymentEditorComponent } from './team-deployment-editor.component';

describe('TeamDeploymentEditorComponent', () => {
  let component: TeamDeploymentEditorComponent;
  let fixture: ComponentFixture<TeamDeploymentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDeploymentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeploymentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
