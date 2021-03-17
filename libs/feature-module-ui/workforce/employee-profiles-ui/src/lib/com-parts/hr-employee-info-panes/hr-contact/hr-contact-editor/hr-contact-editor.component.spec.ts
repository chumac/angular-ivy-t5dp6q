import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrContactEditorComponent } from './hr-contact-editor.component';

describe('HrContactEditorComponent', () => {
  let component: HrContactEditorComponent;
  let fixture: ComponentFixture<HrContactEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrContactEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
