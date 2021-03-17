import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../../store/root';
import { ITransferTransaction } from '@nutela/models/workforce/employee-profiles';
import { HideViewerTransfer } from '../../../../../store/hr-transactions/transfer';

@Component({
  selector: 'x365-fm-workforce-transfer-viewer',
  templateUrl: './transfer-viewer.component.html',
  styleUrls: ['./transfer-viewer.component.scss']
})
export class TransferViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ITransferTransaction;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerTransfer());
  }
}
