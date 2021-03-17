import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILga } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { LgaEditorService } from './lga-editor.service';
import { ProcessingLga, SaveLga, UpdateLga, NotProcessingLga, isProcessingLga } from '../../../store';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-plf-hrf-lga-editor',
  templateUrl: './lga-editor.component.html',
  styleUrls: ['./lga-editor.component.scss']
})
export class LgaEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public stateId:number;


  @Input() public data: ILga;

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
    public fs:  LgaEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingLga));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      this.fs.stateId.setValue(this.stateId);
      console.log('data',this.fs.value)
     if (this.fs.valid) {
        console.log('data',this.fs.value)
        const recordId = this.data? this.data.lga_id: 0;
        this.store.dispatch(new ProcessingLga());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveLga({data: this.fs.value,stateId:this.stateId}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateLga({data: this.fs.value, stateId:this.stateId, LgaId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingLga());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }


}
