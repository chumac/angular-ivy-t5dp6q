import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTeamEditorComponent } from './hr-team-editor.component';

describe('HrTeamEditorComponent', () => {
  let component: HrTeamEditorComponent;
  let fixture: ComponentFixture<HrTeamEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTeamEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTeamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
