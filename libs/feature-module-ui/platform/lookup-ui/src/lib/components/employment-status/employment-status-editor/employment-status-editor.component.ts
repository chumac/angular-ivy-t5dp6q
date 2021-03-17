import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IEmployeeStatus } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { EmploymentStatusEditorService } from './employment-status-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { ProcessingEmployeeStatus, SaveEmployeeStatus, UpdateEmployeeStatus, NotProcessingEmployeeStatus, isProcessingEmployeeStatus } from '../../../store';

@Component({
  selector: 'x365-fm-plf-hrf-employment-status-editor',
  templateUrl: './employment-status-editor.component.html',
  styleUrls: ['./employment-status-editor.component.scss']
})
export class EmploymentStatusEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IEmployeeStatus;

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
    public fs:  EmploymentStatusEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingEmployeeStatus));
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
        const recordId = this.data? this.data.status_id: 0;
        this.store.dispatch(new ProcessingEmployeeStatus());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveEmployeeStatus({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateEmployeeStatus({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingEmployeeStatus());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    ngOnDestroy() {
    }

}
