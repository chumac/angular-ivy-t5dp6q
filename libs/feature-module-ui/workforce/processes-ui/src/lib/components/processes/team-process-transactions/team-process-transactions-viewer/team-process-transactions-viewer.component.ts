import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { IProcessTransactionMaster } from '@nutela/models/workforce/employee-profiles';
import { HideViewerTeamProcessTransaction } from '../../../../store/processes/team-process-transaction';


@Component({
  selector: 'x365-fm-workforce-team-process-transactions-viewer',
  templateUrl: './team-process-transactions-viewer.component.html',
  styleUrls: ['./team-process-transactions-viewer.component.scss']
})
export class TeamProcessTransactionsViewerComponent implements OnInit {

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
    this.store.dispatch(new HideViewerTeamProcessTransaction());
  }
  
}
