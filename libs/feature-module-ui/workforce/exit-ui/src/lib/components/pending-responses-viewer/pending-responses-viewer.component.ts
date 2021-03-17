import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-exit-pending-responses-viewer',
  templateUrl: './pending-responses-viewer.component.html',
  styleUrls: ['./pending-responses-viewer.component.scss']
})
export class PendingResponsesViewerComponent implements OnInit {
  @Input() public data: any[];
  @Input() public show: boolean;
  @Input() public width: number;

  @Output() doneClick = new EventEmitter<any>();

  constructor( public utilService: UtilService  ) { }

  ngOnInit() {  }

  onDoneClicked() {
    this.doneClick.emit();
  }
}
