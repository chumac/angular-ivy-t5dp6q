import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsEditorComponent } from './sections-editor.component';

describe('SectionsEditorComponent', () => {
  let component: SectionsEditorComponent;
  let fixture: ComponentFixture<SectionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
