
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-work-history-viewer',
  templateUrl: './hr-reboard-work-history-viewer.component.html',
  styleUrls: ['./hr-reboard-work-history-viewer.component.scss']
})
export class HrReboardWorkHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPreviousEmployer;
  @Input() public dataDoc: any;

  @Output() public cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
