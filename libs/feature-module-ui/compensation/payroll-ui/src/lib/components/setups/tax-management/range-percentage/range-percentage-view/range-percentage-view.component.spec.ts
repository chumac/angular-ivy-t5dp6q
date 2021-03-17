import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangePercentageViewComponent } from './range-percentage-view.component';

describe('RangePercentageViewComponent', () => {
  let component: RangePercentageViewComponent;
  let fixture: ComponentFixture<RangePercentageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangePercentageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangePercentageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
