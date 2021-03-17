
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerEducation, ClearDocumentEducation } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-educational-history-viewer',
  templateUrl: './educational-history-viewer.component.html',
  styleUrls: ['./educational-history-viewer.component.scss']
})
export class EducationalHistoryViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IEducation;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentEducation());
    this.store.dispatch(new HideViewerEducation());
  }
}
