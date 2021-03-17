import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalAwardsEditorComponent } from './profesional-awards-editor.component';

describe('ProfesionalAwardsEditorComponent', () => {
  let component: ProfesionalAwardsEditorComponent;
  let fixture: ComponentFixture<ProfesionalAwardsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionalAwardsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalAwardsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
