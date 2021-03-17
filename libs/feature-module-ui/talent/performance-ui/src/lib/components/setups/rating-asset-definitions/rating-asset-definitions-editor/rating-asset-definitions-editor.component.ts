import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { RatingAssetDefinitionsEditorService } from './rating-asset-definitions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IRatingAssetDefinition, IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingRatingAssetDefinition, ProcessingRatingAssetDefinition, SaveRatingAssetDefinition, AddRatingAssetDefinition, getRatingAssetDefinitionPageList, LoadPageDataRatingAssetDefinition } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-rating-asset-definitions-editor',
  templateUrl: './rating-asset-definitions-editor.component.html',
  styleUrls: ['./rating-asset-definitions-editor.component.scss'],
  providers: [RatingAssetDefinitionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RatingAssetDefinitionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRatingAssetDefinition;
  @Input() public pageType: number;
  @Input() public pageTitle: string;
  @Input() public guid: string;


  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  role360Options = constants.role360Options;
  numberFlagTypeOptions = constants.numberFlagTypeOptions;
  pageListFromSource$: Observable<IPage[]>;
  ASSET_TYPE_CONSTANTS = constants.ASSET_TYPE_CONSTANTS;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.fs.widgetGuid.setValue(this.guid);
    }
  }

  constructor(public utilService: UtilService, public fs: RatingAssetDefinitionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRatingAssetDefinition));
    this.pageListFromSource$ = this.store.pipe(select(getRatingAssetDefinitionPageList));
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
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingRatingAssetDefinition());
        this.store.dispatch(new SaveRatingAssetDefinition({data: <IRatingAssetDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode(), assetTypeId: this.pageType }));
      } else {
        this.store.dispatch(new ProcessingRatingAssetDefinition());
        this.store.dispatch(new AddRatingAssetDefinition({data: <IRatingAssetDefinition>this.fs.value, assetTypeId: this.pageType }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    // this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
