import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ITimeSheetData, IDayStreamData } from '@nutela/models/workforce/time-sheet';
import { getTimeSheetDayStreamData, isLoadingDayStreamData, LoadDayStreamDataTimeSheet } from '../../../store/time-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import * as constants from '../../../constants'


@Component({
  selector: 'x365-fm-workforce-time-time-sheets-editor',
  templateUrl: './time-sheets-editor.component.html',
  styleUrls: ['./time-sheets-editor.component.scss']
})
export class TimeSheetsEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ITimeSheetData;

  @Output() cancelClick = new EventEmitter<any>();

  timeSheetStreamId: number;
  timeSheetDayStreamData$: Observable<IDayStreamData[]>;
  isLoadingDayStreamData$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.timeSheetStreamId = params['id']);
    this.store.dispatch(new LoadDayStreamDataTimeSheet(this.timeSheetStreamId));
    this.storeSelects();
  }

  storeSelects() {
    this.isLoadingDayStreamData$ = this.store.pipe(select(isLoadingDayStreamData));
    this.timeSheetDayStreamData$ = this.store.pipe(select(getTimeSheetDayStreamData));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.cancelClick.emit();
  }

  goBack() {
    this.router.navigate([constants.TIME_SHEET_DATA_URLs.LoadTimeSheet], { skipLocationChange: false });
  }

  ngOnDestroy() {}
}
