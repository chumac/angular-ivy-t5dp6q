import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionsEditorComponent } from './religions-editor.component';

describe('ReligionsEditorComponent', () => {
  let component: ReligionsEditorComponent;
  let fixture: ComponentFixture<ReligionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
