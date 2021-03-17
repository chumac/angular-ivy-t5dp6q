import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationCategoriesEditorComponent } from './qualification-categories-editor.component';

describe('QualificationCategoriesEditorComponent', () => {
  let component: QualificationCategoriesEditorComponent;
  let fixture: ComponentFixture<QualificationCategoriesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationCategoriesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationCategoriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
