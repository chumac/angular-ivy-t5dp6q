import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLimitEditorComponent } from './leave-limit-editor.component';

describe('LeaveLimitEditorComponent', () => {
  let component: LeaveLimitEditorComponent;
  let fixture: ComponentFixture<LeaveLimitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveLimitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveLimitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
