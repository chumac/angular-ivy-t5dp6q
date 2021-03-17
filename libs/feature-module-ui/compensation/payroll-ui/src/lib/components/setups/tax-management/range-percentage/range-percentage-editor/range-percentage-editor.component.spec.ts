import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangePercentageEditorComponent } from './range-percentage-editor.component';

describe('RangePercentageEditorComponent', () => {
  let component: RangePercentageEditorComponent;
  let fixture: ComponentFixture<RangePercentageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangePercentageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangePercentageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
