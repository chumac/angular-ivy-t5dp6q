import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'x365-fm-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  linechart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3],
        type: undefined
      }]

  });

  constructor() { }

  ngOnInit() {
  }

}
