import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IQualifications } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { QualificationCategoryEditorService } from './qualifications-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { isProcessingQualification, getCategory, LoadCategory, ProcessingQualification, SaveQualification, UpdateQualification, NotProcessingQualification } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import * as constants from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-plf-hrf-qualifications-editor',
  templateUrl: './qualifications-editor.component.html',
  styleUrls: ['./qualifications-editor.component.scss']
})
 export class QualificationsEditorComponent  extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IQualifications;

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
  category$:Observable<ISelectOption[]>;
  public catData=[];
  public type= constants.Qualification_Category;

  constructor(
    public fs:  QualificationCategoryEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.store.dispatch(new LoadCategory());
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingQualification));
      this.category$= this.store.pipe(select(getCategory));
      this.category$.subscribe(result=>{
        this.catData=this.utilService.transformToSelectDataList(result,"category_id","description");
      });
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
        const recordId = this.data? this.data.qualification_id: 0;
        this.store.dispatch(new ProcessingQualification());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveQualification({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateQualification({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingQualification());
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

