import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPage, IRatingAssetDefinition, ISubscriptionDefinition } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import * as constants from '../../../constants';
import { DialogBoxService, DialogBoxCommandTypes, SwitchComponent } from '@nutela/shared/ui';
import { showEditorPage, showViewerPage, getPageData, LoadDataPage, ShowEditorPage, HideEditorPage, DeleteDataPage, ShowViewerPage, getUncompletedPageData, getCompletedPageData, LoadCompletedDataPage, LoadUncompletedDataPage, getPageType, LoadPageType } from '../../../store/setups/page';
import { PagesEditorComponent } from './pages-editor/pages-editor.component';
import { PagesViewerComponent } from './pages-viewer/pages-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { PagesService } from './pages.service';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { HideEditorContractPageDefinition, HideEditorRatingAssetDefinition, HideEditorSubscriptionDefinition, LoadPageDataRatingAssetDefinition, showEditorContractPageDefinition, ShowEditorContractPageDefinition, ShowEditorRatingAssetDefinition, showEditorRatingAssetDefinition, showEditorSubscriptionDefinition, ShowEditorSubscriptionDefinition, ShowViewerContractPageDefinition, showViewerContractPageDefinition, ShowViewerRatingAssetDefinition, showViewerRatingAssetDefinition, showViewerSubscriptionDefinition, ShowViewerSubscriptionDefinition } from '../../../store/setups';
import { RatingAssetDefinitionsEditorComponent } from '../rating-asset-definitions/rating-asset-definitions-editor/rating-asset-definitions-editor.component';
import { RatingAssetDefinitionsViewerComponent } from '../rating-asset-definitions/rating-asset-definitions-viewer/rating-asset-definitions-viewer.component';
import { ContractPageDefinitionsEditorComponent } from '../contract-page-definitions/contract-page-definitions-editor/contract-page-definitions-editor.component';
import { ContractPageDefinitionsViewerComponent } from '../contract-page-definitions/contract-page-definitions-viewer/contract-page-definitions-viewer.component';
import { SubscriptionDefinitionsEditorComponent } from '../subscription-definitions/subscription-definitions-editor/subscription-definitions-editor.component';
import { SubscriptionDefinitionsViewerComponent } from '../subscription-definitions/subscription-definitions-viewer/subscription-definitions-viewer.component';
import { ApiService } from '@nutela/core-services';
import { Router } from '@angular/router';

