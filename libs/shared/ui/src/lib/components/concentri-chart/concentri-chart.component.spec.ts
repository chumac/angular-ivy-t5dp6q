import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentriChartComponent } from './concentri-chart.component';

describe('ConcentriChartComponent', () => {
  let component: ConcentriChartComponent;
  let fixture: ComponentFixture<ConcentriChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentriChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentriChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
