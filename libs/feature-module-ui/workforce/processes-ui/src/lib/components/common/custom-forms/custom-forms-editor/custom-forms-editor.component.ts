import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { CustomFormsEditorService } from './custom-forms-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '../../../../constants';
import { isProcessingCustomForm, ProcessingCustomForm, SaveCustomForm, AddCustomForm, getCustomFormTypeList, getCustomFormAreaList, getCustomFormScopeList, getCustomFormEligibilityList, getCustomFormWorkFlowList } from '../../../../store/processes/custom-form';
import { ICustomForm, ICustomFormType, ICustomFormArea, ICustomFormScope, ICustomFormEligibility } from '@nutela/models/workforce/employee-profiles';
import { IWorkDefinition } from '@nutela/models/foundation';
import { IProcessesState } from '../../../../store/root/processes.state';


@Component({
  selector: 'x365-fm-talent-custom-forms-editor',
  templateUrl: './custom-forms-editor.component.html',
  styleUrls: ['./custom-forms-editor.component.scss'],
  providers: [CustomFormsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomFormsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICustomForm;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  typeList$: Observable<ICustomFormType[]>;
  areaList$: Observable<ICustomFormArea[]>;
  scopeList$: Observable<ICustomFormScope[]>;
  eligibilityList$: Observable<ICustomFormEligibility[]>;
  workFlowList$: Observable<IWorkDefinition[]>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: CustomFormsEditorService, private store: Store<IProcessesState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomForm));
    this.typeList$ = this.store.pipe(select(getCustomFormTypeList));
    this.areaList$ = this.store.pipe(select(getCustomFormAreaList));
    this.scopeList$ = this.store.pipe(select(getCustomFormScopeList));
    this.eligibilityList$ = this.store.pipe(select(getCustomFormEligibilityList));
    this.workFlowList$ = this.store.pipe(select(getCustomFormWorkFlowList));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      this.fs.isPublished.setValue(this.fs.isPublished.value?this.fs.isPublished.value:false);
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingCustomForm());
        this.store.dispatch(new SaveCustomForm({data: <ICustomForm>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.fs.formJson.setValue('[]');
        this.fs.hasDocument.setValue(false);
        this.store.dispatch(new ProcessingCustomForm());
        this.store.dispatch(new AddCustomForm({data: <ICustomForm>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
