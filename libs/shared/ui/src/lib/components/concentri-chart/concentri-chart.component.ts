import { Component, OnInit, Input } from '@angular/core';
import { IConcentriaData } from '@nutela/shared/ui';

@Component({
  selector: 'x365-shared-ui-concentri-chart',
  templateUrl: './concentri-chart.component.html',
  styleUrls: ['./concentri-chart.component.scss']
})
export class ConcentriChartComponent implements OnInit {
  @Input() public data: IConcentriaData = null;

  constructor() { }

  ngOnInit() {
  }

}
