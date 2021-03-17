import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangePercentageComponent } from './range-percentage.component';

describe('RangePercentageComponent', () => {
  let component: RangePercentageComponent;
  let fixture: ComponentFixture<RangePercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangePercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
