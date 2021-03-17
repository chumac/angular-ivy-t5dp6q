import { Component, OnInit, Input } from '@angular/core';
import { IConcentriaData } from '@nutela/shared/ui';

@Component({
  selector: 'x365-shared-ui-concentra-chart',
  templateUrl: './concentra-chart.component.html',
  styleUrls: ['./concentra-chart.component.scss']
})
export class ConcentraChartComponent implements OnInit {
  @Input() public data: IConcentriaData = null;

  constructor() { }

  ngOnInit() {
  }

}
