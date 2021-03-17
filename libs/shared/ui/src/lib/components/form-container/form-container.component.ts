import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public pWidth: string;
  @Input() public nWidth: string;

  constructor() { }

  ngOnInit() {
  }

}
