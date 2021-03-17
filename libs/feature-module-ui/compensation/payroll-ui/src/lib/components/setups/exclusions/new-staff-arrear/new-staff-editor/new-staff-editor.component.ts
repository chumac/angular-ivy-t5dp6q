import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { NewStaffEditorService } from './new-staff-editor.service';
import { getEmployeePayrollProfiles,isProcessingStaffRun, IStaffState,LoadEmployeePayrollProfileData,NotProcessingStaff,ProcessingStaff,SavePayrollProfileData} from '../../../../../store/setup/exclusions/new-staff-arrear';
import { IGetPayrollProfile, IstaffEmployeePayrollProfile } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-new-staff-editor',
  templateUrl: './new-staff-editor.component.html',
  styleUrls: ['./new-staff-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStaffEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  activePersonnelDataSource: any = null;
  selectedEmployeeId: any = null;
  showList : boolean = false;
  arrayItems:any = [];


  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;

  @Input() public activeEmployee: ISelectOption[];
  @Input() public profileData: IGetPayrollProfile[];

  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  employeeGroup$ : Observable<any[]>;
  activePayrollProfiles$ : Observable<IstaffEmployeePayrollProfile[]>;
  excludedProfile$ : IstaffEmployeePayrollProfile[] = [];
  selectedProfile$ : IstaffEmployeePayrollProfile[] = [];
  selectedExcludedProfile$ : IstaffEmployeePayrollProfile[] = [];
  tempStoreProfile : IstaffEmployeePayrollProfile[];

  constructor(
    public fs: NewStaffEditorService,
    public utilService: UtilService,
    private store: Store<IStaffState>,
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileData']) {
      this.selectedProfile$ = [];
      this.tempStoreProfile = [];
      if(this.profileData != null){
        if(this.profileData.length > 0){
        this.fs.patch({employee_id: this.profileData[0].employee_id })
        this.activePayrollProfiles$ = this.store.pipe(select(getEmployeePayrollProfiles));
        this.store.dispatch(new LoadEmployeePayrollProfileData({ employee_id: this.profileData[0].employee_id }))
        this.activePayrollProfiles$.pipe().subscribe((result)=>{
          this.tempStoreProfile = result;
          this.excludedProfile$= [];
          this.selectedProfile$ = [];
        for (let profile of this.tempStoreProfile){
           for(let data of this.profileData){
             if(profile.payroll_profile_id ==  data.payroll_profile_id){
                var isInArray = this.excludedProfile$.indexOf(profile) !== -1;
                if(!isInArray){
                  if(this.profileData.length > this.excludedProfile$.length)
                this.excludedProfile$.push(profile);
                this.selectedProfile$.push(profile);
             }
           }
        }
      };
    this.showList = true;
    })
  }
}
    
      this.fs.patch({checked: false})
    }
    if (this.show === false) {
      this.excludedProfile$= [];
      this.profileData = [];
      this.selectedProfile$  = [];
      this.reset();
    }
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingStaffRun));
  }

  storeDispatches() {
  }

  inEditMode(): boolean {
    if (this.activeEmployee == null) {
      return true;
    } else {
      return false;
    }
  }
  

  onEmployeeGroupSelected(val) {
    this.activePayrollProfiles$ = this.store.pipe(select(getEmployeePayrollProfiles));
    this.store.dispatch(new LoadEmployeePayrollProfileData({ employee_id: val.value }))
    this.selectedProfile$ = [];
    this.excludedProfile$ = [];
    this.tempStoreProfile = [];
    this.profileData = [];
    this.showList = true;
  }

  storeSelectedProfile(item, event){
    if(event.checked){
      var isInArray = this.selectedProfile$.indexOf(item) !== -1;
     if(!isInArray){
      this.selectedProfile$.push(item);
     }
    }else{
      for (let profile of this.selectedProfile$) {
        if (profile.payroll_profile_id == item.payroll_profile_id) {
            this.selectedProfile$.splice(this.selectedProfile$.indexOf(profile), 1);
            break;
        }      
      }
    }
  }
  storeActiveProfile(item, event){
    if(event.checked){
            this.selectedProfile$.splice(this.selectedProfile$.indexOf(item), 1);
    }
  }
  activedAllProfile(){
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];
    this.fs.patch({checked: false})
  }

  activeSelectedProfile (){
    this.excludedProfile$ = [];
    for (let profile of this.selectedProfile$){
      if(this.profileData != null && this.profileData.length > 0){
            var isInArray = this.excludedProfile$.indexOf(profile) !== -1;
            if(!isInArray){
             this.excludedProfile$.push(profile);
         }
       }else{
         var isInArray = this.excludedProfile$.indexOf(profile) !== -1;
             if(!isInArray){
             this.excludedProfile$.push(profile);
       }
  }
}
this.fs.patch({checked: false})
}

  excludedSelectedProfile(){
      for (let profile of this.selectedProfile$){
        if(this.profileData != null && this.profileData.length > 0){
             var isInArray = this.excludedProfile$.indexOf(profile) !== -1;
             if(!isInArray){
              this.excludedProfile$.push(profile);
          }
        }else{
          var isInArray = this.excludedProfile$.indexOf(profile) !== -1;
              if(!isInArray){
              this.excludedProfile$.push(profile);
        }
      }
    }
        this.fs.patch({checked: false})
    }
  excludedAllProfile(){
    this.excludedProfile$ = [];
    this.selectedProfile$ = [];

    this.activePayrollProfiles$.pipe().subscribe((result)=>{
      this.excludedProfile$ = result;
      });
      this.fs.patch({checked: false})
    }

  onSubmit() {
    if (this.fs.valid) {
    this.store.dispatch(new ProcessingStaff());
    for (let profile of this.excludedProfile$){
      this.arrayItems.push(profile.payroll_profile_id)
    }
    var payrollObj = {
      payroll_profile_ids : this.arrayItems,
      employee_id : this.fs.value.employee_id,
      org_id : 0
    }
    this.store.dispatch(new SavePayrollProfileData({ data: <any>payrollObj }));
  } else {
    this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
  }
}

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingStaff());
    this.reset();
    this.cancelClick.emit();
    this.selectedProfile$ = [];
    this.excludedProfile$ = [];
    this.tempStoreProfile = [];
    this.profileData = [];
    this.showList = false;
    this.activePayrollProfiles$ = new Observable<IstaffEmployeePayrollProfile[]>(); 
    this.setDefaultFields(null);
  }

  setDefaultFields(profileID: number) {
    this.fs.patch({
      groupemployee: 0,
      use_payroll_acceleration: true,
      payroll_profile_id: profileID
    })
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
    this.selectedProfile$ = [];
    this.excludedProfile$ = [];
    this.tempStoreProfile = [];
  }
}
