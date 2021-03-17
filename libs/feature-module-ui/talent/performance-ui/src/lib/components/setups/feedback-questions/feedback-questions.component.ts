import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFeedbackQuestion, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorFeedbackQuestion, showViewerFeedbackQuestion, getFeedbackQuestionData, LoadDataFeedbackQuestion, ShowEditorFeedbackQuestion, HideEditorFeedbackQuestion, DeleteDataFeedbackQuestion, ShowViewerFeedbackQuestion, getPlanListFeedbackQuestion, isProcessingFeedbackQuestion, ProcessingFeedbackQuestion, HideViewerFeedbackQuestion } from '../../../store/setups';
import { FeedbackQuestionsEditorComponent } from './feedback-questions-editor/feedback-questions-editor.component';
import { FeedbackQuestionsViewerComponent } from './feedback-questions-viewer/feedback-questions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { FeedbackQuestionsService } from './feedback-questions.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { feedbackRoleOptions } from '../../../constants';
import { RoleTypes } from '../../../enumerations';


@Component({
  selector: 'x365-fm-talent-feedback-questions',
  templateUrl: './feedback-questions.component.html',
  styleUrls: ['./feedback-questions.component.scss'],
  providers: [FeedbackQuestionsService],

})
export class FeedbackQuestionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  feedbackQuestionData$: Observable<IFeedbackQuestion[]>;
  gridData$: Observable<IFeedbackQuestion[]>;
  plansList$: Observable<ISelectOption[]>;
  roleTypes = feedbackRoleOptions;
  ROLES = RoleTypes;

  @ViewChild('editor') editor: FeedbackQuestionsEditorComponent;
  @ViewChild('viewer') viewer: FeedbackQuestionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('feedbackQuestionLookUp') feedbackQuestionLookUp: DxLookupComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: FeedbackQuestionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.loadFeedbackQuestions(this.ROLES.EMPLOYEE);
    this.feedbackQuestionLookUp.value = this.ROLES.EMPLOYEE;
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFeedbackQuestion({roleId: null}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFeedbackQuestion));
    this.showViewer$ = this.store.pipe(select(showViewerFeedbackQuestion));
    this.isProcessing$ = this.store.pipe(select(isProcessingFeedbackQuestion));
    this.feedbackQuestionData$ = this.store.pipe(select(getFeedbackQuestionData));
  }

  getRowData$(rowId: number): Observable<IFeedbackQuestion> {
    return this.feedbackQuestionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorFeedbackQuestion());
  }

  loadFeedbackQuestions(roleId: number){
    this.gridData$ = this.getDataByRole$(roleId);
  }

  getDataByRole$(roleId: number): Observable<IFeedbackQuestion[]> {
    return this.feedbackQuestionData$.pipe(
      map(c => c.filter(val => val.question_role === roleId))
      );
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataFeedbackQuestion({roleId: null}));
    this.store.dispatch(new ShowToast({title: null, message: `Feedack Question Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFeedbackQuestion());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerFeedbackQuestion());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFeedbackQuestion({recordId: rowId, planId: this.feedbackQuestionLookUp.value}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFeedbackQuestion());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFeedbackQuestion());
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
