import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationEditorComponent } from './separation-editor.component';

describe('SeparationEditorComponent', () => {
  let component: SeparationEditorComponent;
  let fixture: ComponentFixture<SeparationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
