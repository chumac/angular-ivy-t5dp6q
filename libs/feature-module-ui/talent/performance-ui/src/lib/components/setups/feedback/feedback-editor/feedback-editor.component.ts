import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IFeedbackSession, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingFeedbackSession, ProcessingFeedbackSession, SaveFeedbackSession, AddFeedbackSession, getPlanListFeedbackSession, LoadPlanListFeedbackSession } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';
import { FeedbackSessionEditorService } from './feedback-editor.service';


@Component({
  selector: 'x365-feedback-setup-editor-feedback-editor',
  templateUrl: './feedback-editor.component.html',
  styleUrls: ['./feedback-editor.component.scss'],
  providers: [FeedbackSessionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FeedbackEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFeedbackSession;
  @Input() public planId: number;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: FeedbackSessionEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFeedbackSession));
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
    this.fs.planId.setValue(this.planId);
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingFeedbackSession());
        this.store.dispatch(new SaveFeedbackSession({data: <IFeedbackSession>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingFeedbackSession());
        this.store.dispatch(new AddFeedbackSession({data: <IFeedbackSession>this.fs.value }));
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

