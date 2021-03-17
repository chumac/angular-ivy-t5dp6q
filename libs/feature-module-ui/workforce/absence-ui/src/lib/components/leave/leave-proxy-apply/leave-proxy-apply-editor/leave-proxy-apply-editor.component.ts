import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LeaveProxyApplyEditorService } from './leave-proxy-apply-editor.service';
import { ISelectOptionData } from '@nutela/models/common';
import { FilePickerComponent } from '@nutela/shared/ui';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError, formatDate, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';

import { LoadStatesLeaveProxyApply, LoadCitiesLeaveProxyApply, getLeaveProxyApplyStateList, getLeaveProxyApplyCityList, showEditorLeaveProxyApply, showFullFormLeaveProxyApply, HideEditorLeaveProxyApply, HideFullFormLeaveProxyApply, ShowFullFormLeaveProxyApply, ProcessingLeaveProxyApply, LoadEntitlementLeaveProxyApply, getEntitlementLeaveProxyApply, NotProcessingLeaveProxyApply, SaveLeaveProxyApply, isProcessingLeaveProxyApply, isProcessingFormLeaveProxyApply, ProcessingFormLeaveProxyApply, NotProcessingFormLeaveProxyApply, LoadSubDetailLeaveProxyApply } from '../../../../store/leave-proxy-apply';
import { LeaveDailyLoadEntitlements } from '../../../../store/leave-daily';
import { IAbsenceState } from '../../../../store/root';
import { ILeaveDailyData, ILeaveEntitlement, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { ISelectOption, INationalitySelectOption, IStateSelectOption, IApiResult } from '@nutela/models/core-data';

import DataSource from 'devextreme/data/data_source';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { LoadLeaveTypes, leaveTypes, getCountries } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { map, take } from 'rxjs/operators';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

@Component({
  selector: 'x365-fm-workforce-absence-leave-proxy-apply-editor',
  templateUrl: './leave-proxy-apply-editor.component.html',
  styleUrls: ['./leave-proxy-apply-editor.component.scss'],
  providers: [LeaveProxyApplyEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveProxyApplyEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;

  leaveTypes$: Observable<ISelectOption[]>;
  leaveEntitlements$: Observable<ILeaveEntitlement[]>;
  leaveEntitlement$: Observable<ILeaveEntitlement>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;

  @Input() public data: ILeaveDailyData;
  @Input() public leaveTypes: ISelectOption[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public mode: LeaveDailyModes;
  @Input() public supportsAllowancePayment: boolean;

  @Input() public allowBackupOfficerSelectionForLeaveProxyApply: string;
  @Input() public allowSupervisorSelectionForLeaveProxyApply: string;

  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('employeeLookup') employeeLookup: DxLookupComponent;


  isProcessing$: Observable<boolean>;
  isProcessingForm$: Observable<boolean>;
  showFullForm$: Observable<boolean>;
  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;
  selectedEmployeeId: number;

  activePersonnelDataSource: any = null;

  constructor(
    public fs: LeaveProxyApplyEditorService,
    public utilService: UtilService,
    private externalLookupService: ExternalLookupService,
    public apiService: ApiService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.subscriptions();
  }

  storeDispatches() {
    this.store.dispatch(new LeaveDailyLoadEntitlements());
    this.store.dispatch(new LoadLeaveTypes());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveProxyApply));
    this.isProcessingForm$ = this.store.pipe(select(isProcessingFormLeaveProxyApply));
    this.showFullForm$ = this.store.pipe(select(showFullFormLeaveProxyApply));
    this.countries$ = this.store.pipe(select(getCountries));

    this.leaveEntitlement$ = this.store.pipe(select(getEntitlementLeaveProxyApply));
    this.showEditor$ = this.store.pipe(select(showEditorLeaveProxyApply));
  }

  subscriptions() {
    this.leaveEntitlement$
      .subscribe((result: ILeaveEntitlement) => {
          if (result) {
            this.fs.entitlement.setValue(result.summaryCaption);
          } else {
            this.fs.entitlement.setValue('');
          }
        }
      );
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCountrySelected($event) {
    this.stateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.state.setValue(null);
    this.fs.city.setValue(null);
  }

  onStateSelected($event) {
    this.cityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.city.setValue(null);
  }

  setCountryLists(data: ILeaveDailyData) {
    let countryId = (data && data.NationalityInfo)?data.NationalityInfo.nationality_id:null;
    let stateId = (data && data.StateInfo)?data.StateInfo.state_id:null;

    if (countryId) {
      this.stateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.cityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }

  onLeaveTypeSelected($event) {

    const employeeid = this.employeeLookup.value;
      if(employeeid){
        this.fs.entitlement.setValue('');
        this.store.dispatch(new ProcessingFormLeaveProxyApply());
        this.store.dispatch(new LoadEntitlementLeaveProxyApply({selectedLeaveType: <ISelectOption>$event, employeeId: employeeid }));
      }else{
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select employee', options: toastOptionsError()}))
      }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_size: data.size,
        doc_extension: data.extension
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      doc_binary: null,
      doc_size: null,
      doc_extension: ''
    });
  }

  onSubmit() {
    this.fs.startDate.setValue(formatDate(this.fs.startDate.value));
    this.fs.resumptionDate.setValue(formatDate(this.fs.resumptionDate.value));

    this.showFullForm$.pipe(take(1))
      .subscribe((result) => {
        if (result) {
          if (this.fs.valid) {
            this.store.dispatch(new ProcessingLeaveProxyApply());
            this.store.dispatch(new SaveLeaveProxyApply({leaveData: <ILeaveDailyData>this.fs.value, saveMode: this.mode}));
          } else {
            this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
          }
        } else {
          if (this.fs.valid) {
            this.showContinueForm();
          } else {
            this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
          }
        }
      })
  }

  getLeaveData(leaveDates: any): ILeaveDailyData {
    let leaveData: ILeaveDailyData = {};
    if (this.data) {
      leaveData = Object.assign({}, this.data);
    } else {
      leaveData.assigned_backup_id = this.comprehensiveData.backup_officer_id;
      leaveData.supervisor_id = this.comprehensiveData.reports_to_id;
    }
    const endDate: Date = leaveDates? new Date(leaveDates.leave_end_date): null;
    const resumeDate: Date = leaveDates? new Date(leaveDates.leave_resume_date): null;
    leaveData.leave_id = this.fs.leaveId.value;
    leaveData.entitlement = this.fs.entitlement.value;
    leaveData.start_date = new Date(this.fs.startDate.value);
    leaveData.end_date = new Date(endDate);
    leaveData.resumption_date = new Date(resumeDate);
    leaveData.no_of_days = this.fs.numberOfDays.value;

    return leaveData;
  }

  getAvailableDays(apiResult: IApiResult): number {
    const result: any = (<string[]>apiResult.Results)[0];
    const ar: string[] = result.split('|');

    return Number(ar[2]);
  }

  onSubmitChangeDates() {
    this.data = null;
    this.reset();
    this.store.dispatch(new HideFullFormLeaveProxyApply());
    this.fs.enablePreFormControls();
  }

  showContinueForm(){
    this.store.dispatch(new ProcessingFormLeaveProxyApply());
    this.apiService.read(`${constants.LEAVE_URLs.getProxyLeaveEntitlement}?employeeID=${this.employeeLookup.value}&id=${this.fs.leaveId.value}`).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const availableDays = this.getAvailableDays(data);

          if (this.fs.numberOfDays.value > availableDays) {
            this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Number of Days requested is more than your current leave balance.', options: toastOptionsError()}));
            this.store.dispatch(new NotProcessingFormLeaveProxyApply());
          } else {
            this.apiService.read(`${constants.LEAVE_URLs.getLeaveApplyDates}?leaveID=${this.fs.leaveId.value}&startDate=${formatDate(this.fs.startDate.value)}&numberOfDays=${this.fs.numberOfDays.value}&returnVal=0`).subscribe((data: IApiResult) => {
              if (data.Success && data.Results) {
                  this.store.pipe(select(leaveTypes))
                  .pipe(map(data => data.filter(val => val.leave_id === this.fs.leaveId.value)))
                    .subscribe((result) => {
                      this.apiService.read(`${constants.LEAVE_URLs.getHrAllowanceEligibility}/${this.fs.employeeId.value}/${this.fs.leaveId.value}/${this.fs.numberOfDays.value}`).subscribe((response: IApiResult) => {
                        if(response.Success && response.Results){
                          this.supportsAllowancePayment = (response.Results[0]=="true")?true: false;
                          // this.supportsAllowancePayment?this.fs.payAllowance.enable():this.fs.payAllowance.disable();
                          const leaveData = this.getLeaveData(data.Results[0]);
                          this.fs.endDate.setValue(leaveData.end_date);
                          this.fs.resumptionDate.setValue(leaveData.resumption_date);
                          this.fs.assignedBackupId.setValue(leaveData.assigned_backup_id);
                          this.fs.supervisorId.setValue(leaveData.supervisor_id);

                          this.data = this.getLeaveData(data.Results[0]);
                          this.fs.disablePreFormControls();
                          this.store.dispatch(new ShowFullFormLeaveProxyApply());
                          this.store.dispatch(new NotProcessingFormLeaveProxyApply());
                        } else {
                          this.store.dispatch(new ShowToast({title: 'Something went wrong.', message: 'Error getting Pay Me system option ', options: toastOptionsError()}));
                          this.store.dispatch(new NotProcessingFormLeaveProxyApply());
                          }
                        });
                      }
                    );
                } else {
                  this.store.dispatch(new ShowToast({title: 'Something went wrong.', message: data.ErrorMessage ? data.ErrorMessage : 'Error occured', options: toastOptionsError()}));
                  this.store.dispatch(new NotProcessingFormLeaveProxyApply());
                }
              }, (error) => {
                this.store.dispatch(new ShowToast({title: 'Something went wrong.', message: 'Error occured', options: toastOptionsError()}));
                this.store.dispatch(new NotProcessingFormLeaveProxyApply());
              }
            );
          }
        } else {
          this.store.dispatch(new ShowToast({title: 'Something went wrong.',  message: data.ErrorMessage ? data.ErrorMessage : 'Error occured', options: toastOptionsError()}));
          this.store.dispatch(new NotProcessingFormLeaveProxyApply());
        }
      }, (error) => {
        this.store.dispatch(new ShowToast({title: 'Something went wrong.', message: 'Error occured', options: toastOptionsError()}));
        this.store.dispatch(new NotProcessingFormLeaveProxyApply());
      }
    );
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingFormLeaveProxyApply());
    this.reset();
    this.store.dispatch(new HideFullFormLeaveProxyApply());
    this.cancelClick.emit();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeaveProxyApply());
  }

  reset() {
    this.fs.resetFormControls();
    this.fs.enablePreFormControls();
    if (this.filePicker) {
      this.filePicker.removeFile();
    }
    this.fs.init(this.data, this.selectOptionData);
  }

  ngOnDestroy() {
  }
}
