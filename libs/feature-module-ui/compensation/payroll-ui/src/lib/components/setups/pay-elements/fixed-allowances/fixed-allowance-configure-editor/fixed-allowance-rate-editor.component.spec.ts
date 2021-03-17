import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAllowanceRateEditorComponent } from './fixed-allowance-rate-editor.component';

describe('FixedAllowanceRateEditorComponent', () => {
  let component: FixedAllowanceRateEditorComponent;
  let fixture: ComponentFixture<FixedAllowanceRateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAllowanceRateEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAllowanceRateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
