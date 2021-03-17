import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

const DEFAULT_WIDTH = '550';
const DEFAULT_HEIGHT = '350';
const DEFAULT_VISIBILITY = true;
const DEFAULT_SHOW_TITLE = true;
const DEFAULT_OUTSIDE_CLICK_STATUS = true;


export enum AgreementCommandTypes {
  AGREE = 'AGREE',
  DECLINE = 'DECLINE'
}

@Component({
  selector: 'x365-shared-ui-agreement-modal',
  templateUrl: './agreement-modal.component.html',
  styleUrls: ['./agreement-modal.component.scss']
})
export class AgreementModalComponent implements OnInit {
  @Input() public width = DEFAULT_WIDTH;
  @Input() public height = DEFAULT_HEIGHT;
  @Input() public visible = DEFAULT_VISIBILITY;
  @Input() public showTitle = DEFAULT_SHOW_TITLE;
  @Input() public clickOutsideToClose = DEFAULT_OUTSIDE_CLICK_STATUS;
  @Input() public textContent: string;

  @Output() public buttonClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

}
