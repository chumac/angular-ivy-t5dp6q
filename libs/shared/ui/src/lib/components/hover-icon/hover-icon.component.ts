import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-hover-icon',
  templateUrl: './hover-icon.component.html',
  styleUrls: ['./hover-icon.component.scss']
})
export class HoverIconComponent implements OnInit {
  @Input() iconClass: string;

  constructor() {}

  ngOnInit() {}
}
