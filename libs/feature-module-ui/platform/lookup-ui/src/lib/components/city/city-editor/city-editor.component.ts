import { Component, OnInit, Input, EventEmitter, SimpleChanges, Output, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ICity } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { CityEditorService } from './city-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { isProcessingCity, ProcessingCity, SaveCity, UpdateCity, NotProcessingCity } from '../../../store';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-plf-hrf-city-editor',
  templateUrl: './city-editor.component.html',
  styleUrls: ['./city-editor.component.scss']
})
export class CityEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public stateId:number;


  @Input() public data: ICity;

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
    public fs:  CityEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingCity));
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
        const recordId = this.data? this.data.city_id: 0;
        this.store.dispatch(new ProcessingCity());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveCity({data: this.fs.value, stateId:this.stateId}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateCity({data: this.fs.value, stateId:this.stateId, cityId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingCity());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

}
