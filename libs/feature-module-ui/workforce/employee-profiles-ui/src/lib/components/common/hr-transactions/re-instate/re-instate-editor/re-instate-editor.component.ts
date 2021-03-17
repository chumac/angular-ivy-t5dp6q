import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IReInstate } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { ReInstateEditorService } from './re-instate-editor.service';
import { UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../../store';
import { Store, select } from '@ngrx/store';
import { isProcessingReInstateTransaction, ProcessingReInstateTransaction, SaveReInstateTransaction,
         NotProcessingReInstateTransaction,
         getEmployeeListReInstateTransaction,
         getRecordCategoryReInstateTransaction} from '../../../../../store/hr-transactions/re-instate';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-re-instate-editor',
  templateUrl: './re-instate-editor.component.html',
  styleUrls: ['./re-instate-editor.component.scss'],
  providers: [ReInstateEditorService],

})
export class ReInstateEditorComponent extends BaseFormComponent implements OnInit{
  isNewContact: boolean;

  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IReInstate;

  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('staffNo') staffNo: ElementRef;
  @ViewChild('userName') userName: ElementRef;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;
  employeeList$: Observable<ISelectOption[]>;
  recordCategory$: Observable<ISelectOption[]>;


  constructor(
    public fs: ReInstateEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
       this.isProcessing$=this.store.pipe(select(isProcessingReInstateTransaction));
       this.employeeList$=this.store.pipe(select(getEmployeeListReInstateTransaction));
       this.recordCategory$=this.store.pipe(select(getRecordCategoryReInstateTransaction));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
     if (this.fs.valid) {
        console.log('data',this.fs.value)
        const recordId = this.data? this.data.employee_id: 0;
        this.fs.formatDate();
        this.store.dispatch(new ProcessingReInstateTransaction());
        this.store.dispatch(new SaveReInstateTransaction({data: this.fs.value}));
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(),  type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingReInstateTransaction());
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
    if(this.staffNo.nativeElement.checked){
      status = true;
    }
    return status;
    }

    onClickNewUserName(): boolean{
      let status = false;
      if(this.userName.nativeElement.checked){
        status = true;
      }
      return status;
      }

    // onClickLumpsum(event){
    //   if(event.target.checked===true){
    //     this.fs.status=true;
    //   }
    //   else{
    //     this.fs.status=false;
    //   }
    // }
}
