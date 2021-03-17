import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFeedbackRating, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorFeedbackRating, showViewerFeedbackRating, getFeedbackRatingData, LoadDataFeedbackRating, ShowEditorFeedbackRating, HideEditorFeedbackRating, DeleteDataFeedbackRating, ShowViewerFeedbackRating, isProcessingFeedbackRating, ProcessingFeedbackRating, HideViewerFeedbackRating } from '../../../store/setups';
import { FeedbackRatingsEditorComponent } from './feedback-ratings-editor/feedback-ratings-editor.component';
import { FeedbackRatingsViewerComponent } from './feedback-ratings-viewer/feedback-ratings-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { FeedbackRatingsService } from './feedback-ratings.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-feedback-ratings',
  templateUrl: './feedback-ratings.component.html',
  styleUrls: ['./feedback-ratings.component.scss'],
  providers: [FeedbackRatingsService],

})
export class FeedbackRatingsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  feedbackRatingData$: Observable<IFeedbackRating[]>;


  @ViewChild('editor') editor: FeedbackRatingsEditorComponent;
  @ViewChild('viewer') viewer: FeedbackRatingsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>,    public service: FeedbackRatingsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFeedbackRating());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFeedbackRating));
    this.showViewer$ = this.store.pipe(select(showViewerFeedbackRating));
    this.isProcessing$ = this.store.pipe(select(isProcessingFeedbackRating));
    this.feedbackRatingData$ = this.store.pipe(select(getFeedbackRatingData));
  }

  getRowData$(rowId: number): Observable<IFeedbackRating> {
    return this.feedbackRatingData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorFeedbackRating());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Feedback Ratings Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFeedbackRating());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerFeedbackRating());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFeedbackRating({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFeedbackRating());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFeedbackRating());
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
