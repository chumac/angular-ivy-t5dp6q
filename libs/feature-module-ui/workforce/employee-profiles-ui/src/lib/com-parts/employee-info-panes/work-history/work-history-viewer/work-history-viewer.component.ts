
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerWorkHistory, ClearDocumentWorkHistory } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-work-history-viewer',
  templateUrl: './work-history-viewer.component.html',
  styleUrls: ['./work-history-viewer.component.scss']
})
export class WorkHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPreviousEmployer;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentWorkHistory());
    this.store.dispatch(new HideViewerWorkHistory());
  }
}
