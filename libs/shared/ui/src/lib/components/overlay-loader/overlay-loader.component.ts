import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-overlay-loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.scss']
})
export class OverlayLoaderComponent implements OnInit {
  @Input() show: boolean;

  constructor() {}

  ngOnInit() {}
}
