import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsEditorComponent } from './qualifications-editor.component';

describe('QualificationsEditorComponent', () => {
  let component: QualificationsEditorComponent;
  let fixture: ComponentFixture<QualificationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
