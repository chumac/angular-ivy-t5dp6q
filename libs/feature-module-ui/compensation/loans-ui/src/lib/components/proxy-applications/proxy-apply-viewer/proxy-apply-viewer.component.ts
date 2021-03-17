
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApprovedLoan } from '@nutela/models/compensation/loans';
import { UtilService } from '@nutela/core-services';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-proxy-apply-viewer',
  templateUrl: './proxy-apply-viewer.component.html',
  styleUrls: ['./proxy-apply-viewer.component.scss']
})
export class ProxyApplyViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public isAwaiting: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IApprovedLoan;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
