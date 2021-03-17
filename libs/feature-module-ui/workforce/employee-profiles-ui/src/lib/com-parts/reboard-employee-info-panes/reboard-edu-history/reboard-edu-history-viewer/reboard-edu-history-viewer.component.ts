
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';

@Component({
  selector: 'x365-fm-workforce-reboard-edu-history-viewer',
  templateUrl: './reboard-edu-history-viewer.component.html',
  styleUrls: ['./reboard-edu-history-viewer.component.scss']
})
export class ReboardEduHistoryViewerComponent implements OnInit {
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
