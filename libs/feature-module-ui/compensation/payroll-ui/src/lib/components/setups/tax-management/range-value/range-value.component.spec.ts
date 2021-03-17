import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeValueComponent } from './range-value.component';

describe('RangeValueComponent', () => {
  let component: RangeValueComponent;
  let fixture: ComponentFixture<RangeValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
