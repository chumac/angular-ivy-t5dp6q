
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IScheduleDetail } from '@nutela/models/compensation/payment';
import { IRootState } from '../../../store';

@Component({
  selector: 'x365-fm-cmp-payment-schedule-detail-viewer',
  templateUrl: './schedule-detail-viewer.component.html',
  styleUrls: ['./schedule-detail-viewer.component.scss']
})
export class ScheduleDetailViewerComponent implements OnInit {

  currencyCode: string = 'NGN';
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: IScheduleDetail;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IRootState>) { }

  ngOnInit() { }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
