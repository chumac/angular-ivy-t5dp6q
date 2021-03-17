import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { RatingAssetDetailsEditorService } from './rating-asset-details-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IRatingAssetDetail, IRatingAssetDefinition } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingRatingAssetDetail, ProcessingRatingAssetDetail, SaveRatingAssetDetail, AddRatingAssetDetail, getRatingAssetDetailRatingTable } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-rating-asset-details-editor',
  templateUrl: './rating-asset-details-editor.component.html',
  styleUrls: ['./rating-asset-details-editor.component.scss'],
  providers: [RatingAssetDetailsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RatingAssetDetailsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IRatingAssetDetail;
  @Input() public ratingDefId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  ratingTableData$: Observable<IRatingAssetDefinition[]>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.fs.ratingTableId.setValue(this.ratingDefId);
    }
  }

  constructor(public utilService: UtilService, public fs: RatingAssetDetailsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRatingAssetDetail));
    this.ratingTableData$ = this.store.pipe(select(getRatingAssetDetailRatingTable));
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
        this.store.dispatch(new ProcessingRatingAssetDetail());
        this.store.dispatch(new SaveRatingAssetDetail({data: <IRatingAssetDetail>this.fs.value, recordId: recordId, editMode: this.inEditMode(), ratingDefId: this.ratingDefId }));
      } else {
        this.store.dispatch(new ProcessingRatingAssetDetail());
        this.store.dispatch(new AddRatingAssetDetail({data: <IRatingAssetDetail>this.fs.value, ratingDefId: this.ratingDefId }));
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
