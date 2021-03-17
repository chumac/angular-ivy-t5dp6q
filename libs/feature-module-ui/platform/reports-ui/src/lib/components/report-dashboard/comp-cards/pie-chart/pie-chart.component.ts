import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'x365-fm-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  piechart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'piechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'PieLine 1',
        data: [1, 2, 3],
        type: undefined
      }]

  });

  constructor() { }

  ngOnInit() {
  }

}
