import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectEditorComponent } from './redirect-editor.component';

describe('RedirectEditorComponent', () => {
  let component: RedirectEditorComponent;
  let fixture: ComponentFixture<RedirectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
