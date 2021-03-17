
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { HideViewerStandardSchedule, isProcessingApplication, ProcessingApplication } from '../../store/applications';
import { ILoanSchedule } from '@nutela/models/compensation/loans';
import { Observable } from 'rxjs';
import { HideViewerStandardScheduleProxy } from '../../store/proxy-applications';
import { ILoanState } from '../../store';


@Component({
  selector: 'x365-fm-loans-standard-schedule-viewer',
  templateUrl: './standard-schedule-viewer.component.html',
  styleUrls: ['./standard-schedule-viewer.component.scss']
})
export class StandardScheduleViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;
  @Input() public loansSchedulesList: ILoanSchedule[];
  @Input() public dataDoc: any;

  isProcessing$: Observable<boolean>;

  constructor(public utilService: UtilService, private store: Store<ILoanState>) {}

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingApplication))
    this.store.dispatch(new ProcessingApplication());
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerStandardSchedule());
    this.store.dispatch(new HideViewerStandardScheduleProxy());
    this.loansSchedulesList = [];
  }
}
