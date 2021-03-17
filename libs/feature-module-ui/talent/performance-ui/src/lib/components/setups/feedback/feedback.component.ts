import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedbackService } from './feedback.service';
import { FeedbackEditorComponent } from './feedback-editor/feedback-editor.component';
import { FeedbackViewerComponent } from './feedback-viewer/feedback-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { IFeedbackSession } from '@nutela/models/talent/performance';
import { showEditorFeedbackSession, showViewerFeedbackSession, isProcessingFeedbackSession, getFeedbackSessionData, ShowEditorFeedbackSession, ProcessingFeedbackSession, LoadDataFeedbackSession, ShowViewerFeedbackSession, DeleteDataFeedbackSession, HideEditorFeedbackSession, HideViewerFeedbackSession } from '../../../store';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IAppState } from '@nutela/store/app-state';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-feedback-setup-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [FeedbackService],
})
export class FeedbackComponent implements OnInit {
  paramId: string;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  feedbackSessionData$: Observable<IFeedbackSession[]>;

  dropDownFilterValue: string;
  
  @ViewChild('editor') editor: FeedbackEditorComponent;
  @ViewChild('viewer') viewer: FeedbackViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private route: ActivatedRoute, public service: FeedbackService, private store: Store<IAppState>, private dialogBoxService: DialogBoxService, private location: Location){ }

  ngOnInit() {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFeedbackSession({planId: +this.paramId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFeedbackSession));
    this.showViewer$ = this.store.pipe(select(showViewerFeedbackSession));
    this.isProcessing$ = this.store.pipe(select(isProcessingFeedbackSession));
    this.feedbackSessionData$ = this.store.pipe(select(getFeedbackSessionData));
  }

  getRowData$(rowId: number): Observable<IFeedbackSession> {
    return this.feedbackSessionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();
    this.editor.planId = +this.paramId;
    this.store.dispatch(new ShowEditorFeedbackSession());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataFeedbackSession({planId: +this.paramId}));
    this.store.dispatch(new ShowToast({title: null, message: `Feedback Session Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.planId = +this.paramId;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFeedbackSession());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerFeedbackSession());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFeedbackSession({recordId: rowId, planId: +this.paramId}));
        }
      });
  }

  onInitiateSessionIconClicked(val) {}

  onCancelEditor() {
    this.store.dispatch(new HideEditorFeedbackSession());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFeedbackSession());
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

  goBack(){
    this.location.back();
  }

}
