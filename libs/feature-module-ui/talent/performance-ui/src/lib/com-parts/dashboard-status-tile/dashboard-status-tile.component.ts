import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-dashboard-status-tile',
  templateUrl: './dashboard-status-tile.component.html',
  styleUrls: ['./dashboard-status-tile.component.scss']
})
export class DashboardStatusTileComponent implements OnInit {
  @Input() title: string;
  @Input() status: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() isLoading: string;

  constructor() {}

  ngOnInit() {}
}
