import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { FeedbackQuestionsEditorService } from './feedback-questions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IFeedbackQuestion, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingFeedbackQuestion, ProcessingFeedbackQuestion, SaveFeedbackQuestion, AddFeedbackQuestion, getPlanListFeedbackQuestion, LoadPlanListFeedbackQuestion } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';
import { feedbackRoleOptions } from '../../../../constants';

@Component({
  selector: 'x365-fm-talent-feedback-questions-editor',
  templateUrl: './feedback-questions-editor.component.html',
  styleUrls: ['./feedback-questions-editor.component.scss'],
  providers: [FeedbackQuestionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FeedbackQuestionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFeedbackQuestion;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<ISelectOption[]>;
  roleTypes = feedbackRoleOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: FeedbackQuestionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFeedbackQuestion));
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
        this.store.dispatch(new ProcessingFeedbackQuestion());
        this.store.dispatch(new SaveFeedbackQuestion({data: <IFeedbackQuestion>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingFeedbackQuestion());
        this.store.dispatch(new AddFeedbackQuestion({data: <IFeedbackQuestion>this.fs.value }));
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
