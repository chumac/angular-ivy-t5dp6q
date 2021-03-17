import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { HideApprovalPathViewer, getWorkflowApprovalPath } from '../../../store/approval';
import { IWorkflowApprovalPath } from '@nutela/models/foundation';

@Component({
  selector: 'x365-fm-approvals-approval-path-viewer',
  templateUrl: './approval-path-viewer.component.html',
  styleUrls: ['./approval-path-viewer.component.scss']
})
export class ApprovalPathViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;

  @Output() cancelClick = new EventEmitter<any>();

  // isProcessing$: Observable<boolean>;

  workflowApprovalPath$: Observable<IWorkflowApprovalPath[]>;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeSelects();

    // this.isProcessing$ = this.store.pipe(select(isProcessingApplication))
    // this.store.dispatch(new ProcessingApplication());
  }

  storeSelects() {
    this.workflowApprovalPath$ = this.store.pipe(select(getWorkflowApprovalPath));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
