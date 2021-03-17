import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss']
})
export class BeaconComponent implements OnInit {
  @Input() speed: number;

  constructor() {}

  ngOnInit() {}
}