@Component({
  selector: 'x365-fm-talent-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [PagesService],
})
export class PagesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  showRatingsDefEditor$: Observable<boolean>;
  showRatingsDefViewer$: Observable<boolean>;

  showContractDefEditor$: Observable<boolean>;
  showContractDefViewer$: Observable<boolean>;

  showSubscriptionDefEditor$: Observable<boolean>;
  showSubscriptionDefViewer$: Observable<boolean>;

  pageData$: Observable<IPage[]>;
  uncompletedPageData$: Observable<IPage[]>;
  completedPageData$: Observable<IPage[]>;

  
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;

  @ViewChild('editor') editor: PagesEditorComponent;
  @ViewChild('viewer') viewer: PagesViewerComponent;
  @ViewChild('ratingsDefEditor') ratingsDefEditor: RatingAssetDefinitionsEditorComponent;
  @ViewChild('ratingsDefViewer') ratingsDefViewer: RatingAssetDefinitionsViewerComponent;
  @ViewChild('contractDefEditor') contractDefEditor: ContractPageDefinitionsEditorComponent;
  @ViewChild('contractDefViewer') contractDefViewer: ContractPageDefinitionsViewerComponent;
  @ViewChild('subscriptionDefEditor') subscriptionDefEditor: SubscriptionDefinitionsEditorComponent;
  @ViewChild('subscriptionDefViewer') subscriptionDefViewer: SubscriptionDefinitionsViewerComponent;
  @ViewChild('uncompleted') uncompleted: IgxGridComponent;
  @ViewChild('completed') completed: IgxGridComponent;
  @ViewChild('switch') switch: SwitchComponent;


  dropDownFilterValue: string;
  showOverlay: boolean = false;


  constructor(private store: Store<IAppState>, private router: Router, private apiService: ApiService, public service: PagesService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCompletedDataPage());
    this.store.dispatch(new LoadUncompletedDataPage());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPage));
    this.showViewer$ = this.store.pipe(select(showViewerPage));
    this.showRatingsDefEditor$ = this.store.pipe(select(showEditorRatingAssetDefinition));
    this.showRatingsDefViewer$ = this.store.pipe(select(showViewerRatingAssetDefinition));
    this.showContractDefEditor$ = this.store.pipe(select(showEditorContractPageDefinition));
    this.showContractDefViewer$ = this.store.pipe(select(showViewerContractPageDefinition));
    this.showSubscriptionDefEditor$ = this.store.pipe(select(showEditorSubscriptionDefinition));
    this.showSubscriptionDefViewer$ = this.store.pipe(select(showViewerSubscriptionDefinition));

    this.uncompletedPageData$ = this.store.pipe(select(getUncompletedPageData));
    this.completedPageData$ = this.store.pipe(select(getCompletedPageData));
  }

  getCompletedRowData$(rowId: number): Observable<IPage> {
    return this.completedPageData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getUncompletedRowData$(rowId: number): Observable<IPage> {
    return this.uncompletedPageData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorPage());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadCompletedDataPage());
    this.store.dispatch(new LoadUncompletedDataPage());
    this.store.dispatch(new ShowToast({title: null, message: `Pages Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onUncompletedEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getUncompletedRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPage());
        }
      );
  }

  onUncompletedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getUncompletedRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPage());
        }
      );
  }

  onUncompletedDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPage({recordId: rowId}));
        }
      });
  }

  onCompletedEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getCompletedRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPage());
        }
      );
  }

  onCompletedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getCompletedRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPage());
        }
      );
  }

  onCompletedDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPage({recordId: rowId}));
        }
      });
  }

  onConfigureIconClicked(selectedRow: IPage) {
    const assetType = selectedRow.asset_type;
    switch (assetType) {
      case constants.ASSET_TYPE_CONSTANTS.competencyAssessmentPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.contractPage:
        this.contractDefEditor.data = null;
        this.contractDefEditor.guid = selectedRow.widget_guid;
        this.store.dispatch(new ShowEditorContractPageDefinition());
        break;
      
      case constants.ASSET_TYPE_CONSTANTS.customPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.kpiPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.subscriptionPage:
        this.subscriptionDefEditor.data = null;
        this.subscriptionDefEditor.pageId = selectedRow.id;
        this.store.dispatch(new ShowEditorSubscriptionDefinition());
        break;

      default:
        this.ratingsDefEditor.data = null;
        this.ratingsDefEditor.pageTitle = selectedRow.title;
        this.ratingsDefEditor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage;
        this.ratingsDefEditor.guid = selectedRow.widget_guid;
        this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage}));
        this.store.dispatch(new ShowEditorRatingAssetDefinition()); 
        break;
    }

  }

  onViewConfigurationIconClicked(selectedRow: IPage) {
    this.ratingsDefViewer.data = null;
    const assetType = selectedRow.asset_type;
    switch (assetType) {

      case constants.ASSET_TYPE_CONSTANTS.competencyAssessmentPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.contractPage:
        this.apiService.read(`/api/measure/performance/form-builder/hr/contract-page-def/getByPageId/${selectedRow.id}`).subscribe((data: IApiResult)=>{
          
          this.contractDefEditor.data = <any>(data && data.Results[0]); 
          this.contractDefEditor.guid = selectedRow.widget_guid;
          this.contractDefEditor.reset();
          this.store.dispatch(new ShowEditorContractPageDefinition());
        });
        break;

      case constants.ASSET_TYPE_CONSTANTS.customPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.kpiPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.subscriptionPage:
        this.apiService.read(`/api/measure/performance/form-builder/hr/subscription-definition/getByPageId/${selectedRow.id}`).subscribe((data: IApiResult)=>{
          
          this.subscriptionDefEditor.data = <ISubscriptionDefinition>(data && data.Results[0]); 
          this.subscriptionDefEditor.pageId = selectedRow.id;
          this.subscriptionDefEditor.reset();
          this.store.dispatch(new ShowEditorSubscriptionDefinition());
        });
        break;

      default:
        this.apiService.read(`/api/measure/performance/form-builder/hr/rating-definition/getByPageId/${selectedRow.id}`).subscribe((data: IApiResult)=>{
          // this.ratingsDefViewer.data = <IRatingAssetDefinition>(data && data.Results[0]); 


          // this.ratingsDefEditor.data = <IRatingAssetDefinition>(data && data.Results[0]); 
          // this.ratingsDefEditor.pageTitle = selectedRow.title;
          // this.ratingsDefEditor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage;
          // this.ratingsDefEditor.guid = selectedRow.widget_guid;
          // this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage}));
          this.store.dispatch(new LoadPageDataRatingAssetDefinition({pageType: constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage}));
          this.ratingsDefEditor.data = <IRatingAssetDefinition>(data && data.Results[0]); 
          this.ratingsDefEditor.pageType = constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage;
          this.ratingsDefEditor.pageTitle = selectedRow.title;
          this.ratingsDefEditor.reset();
          this.store.dispatch(new ShowEditorRatingAssetDefinition());
        });
       

        break;
    }
  }

  onPageDetailsIconClicked(selectedRow: IPage) {
    const assetType = selectedRow.asset_type;
    switch (assetType) {

      case constants.ASSET_TYPE_CONSTANTS.competencyAssessmentPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.contractPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.customPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.kpiPage:

        break;

      case constants.ASSET_TYPE_CONSTANTS.subscriptionPage:

        break;

      default:
        this.showOverlay = true;
        this.apiService.read(`/api/measure/performance/form-builder/hr/rating-definition/getByPageId/${selectedRow.id}`).subscribe((data: IApiResult)=>{
          let result = <IRatingAssetDefinition>(data && data.Results[0]); 
          this.router.navigate([`${STANDARD_ROUTES.ratingAssetDetailSetup}/${result.id}`]);
        });
        break;
    }
  }

  isRatingPage(assetId) {
    switch (assetId) {
      case constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingFeedBackPage:
        return true;
      case constants.RATINGS_ASSET_TYPE_CONSTANTS.RatingPage360:
        return true;      
      case constants.RATINGS_ASSET_TYPE_CONSTANTS.ratingPage:
        return true;
      default:
        return false;
    }
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPage());
  }

  onCancelRatingsDefEditor() {
    this.store.dispatch(new HideEditorRatingAssetDefinition());
  }

  onCancelContractDefEditor() {
    this.store.dispatch(new HideEditorContractPageDefinition());
  }

  onCancelSubscriptionDefEditor() {
    this.store.dispatch(new HideEditorSubscriptionDefinition());
  }

  filter(term: string, filterValue: string) {
    if(!this.switch.value) {
      if (this.uncompleted) {
        if (filterValue) {
          this.uncompleted.clearFilter();
          this.uncompleted.filteringLogic = FilteringLogic.Or;
          this.uncompleted.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.uncompleted.clearFilter();
          this.uncompleted.filteringLogic = FilteringLogic.Or;
          this.uncompleted.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }

    if(this.switch.value) {
      if (this.completed) {
        if (filterValue) {
          this.completed.clearFilter();
          this.completed.filteringLogic = FilteringLogic.Or;
          this.completed.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.completed.clearFilter();
          this.completed.filteringLogic = FilteringLogic.Or;
          this.completed.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
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
