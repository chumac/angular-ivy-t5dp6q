import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { HrReboardIdentificationEditorService } from './hr-reboard-identification-editor.service';
import { IAppState } from '@nutela/store/app-state';
import DataSource from 'devextreme/data/data_source';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ImagePickerComponent, DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { ISelectOption } from '@nutela/models/core-data';
import { getHrReboardPositions, getHrReboardPaygrade, getHrReboardPayGroup, isProcessingHrReboardIdentification, ProcessingHrReboardIdentification, SaveHrReboardIdentification, NotProcessingHrReboardIdentification, isLoadingHrReboardIdentification, SaveUpdateHrReboardIdentification, LoadPositionDataHrReboardIdentification, LoadGradeDataHrReboardIdentification, getHrReboardReportTos, getHrReboardBackupOfficers, getHrReboardPaymentModes, getHrReboardJobTitles, getHrReboardActingJobTitles, LoadStaffListDataHrReboardIdentification, LoadPaymentModeDataHrReboardIdentification, LoadJobTitleDataHrReboardIdentification, LoadPaygroupDataHrReboardIdentification } from '../../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-identification-editor',
  templateUrl: './hr-reboard-identification-editor.component.html',
  styleUrls: ['./hr-reboard-identification-editor.component.scss'],
  providers: [HrReboardIdentificationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrReboardIdentificationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSourceReportsTo: any = null;
  activePersonnelDataSourceBackupOfficer: any = null;
  onPayroll: boolean;

  positionData$: Observable<ISelectOption[]>;
  titleData$: Observable<ISelectOption[]>;
  paygradeData$: Observable<ISelectOption[]>;
  paygroupsData$: Observable<ISelectOption[]>;
  reportTos$: Observable<ISelectOption[]>;
  backupOfficers$: Observable<ISelectOption[]>;
  paymentModes$: Observable<ISelectOption[]>;
  jobTitles$: Observable<ISelectOption[]>;
  actingJobTitles$: Observable<ISelectOption[]>;
  isLoading$: Observable<boolean>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;
  @Input() public activePersonnel: ISelectOption[];

  @Input() public data: IIdentification;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSourceReportsTo = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
      this.activePersonnelDataSourceBackupOfficer = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }
    if(changes['data']) {
      this.fs.init(this.data);
    }

    // if (this.show) {
    //   this.fs.patch({
    //     corporate_id_expires: this.data.emp_duration_to
    //   })
    // }
  }

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IIdentification>;

  constructor(
    public fs: HrReboardIdentificationEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

    this.performInit();
    this.cd.markForCheck();
  }

  storeSelects() {
    this.positionData$ = this.store.pipe(select(getHrReboardPositions));
    this.paygradeData$ = this.store.pipe(select(getHrReboardPaygrade))
    this.paygroupsData$ = this.store.pipe(select(getHrReboardPayGroup));
    this.reportTos$ = this.store.pipe(select(getHrReboardReportTos));
    this.backupOfficers$ = this.store.pipe(select(getHrReboardBackupOfficers));
    this.paymentModes$ = this.store.pipe(select(getHrReboardPaymentModes));
    this.jobTitles$ = this.store.pipe(select(getHrReboardJobTitles));
    this.actingJobTitles$ = this.store.pipe(select(getHrReboardActingJobTitles));
    this.isProcessing$ = this.store.pipe(select(isProcessingHrReboardIdentification));
    this.isLoading$ = this.store.pipe(select(isLoadingHrReboardIdentification));
  }
  storeDispatches() {
    this.store.dispatch(new LoadPositionDataHrReboardIdentification());
    this.store.dispatch(new LoadGradeDataHrReboardIdentification());
    this.store.dispatch(new LoadStaffListDataHrReboardIdentification());
    this.store.dispatch(new LoadPaymentModeDataHrReboardIdentification());
    this.store.dispatch(new LoadJobTitleDataHrReboardIdentification());
    this.store.dispatch(new LoadGradeDataHrReboardIdentification());
  }
  performInit() {}

  onImageSelected($event) {
    const data = $event;
    if (data) {
      this.fs.patch({
        image_signature: data.data,
        img_extension_signature: data.extension || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    }
  }

  onFileRemoved() {
    this.fs.patch({
      image_kin: null,
      img_extension_nextofkin: '',
      img_size: null
    });
  }

  onPaygradeSelected(event: any) {
    // this.store.dispatch(new ProcessingNewEmployee());
    this.fs.payGroup.setValue(null);
    this.store.dispatch(new LoadPaygroupDataHrReboardIdentification({ gradeId: event.itemData.value }))
  }

  isUserOnPayroll($event) {
    this.fs.userOnPayroll = $event.target.checked;
  }


  onSubmit() {

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingHrReboardIdentification());
      this.store.dispatch(new SaveUpdateHrReboardIdentification({data: <IIdentification>this.fs.value, employeeId: this.employeeId}));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingHrReboardIdentification());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.imagePicker.removeFile();
    this.fs.init(this.data);
  }

  isPermanentStaff(event) {
    this.fs.permanentStaff = event.target.checked;
    if (event.target.checked) {
      this.fs.endDate.setValidators([Validators.nullValidator]);
    };
    this.fs.endDate.updateValueAndValidity();
  }


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
