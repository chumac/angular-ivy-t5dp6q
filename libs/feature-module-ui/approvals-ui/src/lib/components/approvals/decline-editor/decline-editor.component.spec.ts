import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineEditorComponent } from './decline-editor.component';

describe('DeclineEditorComponent', () => {
  let component: DeclineEditorComponent;
  let fixture: ComponentFixture<DeclineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
