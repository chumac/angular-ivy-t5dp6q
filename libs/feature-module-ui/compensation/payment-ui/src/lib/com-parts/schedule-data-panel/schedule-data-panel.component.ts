import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { ISchedule } from '@nutela/models/compensation/payment';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IRootState } from '../../store';
import { isUploadingScheduleDetail, UploadingScheduleDetail, LoadingDataScheduleDetail } from '../../store/schedule-details';

@Component({
  selector: 'x365-fm-cmp-payment-schedule-data-panel',
  templateUrl: './schedule-data-panel.component.html',
  styleUrls: ['./schedule-data-panel.component.scss']
})
export class ScheduleDataPanelComponent implements OnInit {

  isProcessingUpload$: Observable<boolean>;
  currencyCode: string = 'NGN';
  @Input() public data: ISchedule = null;

  @Input() public isProcessingScheduleDetail: boolean;

  @Output() valueChange = new EventEmitter();
  @Output() processClick = new EventEmitter();


  constructor(public utilService: UtilService, private store: Store<IRootState>) { }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessingUpload$ = this.store.pipe(select(isUploadingScheduleDetail))
  }
  onFileChange(e) {
    this.store.dispatch(new UploadingScheduleDetail());
    this.store.dispatch(new LoadingDataScheduleDetail());
    this.valueChange.emit(e);
  }

  onProcess() {
    if (this.data) {
      this.store.dispatch(new UploadingScheduleDetail());
      this.processClick.emit(this.data.id);
    }
  }
}
