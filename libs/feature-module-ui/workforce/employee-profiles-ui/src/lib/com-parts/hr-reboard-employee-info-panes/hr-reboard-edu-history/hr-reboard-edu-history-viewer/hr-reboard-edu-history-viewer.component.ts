
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-edu-history-viewer',
  templateUrl: './hr-reboard-edu-history-viewer.component.html',
  styleUrls: ['./hr-reboard-edu-history-viewer.component.scss']
})
export class HrReboardEduHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IEducation;
  @Input() public dataDoc: any;

  @Output() public cancelClick: EventEmitter<any> = new EventEmitter();

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
