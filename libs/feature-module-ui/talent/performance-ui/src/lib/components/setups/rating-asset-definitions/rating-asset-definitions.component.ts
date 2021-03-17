import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IRatingAssetDefinition, IPage } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import * as constants from '../../../constants';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorRatingAssetDefinition, showViewerRatingAssetDefinition, getRatingAssetDefinitionData, LoadDataRatingAssetDefinition, ShowEditorRatingAssetDefinition, HideEditorRatingAssetDefinition, DeleteDataRatingAssetDefinition, ShowViewerRatingAssetDefinition, getRatingAssetDefinitionPageList, LoadPageDataRatingAssetDefinition, isLoadingRatingAssetDefinition, LoadingRatingAssetDefinition } from '../../../store/setups';
import { RatingAssetDefinitionsEditorComponent } from './rating-asset-definitions-editor/rating-asset-definitions-editor.component';
import { RatingAssetDefinitionsViewerComponent } from './rating-asset-definitions-viewer/rating-asset-definitions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { RatingAssetDefinitionsService } from './rating-asset-definitions.service';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { toastOptionsError } from '@nutela/core-services';
import { Router } from '@angular/router';

@Component({
  selector: 'x365-fm-talent-rating-asset-definitions',
  templateUrl: './rating-asset-definitions.component.html',
  styleUrls: ['./rating-asset-definitions.component.scss'],
  providers: [RatingAssetDefinitionsService],
})
export class RatingAssetDefinitionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  ratingAssetDefinitionData$: Observable<IRatingAssetDefinition[]>;
  pageListFromSource$: Observable<IPage[]>;
  pageListFromFilter$: Observable<IPage[]>;
  roleOptions = constants.roleOptions;
  assetOptions = constants.assetOptions;
  ASSET_TYPE_CONSTANTS = constants.ASSET_TYPE_CONSTANTS;
  ratingAssetOptions = constants.ratingsAssetOptions;


  @ViewChild('editor') editor: RatingAssetDefinitionsEditorComponent;
  @ViewChild('viewer') viewer: RatingAssetDefinitionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('assetTypeLookup') assetTypeLookup: DxLookupComponent;
	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, private router: Router, public service: RatingAssetDefinitionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorRatingAssetDefinition));
    this.showViewer$ = this.store.pipe(select(showViewerRatingAssetDefinition));
    this.isLoading$ = this.store.pipe(select(isLoadingRatingAssetDefinition));
    this.ratingAssetDefinitionData$ = this.store.pipe(select(getRatingAssetDefinitionData));
    this.pageListFromSource$ = this.store.pipe(select(getRatingAssetDefinitionPageList));
  }

  getRowData$(rowId: number): Observable<IRatingAssetDefinition> {
    return this.ratingAssetDefinitionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  loadDefinitions(data) {
    const value: number = data.value;
    this.store.dispatch(new LoadingRatingAssetDefinition());
    this.store.dispatch(new LoadDataRatingAssetDefinition({assetTypeId: value}));
  }

  onFilterButtonClicked(){
    
  }

  onAddButtonClicked(){
    this.editor.reset();

    if(this.assetTypeLookup.value){
      if(this.assetTypeLookup.value === constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage){
        this.editor.data = null;
        this.editor.pageTitle = this.assetTypeLookup.text;
        this.editor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage;
        this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage}));
        this.store.dispatch(new ShowEditorRatingAssetDefinition());  
      } else if(this.assetTypeLookup.value === constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingPage360){
        this.editor.data = null;
        this.editor.pageTitle = this.assetTypeLookup.text;
        this.editor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingPage360;
        this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingPage360}));
        this.store.dispatch(new ShowEditorRatingAssetDefinition());  
        } else if(this.assetTypeLookup.value === constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingFeedBackPage){
          this.editor.data = null;
          this.editor.pageTitle = this.assetTypeLookup.text;
          this.editor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingFeedBackPage;
          this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingFeedBackPage}));
          this.store.dispatch(new ShowEditorRatingAssetDefinition());  
          }
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a page type', options: toastOptionsError()}))
    }
  }

  _onAddButtonClicked(){
    this.editor.data = null;
    this.editor.pageType = this.ASSET_TYPE_CONSTANTS.ratingPage;
    this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: this.ASSET_TYPE_CONSTANTS.ratingPage}));
    this.store.dispatch(new ShowEditorRatingAssetDefinition());
  }

  onAdd360ButtonClicked(){
    this.editor.data = null;
    this.editor.pageType = this.ASSET_TYPE_CONSTANTS.RatingPage360;
    this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: this.ASSET_TYPE_CONSTANTS.RatingPage360}));
    this.store.dispatch(new ShowEditorRatingAssetDefinition());
  }

  onRefreshButtonClicked(){
    if(this.assetTypeLookup.value){
      this.store.dispatch(new LoadDataRatingAssetDefinition({assetTypeId: this.assetTypeLookup.value}));
      this.store.dispatch(new ShowToast({title: null, message: `Rating Asset Definition Information is being refreshed.`, type: ToastTypes.INFO}));  
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a page type', options: toastOptionsError()}))
    }
  }
  
  onEditIconClicked(rowId: number) {
    if(this.assetTypeLookup.value){
      this.editor.data = null;

      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {

            this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: this.assetTypeLookup.value}));
            this.editor.data = result;
            this.editor.pageType = this.assetTypeLookup.value;
            this.editor.pageTitle = this.assetTypeLookup.text;
            this.editor.reset();
            this.store.dispatch(new ShowEditorRatingAssetDefinition());
          }
        );    
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a page type', options: toastOptionsError()}))
    }
  }

  onViewIconClicked(rowId: number) {
    if(this.assetTypeLookup.value){

    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.viewer.pageTitle = this.assetTypeLookup.text;
          this.store.dispatch(new ShowViewerRatingAssetDefinition());
        }
      );
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a page type', options: toastOptionsError()}))
    }
  }

  onDeleteIconClicked(rowId: number) {
    if(this.assetTypeLookup.value){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataRatingAssetDefinition({recordId: rowId, assetTypeId: this.assetTypeLookup.value}));
        }
      });
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a page type', options: toastOptionsError()}))
    }
  }

  onDownloadIconClicked(rowId: number) {

  }

  onSetupAssetDetailsIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.ratingAssetDetailSetup}/${rowId}`]);
  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorRatingAssetDefinition());
  }

  onCancelViewer() {

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
