import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecosystem360sEditorComponent } from './ecosystem360s-editor.component';

describe('Ecosystem360sEditorComponent', () => {
  let component: Ecosystem360sEditorComponent;
  let fixture: ComponentFixture<Ecosystem360sEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ecosystem360sEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecosystem360sEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
