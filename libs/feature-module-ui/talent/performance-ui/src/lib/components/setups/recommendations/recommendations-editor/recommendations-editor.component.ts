import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { RecommendationsEditorService } from './recommendations-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPerformanceRecommendation, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingRecommendation, ProcessingRecommendation, SaveRecommendation, AddRecommendation } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-talent-recommendations-editor',
  templateUrl: './recommendations-editor.component.html',
  styleUrls: ['./recommendations-editor.component.scss'],
  providers: [RecommendationsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class RecommendationsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPerformanceRecommendation;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: RecommendationsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRecommendation));
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
        this.store.dispatch(new ProcessingRecommendation());
        this.store.dispatch(new SaveRecommendation({data: <IPerformanceRecommendation>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingRecommendation());
        this.store.dispatch(new AddRecommendation({data: <IPerformanceRecommendation>this.fs.value }));
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
