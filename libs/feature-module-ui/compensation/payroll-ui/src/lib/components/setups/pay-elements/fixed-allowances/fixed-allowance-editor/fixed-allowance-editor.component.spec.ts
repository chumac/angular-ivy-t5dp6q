import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAllowanceEditorComponent } from './fixed-allowance-editor.component';

describe('FixedAllowanceEditorComponent', () => {
  let component: FixedAllowanceEditorComponent;
  let fixture: ComponentFixture<FixedAllowanceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAllowanceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAllowanceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
