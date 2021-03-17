import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryLoadObjectivesEditorComponent } from './library-load-objectives-editor.component';

describe('LibraryLoadObjectivesEditorComponent', () => {
  let component: LibraryLoadObjectivesEditorComponent;
  let fixture: ComponentFixture<LibraryLoadObjectivesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryLoadObjectivesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryLoadObjectivesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
