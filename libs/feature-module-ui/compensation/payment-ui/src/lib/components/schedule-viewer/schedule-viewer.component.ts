
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ISchedule } from '@nutela/models/compensation/payment';
import { IRootState } from '../../store';

@Component({
  selector: 'x365-fm-cmp-payment-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss']
})
export class ScheduleViewerComponent implements OnInit {
  currencyCode: string = 'NGN';
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: ISchedule;
  @Input() public isSubmitted: boolean = false;
  @Input() public hasPayrollProfile: boolean = false;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IRootState>) { }

  ngOnInit() { }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
