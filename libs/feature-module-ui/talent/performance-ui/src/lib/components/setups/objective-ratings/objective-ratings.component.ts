import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveRating } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorObjectiveRating, showViewerObjectiveRating, getObjectiveRatingData, LoadDataObjectiveRating, ShowEditorObjectiveRating, HideEditorObjectiveRating, DeleteDataObjectiveRating, ShowViewerObjectiveRating } from '../../../store/setups';
import { ObjectiveRatingsEditorComponent } from './objective-ratings-editor/objective-ratings-editor.component';
import { ObjectiveRatingsViewerComponent } from './objective-ratings-viewer/objective-ratings-viewer.component';
import { ObjectiveRatingsService } from './objective-ratings.service';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-objective-ratings',
  templateUrl: './objective-ratings.component.html',
  styleUrls: ['./objective-ratings.component.scss'],
  providers: [ObjectiveRatingsService],

})
export class ObjectiveRatingsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  objectiveRatingData$: Observable<IObjectiveRating[]>;

  @ViewChild('editor') editor: ObjectiveRatingsEditorComponent;
  @ViewChild('viewer') viewer: ObjectiveRatingsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, public service: ObjectiveRatingsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataObjectiveRating());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorObjectiveRating));
    this.showViewer$ = this.store.pipe(select(showViewerObjectiveRating));
    this.objectiveRatingData$ = this.store.pipe(select(getObjectiveRatingData));
  }

  getRowData$(rowId: number): Observable<IObjectiveRating> {
    return this.objectiveRatingData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorObjectiveRating());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataObjectiveRating());
    this.store.dispatch(new ShowToast({title: null, message: `Objective Ratings Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorObjectiveRating());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerObjectiveRating());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataObjectiveRating({recordId: rowId}));
        }
      });
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


  onDownloadIconClicked(rowId: number) {}

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorObjectiveRating());
  }

  onCancelViewer() {}

  unsubscribe() {}

  ngOnDestroy() {
    this.unsubscribe();
  }


}
