import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { FormTemplateDetailsEditorService } from './form-template-details-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IFormTemplateDetail, IFormTemplate, IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingFormTemplateDetail, ProcessingFormTemplateDetail, SaveFormTemplateDetail, AddFormTemplateDetail, getFormTemplateDetailTemplateList, LoadTemplateListFormTemplateDetail, LoadPageListFormTemplateDetail, getFormTemplateDetailPageList } from '../../../../store';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-form-template-details-editor',
  templateUrl: './form-template-details-editor.component.html',
  styleUrls: ['./form-template-details-editor.component.scss'],
  providers: [FormTemplateDetailsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FormTemplateDetailsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFormTemplateDetail;
  @Input() public formTemplateId: number;
  @ViewChild('pagesLookUp') pagesLookUp: DxLookupComponent; 

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  formTemplateList$: Observable<IFormTemplate[]>;
  pageList$: Observable<IPage[]>;
  assetOptions = constants.assetOptions;
  rankOptions = constants.rankOptions;
  permOptions = constants.permOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.fs.reviewFormId.setValue(this.formTemplateId);
    }
  }

  constructor(public utilService: UtilService, public fs: FormTemplateDetailsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeDispatches() {
    this.store.dispatch(new LoadTemplateListFormTemplateDetail());
    this.store.dispatch(new LoadPageListFormTemplateDetail());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFormTemplateDetail));
    this.formTemplateList$ = this.store.pipe(select(getFormTemplateDetailTemplateList));
    this.pageList$ = this.store.pipe(select(getFormTemplateDetailPageList));
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
    const selectedRow = <IPage>this.pagesLookUp.selectedItem;
    if(selectedRow){
      this.fs.assetId.setValue(selectedRow.id);
      this.fs.assetType.setValue(selectedRow.asset_type);
    }

    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingFormTemplateDetail());
        this.store.dispatch(new SaveFormTemplateDetail({data: <IFormTemplateDetail>this.fs.value, recordId: recordId, editMode: this.inEditMode(), formTemplateId: this.formTemplateId }));
      } else {
        this.store.dispatch(new ProcessingFormTemplateDetail());
        this.store.dispatch(new AddFormTemplateDetail({data: <IFormTemplateDetail>this.fs.value, formTemplateId: this.formTemplateId }));
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
