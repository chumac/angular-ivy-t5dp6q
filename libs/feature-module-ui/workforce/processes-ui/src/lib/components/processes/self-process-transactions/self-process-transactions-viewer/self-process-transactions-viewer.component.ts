import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';
import { HideViewerSelfProcessTransaction } from '../../../../store/processes/self-process-transaction';


@Component({
  selector: 'x365-fm-workforce-self-process-transactions-viewer',
  templateUrl: './self-process-transactions-viewer.component.html',
  styleUrls: ['./self-process-transactions-viewer.component.scss']
})
export class SelfProcessTransactionsViewerComponent implements OnInit {

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
    this.store.dispatch(new HideViewerSelfProcessTransaction());
  }
  
}
