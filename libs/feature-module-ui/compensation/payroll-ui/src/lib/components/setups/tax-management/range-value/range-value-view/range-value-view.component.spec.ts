import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeValueViewComponent } from './range-value-view.component';

describe('RangeValueViewComponent', () => {
  let component: RangeValueViewComponent;
  let fixture: ComponentFixture<RangeValueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeValueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeValueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
