import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';
import { HideViewerReviewerProcessTransaction } from '../../../../store/processes/reviewer-process-transaction';


@Component({
  selector: 'x365-fm-workforce-reviewer-process-transactions-viewer',
  templateUrl: './reviewer-process-transactions-viewer.component.html',
  styleUrls: ['./reviewer-process-transactions-viewer.component.scss']
})
export class ReviewerProcessTransactionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProcessTransactionMaster;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerReviewerProcessTransaction());
  }
  
}
