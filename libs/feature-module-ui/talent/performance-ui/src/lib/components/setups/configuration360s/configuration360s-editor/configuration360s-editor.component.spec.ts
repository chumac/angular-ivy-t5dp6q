import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configuration360sEditorComponent } from './configuration360s-editor.component';

describe('Configuration360sEditorComponent', () => {
  let component: Configuration360sEditorComponent;
  let fixture: ComponentFixture<Configuration360sEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configuration360sEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configuration360sEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
