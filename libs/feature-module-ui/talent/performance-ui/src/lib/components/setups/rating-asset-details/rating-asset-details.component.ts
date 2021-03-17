import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IRatingAssetDetail, IRatingAssetDefinition } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorRatingAssetDetail, showViewerRatingAssetDetail, getRatingAssetDetailData, LoadDataRatingAssetDetail, ShowEditorRatingAssetDetail, HideEditorRatingAssetDetail, DeleteDataRatingAssetDetail, ShowViewerRatingAssetDetail, LoadRatingTableRatingAssetDetail, ProcessingRatingAssetDetail, getRatingAssetDetailRatingTable, isProcessingRatingAssetDetail } from '../../../store/setups';
import { RatingAssetDetailsEditorComponent } from './rating-asset-details-editor/rating-asset-details-editor.component';
import { RatingAssetDetailsViewerComponent } from './rating-asset-details-viewer/rating-asset-details-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { RatingAssetDetailsService } from './rating-asset-details.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 

@Component({
  selector: 'x365-fm-talent-rating-asset-details',
  templateUrl: './rating-asset-details.component.html',
  styleUrls: ['./rating-asset-details.component.scss'],
  providers: [RatingAssetDetailsService],
})
export class RatingAssetDetailsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  ratingAssetDetailData$: Observable<IRatingAssetDetail[]>;
  ratingAssetDefinition$: Observable<IRatingAssetDefinition[]>;

  @ViewChild('editor') editor: RatingAssetDetailsEditorComponent;
  @ViewChild('viewer') viewer: RatingAssetDetailsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('ratingsDefinitionGridLookup') ratingsDefinitionGridLookup: DxLookupComponent;
  dropDownFilterValue: string;
  currRatingDefId: number = +this.route.snapshot.paramMap.get('id');


  constructor(private store: Store<IAppState>,  private location: Location, private route: ActivatedRoute, public service: RatingAssetDetailsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadRatingTableRatingAssetDetail());
    this.store.dispatch(new LoadDataRatingAssetDetail({ratingDefId: this.currRatingDefId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorRatingAssetDetail));
    this.showViewer$ = this.store.pipe(select(showViewerRatingAssetDetail));
    this.isProcessing$ = this.store.pipe(select(isProcessingRatingAssetDetail));
    this.ratingAssetDetailData$ = this.store.pipe(select(getRatingAssetDetailData));
    this.ratingAssetDefinition$ = this.store.pipe(select(getRatingAssetDetailRatingTable));
    this.ratingsDefinitionGridLookup.value = this.currRatingDefId;
  }

  getRowData$(rowId: number): Observable<IRatingAssetDetail> {
    return this.ratingAssetDetailData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  loadDetailsByDefinitionId() {
    if(this.ratingsDefinitionGridLookup.value){
      this.store.dispatch(new ProcessingRatingAssetDetail());
      this.store.dispatch(new LoadDataRatingAssetDetail({ratingDefId: this.ratingsDefinitionGridLookup.value}));
    }
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.ratingDefId = this.currRatingDefId;

    this.store.dispatch(new ShowEditorRatingAssetDetail());
  }

  onRefreshButtonClicked(){
    if(this.ratingsDefinitionGridLookup.value){
      this.store.dispatch(new LoadDataRatingAssetDetail({ratingDefId: this.ratingsDefinitionGridLookup.value}));
      this.store.dispatch(new ShowToast({title: null, message: `Rating Asset Detail Information is being refreshed.`, type: ToastTypes.INFO}));
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select a definition.`, type: ToastTypes.INFO}));
    }
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.ratingDefId = this.currRatingDefId;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorRatingAssetDetail());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerRatingAssetDetail());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataRatingAssetDetail({recordId: rowId, assetDefId: this.ratingsDefinitionGridLookup.value}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorRatingAssetDetail());
  }

  onCancelViewer() {

  }

  goBack() {
    this.location.back();
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
