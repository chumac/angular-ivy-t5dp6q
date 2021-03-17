import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IReligions } from '@nutela/models/platform/lookup';
import { ReligionsEditorService } from './religions-editor.service';
import { SaveReligions, ProcessingReligions, UpdateReligions, NotProcessingReligions, isProcessingReligions } from '../../../store';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-plf-hrf-religions-editor',
  templateUrl: './religions-editor.component.html',
  styleUrls: ['./religions-editor.component.scss']
})
export class ReligionsEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IReligions;

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
    public fs:  ReligionsEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingReligions));
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
        const recordId = this.data? this.data.religion_id: 0;
        this.store.dispatch(new ProcessingReligions());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveReligions({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateReligions({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingReligions());
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
