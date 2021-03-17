
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { IDisbursed } from '@nutela/models/compensation/loans';
import { UtilService } from '@nutela/core-services';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-disbursement-viewer',
  templateUrl: './disbursement-viewer.component.html',
  styleUrls: ['./disbursement-viewer.component.scss']
})
export class DisbursementViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IDisbursed;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
