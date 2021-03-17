import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { TimeAttendancesEditorService } from './time-attendances-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { isProcessingTimeAttendance, ProcessingTimeAttendance, SaveTimeAttendance, AddTimeAttendance, NotProcessingTimeAttendance, getTimeAttendanceDataStatusList, LoadTimeAttendanceStatusList } from '../../../store/time-attendance';
import { IAppState } from '@nutela/store/app-state';
import { ITimeAttendance, ITimeAttendanceStatus } from '@nutela/models/workforce/leave';


@Component({
  selector: 'x365-fm-workforce-time-attendances-editor',
  templateUrl: './time-attendances-editor.component.html',
  styleUrls: ['./time-attendances-editor.component.scss'],
  providers: [TimeAttendancesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class TimeAttendancesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITimeAttendance;
  @Input() public employeeId: number;
  @Input() public selectedYear: number;
  @Input() public selectedMonth: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  attendanceStatusList$: Observable<ITimeAttendanceStatus[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: TimeAttendancesEditorService, private store: Store<IAppState>) { 
    super();
  }

  ngOnInit() {
    this.store.dispatch(new LoadTimeAttendanceStatusList());
    this.isProcessing$ = this.store.pipe(select(isProcessingTimeAttendance));
    this.attendanceStatusList$ = this.store.pipe(select(getTimeAttendanceDataStatusList));
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
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingTimeAttendance());
        this.store.dispatch(new SaveTimeAttendance({data: <ITimeAttendance>this.fs.value, recordId: recordId, editMode: this.inEditMode(), employeeId: this.employeeId, year: this.selectedYear, month: this.selectedMonth}));
      } else {
        this.store.dispatch(new ProcessingTimeAttendance());
        this.store.dispatch(new AddTimeAttendance({data: <ITimeAttendance>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
