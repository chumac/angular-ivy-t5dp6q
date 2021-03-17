import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILeaveDays } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { LeaveDaysEditorService } from './leave-days-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../../store/root';
import { isProcessingLeaveDays, ProcessingLeaveDays, SaveLeaveDays, NotProcessingLeaveDays } from '../../../../store/setups';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-absence-leave-days-editor',
  templateUrl: './leave-days-editor.component.html',
  styleUrls: ['./leave-days-editor.component.scss']
})
export class LeaveDaysEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveDays;

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
    public fs: LeaveDaysEditorService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingLeaveDays));

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
        const leave_id = this.data? this.data.grade_id: null;
        const days=this.data.annual_leave_days;
        this.store.dispatch(new ProcessingLeaveDays());
          this.store.dispatch(new SaveLeaveDays({data: this.fs.value, days:days, recordId: leave_id}));
      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingLeaveDays());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
}
