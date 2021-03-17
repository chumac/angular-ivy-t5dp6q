import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILeaveLimits } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { LeaveLimitEditorService } from './leave-limit-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../../store/root';
import { isProcessingLeaveLimits, NotProcessingLeaveLimits, ProcessingLeaveLimits, SaveLeaveLimits, getLeave, getGrade, LoadLeave, LoadGrade, UpdateLeaveLimits } from '../../../../store/setups';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';

@Component({
  selector: 'x365-fm-workforce-absence-leave-limit-editor',
  templateUrl: './leave-limit-editor.component.html',
  styleUrls: ['./leave-limit-editor.component.scss']
})
export class LeaveLimitEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveLimits;

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
  leave$: Observable<ISelectOption[]>;
  grade$: Observable<ISelectOption[]>;
  leaveData=[];
  gradeData=[];


  constructor(
    public fs: LeaveLimitEditorService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatch();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingLeaveLimits));
      this.leave$=this.store.pipe(select(getLeave));
      this.grade$=this.store.pipe(select(getGrade));
      this.leave$.subscribe(result => {
        this.leaveData = this.utilService.transformToSelectDataList(
          result,
          'leave_id',
          'description'
        );
      });
      this.grade$.subscribe(result => {
        this.gradeData = this.utilService.transformToSelectDataList(
          result,
          'grade_id',
          'description'
        );
      });

    }
    storeDispatch(){
      this.store.dispatch(new LoadLeave());
      this.store.dispatch(new LoadGrade());
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
        const limit_id = this.data? this.data.limit_id: null;
        this.store.dispatch(new ProcessingLeaveLimits());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveLeaveLimits({data: this.fs.value, recordId: limit_id}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateLeaveLimits({data: this.fs.value, recordId: limit_id}));
        }
      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingLeaveLimits());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }
}
