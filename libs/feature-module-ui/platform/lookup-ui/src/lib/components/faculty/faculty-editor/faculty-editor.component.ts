import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IFaculty } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ILookupState, isProcessingDepartment, ProcessingFaculty, SaveFaculty, UpdateFaculty, NotProcessingFaculty } from '../../../store';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';

import { FacultyEditorService } from './faculty-editor.service';

@Component({
  selector: 'x365-fm-plf-lookup-faculty-editor',
  templateUrl: './faculty-editor.component.html',
  styleUrls: ['./faculty-editor.component.scss']
})

export class FacultyEditorComponent extends BaseFormComponent  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IFaculty;

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
    public fs: FacultyEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingDepartment));

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
        const recordId = this.data? this.data.id: 0;
        this.store.dispatch(new ProcessingFaculty());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveFaculty({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateFaculty({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingFaculty());
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
