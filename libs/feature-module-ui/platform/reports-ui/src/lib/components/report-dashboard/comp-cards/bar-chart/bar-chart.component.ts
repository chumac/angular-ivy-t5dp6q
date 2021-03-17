import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'x365-fm-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  barchart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'barchart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'BarLine 1',
        data: [1, 2, 3],
        type: undefined
      }]

  });

  constructor() { }

  ngOnInit() {
  }

}
