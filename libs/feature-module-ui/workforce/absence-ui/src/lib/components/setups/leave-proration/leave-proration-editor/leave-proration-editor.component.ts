import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILeaveProrate } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { LeaveProrationEditorService } from './leave-proration-editor.service';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../../store/root';
import { isProcessingLeaveProrate, ProcessingLeaveProrate, SaveLeaveProrate, NotProcessingLeaveProrate, UpdateLeaveProrate } from '../../../../store/setups';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-absence-leave-proration-editor',
  templateUrl: './leave-proration-editor.component.html',
  styleUrls: ['./leave-proration-editor.component.scss']
})
export class LeaveProrationEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveProrate;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;


  constructor(
    public fs: LeaveProrationEditorService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingLeaveProrate));

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
        const leaveprorate_id = this.data? this.data.leaveprorate_id: null;
        this.store.dispatch(new ProcessingLeaveProrate());
          this.store.dispatch(new UpdateLeaveProrate({data: this.fs.value, recordId: leaveprorate_id}));
      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingLeaveProrate());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
}

