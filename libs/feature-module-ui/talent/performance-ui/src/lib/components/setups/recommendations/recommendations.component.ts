import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPerformanceRecommendation, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorRecommendation, showViewerRecommendation, getRecommendationData, LoadDataRecommendation, ShowEditorRecommendation, HideEditorRecommendation, DeleteDataRecommendation, ShowViewerRecommendation, isProcessingRecommendation, ProcessingRecommendation, HideViewerRecommendation, ActivateRecommendation, DeActivateRecommendation } from '../../../store/setups';
import { RecommendationsEditorComponent } from './recommendations-editor/recommendations-editor.component';
import { RecommendationsViewerComponent } from './recommendations-viewer/recommendations-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { RecommendationsService } from './recommendations.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';


@Component({
  selector: 'x365-fm-talent-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  providers: [RecommendationsService],

})
export class RecommendationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  recommendationData$: Observable<IPerformanceRecommendation[]>;


  @ViewChild('editor') editor: RecommendationsEditorComponent;
  @ViewChild('viewer') viewer: RecommendationsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>,    public service: RecommendationsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataRecommendation());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorRecommendation));
    this.showViewer$ = this.store.pipe(select(showViewerRecommendation));
    this.isProcessing$ = this.store.pipe(select(isProcessingRecommendation));
    this.recommendationData$ = this.store.pipe(select(getRecommendationData));
  }

  getRowData$(rowId: number): Observable<IPerformanceRecommendation> {
    return this.recommendationData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorRecommendation());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Recommendations Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorRecommendation());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerRecommendation());
        }
      );
  }

  onActivateIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to activate this recommendation?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ActivateRecommendation({recordId: rowId}));
        }
      });
  }

  onDeActivateIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to de-activate this recommendation?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeActivateRecommendation({recordId: rowId}));
        }
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataRecommendation({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorRecommendation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerRecommendation());
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
