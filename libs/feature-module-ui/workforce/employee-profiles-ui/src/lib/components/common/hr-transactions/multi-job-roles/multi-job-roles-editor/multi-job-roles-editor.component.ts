import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { MultiJobRolesEditorService } from './multi-job-roles-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../../store';
import { isProcessingMultiJobRoleTransaction, ProcessingMultiJobRoleTransaction, SaveMultiJobRoleTransaction, NotProcessingMultiJobRoleTransaction, getEmployeeListMultiJobRoleTransaction, getPositionListMultiJobRoleTransaction, UpdateMultiJobRoleTransaction } from '../../../../../store/hr-transactions/multi-job-role';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { Validators } from '@angular/forms';

@Component({
  selector: 'x365-fm-workforce-multi-job-roles-editor',
  templateUrl: './multi-job-roles-editor.component.html',
  styleUrls: ['./multi-job-roles-editor.component.scss'],
  providers: [MultiJobRolesEditorService]
})
export class MultiJobRolesEditorComponent extends BaseFormComponent  implements OnInit{
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;


  @Input() public data: IMultiRoleJob;

  @Output() cancelClick = new EventEmitter<any>();

  // @ViewChild('staffNo') staffNo: ElementRef;
  // @ViewChild('userName') userName: ElementRef;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
    if(this.employeeId){
      this.fs.patch({
        employee_id: this.employeeId,
      });
    }
  }

  isProcessing$: Observable<boolean>;
  employeeList$: Observable<ISelectOption[]>;
  positionList$: Observable<ISelectOption[]>;


  constructor(
    public fs: MultiJobRolesEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
       this.isProcessing$=this.store.pipe(select(isProcessingMultiJobRoleTransaction));
       this.employeeList$=this.store.pipe(select(getEmployeeListMultiJobRoleTransaction));
       this.positionList$=this.store.pipe(select(getPositionListMultiJobRoleTransaction));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {

      if(!this.fs.isTemporary.value){
        this.fs.EndDate.setValue(null);this.fs.EndDate.clearValidators();this.fs.EndDate.updateValueAndValidity();
      } else {
        this.fs.EndDate.setValidators([Validators.required]);this.fs.EndDate.updateValueAndValidity();
      }
     if (this.fs.valid) {
        const recordId = this.data? this.data.id: 0;
        this.store.dispatch(new ProcessingMultiJobRoleTransaction());
        if (this.inEditMode()){
        this.fs.patch({position_id : [this.fs.value.position_id]})
        this.store.dispatch(new UpdateMultiJobRoleTransaction({data: this.fs.value, recordId:recordId,employeeId:this.employeeId}));
        }
        else{
          this.store.dispatch(new SaveMultiJobRoleTransaction({data: this.fs.value, employeeId:this.employeeId}));
        }
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(),  type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingMultiJobRoleTransaction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    onClick(): boolean{
    let status = false;
    // if(this.staffNo.nativeElement.checked){
    //   status = true;
    // }
    return status;
    }

    // onClickNewUserName(): boolean{
    //   let status = false;
    //   if(this.userName.nativeElement.checked){
    //     status = true;
    //   }
    //   return status;
    //   }

}
