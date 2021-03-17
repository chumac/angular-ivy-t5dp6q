import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { IState } from '@nutela/models/platform/lookup';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { StateEditorService } from './state-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { ProcessingState, SaveState, UpdateState, NotProcessingState, isProcessingState } from '../../../store';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-plf-hrf-state-editor',
  templateUrl: './state-editor.component.html',
  styleUrls: ['./state-editor.component.scss']
})

export class StateEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public nationId:number;


  @Input() public data: IState;

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
    public fs:  StateEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingState));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      this.fs.nationalityId.setValue(this.nationId);
      console.log('data',this.fs.value)
     if (this.fs.valid) {
        const recordId = this.data? this.data.state_id: 0;
        this.store.dispatch(new ProcessingState());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveState({data: this.fs.value, countryId:this.nationId}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateState({data: this.fs.value,countryId:this.nationId, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingState());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

}
