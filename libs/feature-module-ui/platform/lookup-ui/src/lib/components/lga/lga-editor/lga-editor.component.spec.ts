import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaEditorComponent } from './lga-editor.component';

describe('LgaEditorComponent', () => {
  let component: LgaEditorComponent;
  let fixture: ComponentFixture<LgaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
