import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef} from '@angular/core'; 

import { BaseFormComponent } from '@nutela/shared/app-global';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError, formatDate, ApiService, ExternalLookupService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LeavePlanEditorService } from './leave-plan-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption, INationalitySelectOption, IApiResult } from '@nutela/models/core-data';
import { ILeaveDailyData, ILeavePlanDetail, ILeaveEntitlement, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import {MatDialog, MatDialogRef, VERSION} from '@angular/material';
import { LeaveDetailModalComponent } from '../leave-detail-modal/leave-detail-modal.component';
import { LoadStatesLeavePlan, LoadCitiesLeavePlan, getLeavePlanCityList, isProcessingLeavePlan, getLeavePlanStateList, NotProcessingLeavePlan, LoadLeavePlanIdentity, getLeavePlanIdentity, ProcessingLeavePlan, AddLeavePlan } from '../../../store/leave-plan';
import {trigger, style, animate, transition} from '@angular/animations';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ISubscriptions } from '@nutela/models/common';
import { from } from 'rxjs/internal/observable/from';
import { getLeaveStaggeredCurrencyList, LoadLeaveStaggeredCurrencyList } from '../../../store/leave-staggered';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { LoadEntitlementLeaveApply, getEntitlementLeaveApply, ResetEntitlementLeaveApply } from '../../../store/leave-apply';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeWhile } from 'rxjs/operators';
import { getCountries } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-leave-plan-editor',
  templateUrl: './leave-plan-editor.component.html',
  styleUrls: ['./leave-plan-editor.component.scss'],
  providers: [LeavePlanEditorService],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavePlanEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveDailyData;
  @Input() public activePersonnel: ISelectOption;
  @Input() public selectOptionData: ISelectOptionData;
  @Input() public leaveTypes: ISelectOption[];
  @Input() public comprehensiveData: IComprehensiveData;
  @Input() public contactInfo: ILeaveContactInfo;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  @ViewChild('entitlementControl') entitlementControl: ElementRef;
  @ViewChild('entitlementLookup') entitlementLookup: DxLookupComponent;
  private subscriptions: ISubscriptions = {};



  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (changes['show']) {
      if(!this.show) {
        if(this.leaveIdentitySub){
          this.leaveIdentitySub.unsubscribe();  
        }
      } else {
        this.totalDaysSelected = 0;
        this.prePopulateForm();
      }
    } 
  }

  isProcessing$: Observable<boolean>;
  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;
  leaveTypes$: Observable<ISelectOption[]>;
  leavePlanIdentity$: Observable<any>;
  leaveEntitlement$: Observable<ILeaveEntitlement>;
  activePersonnelDataSource: any = null;
  version = VERSION;
  detailsDialogRef: MatDialogRef<LeaveDetailModalComponent>;
  rowFormFlag: boolean = false;
  currencyList$: Observable<ISelectOption[]>;
  leaveIdentitySub: Subscription;
  leaveDetailsList: Array<any> = [];
  totalDaysSelected: number = 0;

  constructor(
    public dialog: MatDialog,
    public fs: LeavePlanEditorService,
    public utilService: UtilService,
    private externalLookupService: ExternalLookupService,
    private ref: ChangeDetectorRef,
    public apiService: ApiService,
    private store: Store<IAppState>  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.leavePlanIdentity$ = this.store.pipe(select(getLeavePlanIdentity));
    this.currencyList$ = this.store.pipe(select(getLeaveStaggeredCurrencyList));
    this.leaveEntitlement$ = this.store.pipe(select(getEntitlementLeaveApply));
    this.isProcessing$ = this.store.pipe(select(isProcessingLeavePlan));
    this.countries$ = this.store.pipe(select(getCountries));
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeaveStaggeredCurrencyList());

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

  showSubForm() {
    this.rowFormFlag = true;
  }

  removeSubForm() {
    this.rowFormFlag = false;
  }

  loadLeaveEntitlement($event) {
    if($event.value !== null){
      this.fs.resetLeaveDetails();
      this.leaveDetailsList = [];
      this.totalDaysSelected = 0;
      this.entitlementControl.nativeElement.value = 'loading entitlement ...';
      this.store.dispatch(new LoadEntitlementLeaveApply({selectedLeaveType: <ISelectOption>$event}));
      }
  }

  addToCollection(plan_id: number, data: ILeavePlanDetail) {
    if(this.fs.rf.valid){
      this.fs.rf.get('leave_plan_id').setValue(plan_id);
      this.fs.rf.get('start_date').setValue(formatDate(this.fs.rf.get('start_date').value));
      this.fs.rf.get('pay_allowance').setValue((this.fs.rf.get('pay_allowance').value)?(this.fs.rf.get('pay_allowance').value):false);
      // Adjust Start
      let formValues = this.fs.rf.value;
      let url = '/api/utilities/get-leave-dates';
      this.apiService.read(`${url}?leaveID=${this.fs.essHrLeavePlansMaster.get('leave_id').value}&startDate=${this.fs.rf.get('start_date').value}&numberOfDays=${this.fs.rf.get('no_of_days').value}&returnVal=0`)
      .pipe(takeWhile(() => this.show)).subscribe((resp: IApiResult) => {
        const dates = resp.Success?resp.Results[0]:null;
        Object.assign(formValues, {end_date: dates?dates.leave_end_date:'--', resumption_date: dates?dates.leave_resume_date:'--'});
        this.ref.markForCheck(); 
      });
      this.leaveEntitlement$.pipe(take(1)).subscribe((result: ILeaveEntitlement) => {
        const availableDays = (result?result.available_days:0) - this.totalDaysSelected;
          if(availableDays >= +this.fs.rf.get('no_of_days').value) {
            this.leaveDetailsList.push(formValues);
            this.totalDaysSelected = +this.leaveDetailsList.reduce( function(cnt,o){ return cnt + o.no_of_days; }, 0);
            this.onAddDetailRow(plan_id, this.fs.rf.value);
            this.removeSubForm();
            this.fs.rf.reset();
          } else {
            this.store.dispatch(
              new ShowToast({
                title: 'Correct the following Errors',
                message: `You have ${availableDays} days remaining`,
                options: toastOptionsError()
              })
            );
          }
      });
      // Adjust End
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getRowErrorMessage(),
          options: toastOptionsError()
        })
      );
    }
  }

  onAddDetailRow(plan_id: number, data: ILeavePlanDetail) {
    this.fs.addLeaveDetails(data);
  }

  onDeleteDetailRow(index) {
    this.leaveDetailsList.splice(index, 1);
    this.fs.deleteLeaveDetails(index);
    this.totalDaysSelected = +this.leaveDetailsList.reduce( function(cnt,o){ return cnt + o.no_of_days; }, 0);
  }

  onSubmit() {
    this.removeSubForm();
    if (this.fs.essHrLeavePlansMaster.valid) {
      this.leaveIdentitySub = this.leavePlanIdentity$.pipe(take(1)).subscribe((result)=>{
        if(result !== null) {
          const id: number = +result;
          this.fs.leavePlanId.setValue(id);
          this.store.dispatch(new ProcessingLeavePlan());
          this.store.dispatch(
            new AddLeavePlan({ leaveData: <ILeaveDailyData>this.fs.value, saveMode: ''})
          );
        }
      });
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(),
          options: toastOptionsError()
        })
      );
    }
  }

  prePopulateForm() {
    this.fs.addressOne.setValue((this.data && this.data.address1)?this.data.address1:this.contactInfo.address_line1);
    this.fs.addressTwo.setValue((this.data && this.data.address2)?this.data.address2:this.contactInfo.address_line2);
    // this.fs.city.setValue((this.data && this.data.city_id)?this.data.city_id:this.contactInfo.area_id_r);
    // this.fs.state.setValue((this.data && this.data.state_id)?this.data.state_id:this.contactInfo.state_id);
    // this.fs.country.setValue((this.data && this.data.country_id)?this.data.country_id:this.contactInfo.country_id);
    this.fs.zip.setValue((this.data && this.data.zip)?this.data.zip:this.contactInfo.zip_r);
    this.fs.phone.setValue((this.data && this.data.telephone_no)?this.data.telephone_no:this.contactInfo.phone);
    this.setCountryLists(this.data);
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.essHrLeavePlansMaster, this.fs.validationMessages)
    );
  }

  getRowErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.rf, this.fs.validationMessages)
    );
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeavePlan());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }
  
  reset() {
    this.store.dispatch(new ResetEntitlementLeaveApply());
    this.leaveDetailsList = [];
    if(this.entitlementControl){
      this.entitlementControl.nativeElement.value = '';
    }
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}
}
