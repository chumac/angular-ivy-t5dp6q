import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentraChartComponent } from './concentra-chart.component';

describe('ConcentraChartComponent', () => {
  let component: ConcentraChartComponent;
  let fixture: ComponentFixture<ConcentraChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentraChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentraChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
