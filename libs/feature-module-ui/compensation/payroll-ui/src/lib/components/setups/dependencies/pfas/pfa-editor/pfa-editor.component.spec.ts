import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaEditorComponent } from './pfa-editor.component';

describe('PfaEditorComponent', () => {
  let component: PfaEditorComponent;
  let fixture: ComponentFixture<PfaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
