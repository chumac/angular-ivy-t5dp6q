
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { UtilService } from '@nutela/core-services';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-close-viewer',
  templateUrl: './close-viewer.component.html',
  styleUrls: ['./close-viewer.component.scss']
})
export class CloseViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IApprovedLoan;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
