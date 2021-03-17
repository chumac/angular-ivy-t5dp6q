
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IAppState } from '@nutela/store/app-state';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { getViewerLabelValue } from '../../../store/approval';

@Component({
  selector: 'x365-fm-approvals-approval-viewer',
  templateUrl: './approval-viewer.component.html',
  styleUrls: ['./approval-viewer.component.scss']
})
export class ApprovalViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IWorkflowMessage;

  @Output() cancelClick = new EventEmitter<any>();

  labelValueMessages$: Observable<ISelectOption[]>;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.labelValueMessages$ = this.store.pipe(select(getViewerLabelValue));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
