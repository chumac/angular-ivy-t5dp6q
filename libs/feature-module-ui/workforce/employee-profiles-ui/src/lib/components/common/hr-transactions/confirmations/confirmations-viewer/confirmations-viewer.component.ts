import { Component, OnInit, Input } from '@angular/core';
 
import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerConfirmation } from '../../../../../store/hr-transactions/confirmation';


@Component({
  selector: 'x365-fm-workforce-confirmations-viewer',
  templateUrl: './confirmations-viewer.component.html',
  styleUrls: ['./confirmations-viewer.component.scss']
})
export class ConfirmationsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IConfirmationTransaction;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerConfirmation());
  }
  
}
