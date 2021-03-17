import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeValueEditorComponent } from './range-value-editor.component';

describe('RangeValueEditorComponent', () => {
  let component: RangeValueEditorComponent;
  let fixture: ComponentFixture<RangeValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
