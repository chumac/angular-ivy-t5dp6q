import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, Inject} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { LeaveDetailEditorService } from '../leave-detail-editor/leave-detail-editor.service';
import { IAbsenceState } from '../../../store';
import { ILeavePlanDetail } from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { SaveDetailLeavePlan, ProcessingLeavePlan, AddDetailLeavePlan, isProcessingLeavePlan } from '../../../store/leave-plan';
import { getLeaveStaggeredCurrencyList, LoadLeaveStaggeredCurrencyList } from '../../../store/leave-staggered';

@Component({
  selector: 'x365-fm-talent-leave-detail-editor',
  templateUrl: './leave-detail-editor.component.html',
  styleUrls: ['./leave-detail-editor.component.scss'],
  providers: [LeaveDetailEditorService],
})
export class LeaveDetailEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public leavePlanId: number;
  @Input() public supportPayment: boolean;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;
  currencyList$: Observable<ISelectOption[]>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  } 

  constructor(public fs: LeaveDetailEditorService, public utilService: UtilService, private store: Store<IAbsenceState>) {
    super();
  }

  ngOnInit() {
    this.fs.init(this.data);
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.currencyList$ = this.store.pipe(select(getLeaveStaggeredCurrencyList));
    this.isProcessing$ = this.store.pipe(select(isProcessingLeavePlan));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeaveStaggeredCurrencyList());

  }



  onCancelButtonClicked() {
    // this.dialogRef.close();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() { 
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingLeavePlan());
        this.store.dispatch(new SaveDetailLeavePlan({leaveData: <ILeavePlanDetail>this.fs.value, recordId: recordId}));
        } else {
        this.fs.leavePlanId.setValue(this.leavePlanId);
        this.store.dispatch(new ProcessingLeavePlan());
        this.store.dispatch(new AddDetailLeavePlan({leaveData: <ILeavePlanDetail>this.fs.value}));
      }
    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}

}

