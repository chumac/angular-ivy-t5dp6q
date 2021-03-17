import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, Inject} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveDetailService } from '../leave-detail-modal/leave-detail-modal.service';
import { IAbsenceState } from '../../../store';
import { ILeavePlanDetail } from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { SaveDetailLeavePlan, ProcessingLeavePlan, AddDetailLeavePlan, isProcessingLeavePlan } from '../../../store/leave-plan';


@Component({
  selector: 'x365-fm-talent-leave-detail-modal',
  templateUrl: './leave-detail-modal.component.html',
  styleUrls: ['./leave-detail-modal.component.scss'],
  providers: [LeaveDetailService],
})
export class LeaveDetailModalComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: any;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.data = this.dialogData.data;
      this.fs.init(this.data);
    }
  } 

  constructor(public fs: LeaveDetailService, public utilService: UtilService, private store: Store<IAbsenceState>,  private dialogRef: MatDialogRef<LeaveDetailModalComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: {mode: string, data: any}) {
    super();
  }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.fs.init(this.data);
    this.isProcessing$ = this.store.pipe(select(isProcessingLeavePlan));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }

  onCancelButtonClicked() {
    this.dialogRef.close();
  }

  inEditMode(): boolean {
    if (this.dialogData.mode === 'EDIT') {
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
    console.log('Edit Mode', this.inEditMode(), 'mode from modal: ', this.dialogData.mode);
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingLeavePlan());
        this.store.dispatch(new SaveDetailLeavePlan({leaveData: <ILeavePlanDetail>this.fs.value, recordId: recordId}));
        } else {
        this.fs.leavePlanId.setValue(this.data);
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
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}

}

