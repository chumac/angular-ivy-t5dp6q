import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageGrossEditorComponent } from './percentage-gross-editor.component';

describe('PercentageGrossEditorComponent', () => {
  let component: PercentageGrossEditorComponent;
  let fixture: ComponentFixture<PercentageGrossEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageGrossEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageGrossEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
