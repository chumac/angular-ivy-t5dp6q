import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityEditorComponent } from './nationality-editor.component';

describe('NationalityEditorComponent', () => {
  let component: NationalityEditorComponent;
  let fixture: ComponentFixture<NationalityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
