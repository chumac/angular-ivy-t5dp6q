
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { UtilService } from '@nutela/core-services';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-repayment-viewer',
  templateUrl: './repayment-viewer.component.html',
  styleUrls: ['./repayment-viewer.component.scss']
})
export class RepaymentViewerComponent implements OnInit {


  @Input() public show: boolean;
  @Input() public isAwaiting: boolean;
  @Input() public hideValues: boolean;
  @Input() public width: number;
  @Input() public data: IApprovedLoan;
  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
