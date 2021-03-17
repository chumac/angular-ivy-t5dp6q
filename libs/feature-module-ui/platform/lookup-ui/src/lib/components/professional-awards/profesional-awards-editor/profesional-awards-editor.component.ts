import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { IProfessionalAwards } from '@nutela/models/platform/lookup';
import { ProfessionalAwardsEditorService } from './professional-awards-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../../store';
import { ProcessingProfessionalAwards, SaveProfessionalAwards, UpdateProfessionalAwards, NotProcessingProfessionalAwards, isProcessingProfessionalAwards } from '../../../store';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-plf-hrf-profesional-awards-editor',
  templateUrl: './profesional-awards-editor.component.html',
  styleUrls: ['./profesional-awards-editor.component.scss']
})
export class ProfesionalAwardsEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IProfessionalAwards;

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
    public fs:  ProfessionalAwardsEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingProfessionalAwards));
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
        const recordId = this.data? this.data.proaward_id: 0;
        this.store.dispatch(new ProcessingProfessionalAwards());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveProfessionalAwards({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateProfessionalAwards({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingProfessionalAwards());
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
