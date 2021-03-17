import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IEducationalInstitution } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { EducationalInstitutionEditorService } from './educational-institutions-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ILookupState, getNationEducationalInstitution, getStateEducationalInstitution } from '../../../store';
import { ProcessingEducationalInstitution, SaveEducationalInstitution, UpdateEducationalInstitution, NotProcessingEducationalInstitution, isProcessingEducationalInstitution } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import * as constants from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-plf-hrf-educational-institutions-editor',
  templateUrl: './educational-institutions-editor.component.html',
  styleUrls: ['./educational-institutions-editor.component.scss']
})
export class EducationalInstitutionsEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public countryName:String;
  @Input() public switchValue:boolean;


  @Input() public data: IEducationalInstitution;

  @Output() cancelClick = new EventEmitter<any>();


  public country = [];
  public state = [];


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
      if(this.countryName && this.switchValue){
      this.fs.patch({
        institution_type: 1,
        country:this.countryName
      });
      }
      else{
        this.fs.patch({
          institution_type: 0,
        });
      }
  }

  isProcessing$: Observable<boolean>;
  public nationData$: Observable<ISelectOption[]>;
  public stateData$: Observable<ISelectOption[]>;
  public type =constants.Educational_Institution;

  constructor(
    public fs: EducationalInstitutionEditorService,
    public utilService: UtilService,
    private store: Store<ILookupState>,
    private cd: ChangeDetectorRef) {
      super();
    }

    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingEducationalInstitution));
      this.nationData$= this.store.pipe(select(getNationEducationalInstitution));
      this.stateData$= this.store.pipe(select(getStateEducationalInstitution));
      this.nationData$.subscribe(result=>{
      this.country=this.utilService.transformToSelectDataList(result,"description","description");
    });
    this.stateData$.subscribe(result=>{
      this.state=this.utilService.transformToSelectDataList(result,"description","description");
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
        const recordId = this.data? this.data.institution_id: 0;
       this.store.dispatch(new ProcessingEducationalInstitution());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveEducationalInstitution({data: this.fs.value, countryName:this.countryName}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateEducationalInstitution({data: this.fs.value, recordId: recordId, countryName:this.countryName}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingEducationalInstitution());
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
