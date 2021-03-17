import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyEditorComponent } from './apply-editor.component';

describe('ApplyEditorComponent', () => {
  let component: ApplyEditorComponent;
  let fixture: ComponentFixture<ApplyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
