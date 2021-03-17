import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWeightsEditorComponent } from './roleWeights-editor.component';

describe('RoleWeightsEditorComponent', () => {
  let component: RoleWeightsEditorComponent;
  let fixture: ComponentFixture<RoleWeightsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleWeightsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleWeightsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
