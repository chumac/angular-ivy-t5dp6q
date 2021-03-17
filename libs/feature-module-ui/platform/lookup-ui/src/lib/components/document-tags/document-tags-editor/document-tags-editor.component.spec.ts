import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTagsEditorComponent } from './document-tags-editor.component';

describe('DocumentTagsEditorComponent', () => {
  let component: DocumentTagsEditorComponent;
  let fixture: ComponentFixture<DocumentTagsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTagsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTagsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
