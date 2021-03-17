import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReInstateEditorComponent } from './re-instate-editor.component';

describe('ReInstateEditorComponent', () => {
  let component: ReInstateEditorComponent;
  let fixture: ComponentFixture<ReInstateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReInstateEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReInstateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
