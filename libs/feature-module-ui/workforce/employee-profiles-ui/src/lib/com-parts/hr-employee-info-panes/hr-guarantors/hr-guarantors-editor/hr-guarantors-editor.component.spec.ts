import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGuarantorsEditorComponent } from './hr-guarantors-editor.component';

describe('HrGuarantorsEditorComponent', () => {
  let component: HrGuarantorsEditorComponent;
  let fixture: ComponentFixture<HrGuarantorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGuarantorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGuarantorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
