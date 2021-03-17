import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { ILineManager, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorLineManager, showViewerLineManager, getLineManagerData, LoadDataLineManager, ShowEditorLineManager, HideEditorLineManager, DeleteDataLineManager, ShowViewerLineManager, LoadPlanListLineManager, getLineManagerPlanList, ProcessingGridLineManager, isProcessingGridLineManager } from '../../../store/setups';
import { LineManagersEditorComponent } from './line-managers-editor/line-managers-editor.component';
import { LineManagersViewerComponent } from './line-managers-viewer/line-managers-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LineManagersService } from './line-managers.service';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../../constants';


@Component({
  selector: 'x365-fm-talent-line-managers',
  templateUrl: './line-managers.component.html',
  styleUrls: ['./line-managers.component.scss'],
  providers: [LineManagersService],
})
export class LineManagersComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessingGrid$: Observable<boolean>;
  lineManagerData$: Observable<ILineManager[]>;
  planList$: Observable<IPlan[]>;

  @ViewChild('editor') editor: LineManagersEditorComponent;
  @ViewChild('viewer') viewer: LineManagersViewerComponent;
  @ViewChild('planLookUp') planLookUp: DxLookupComponent; 
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  lineManagerRoleOptions = constants.lineManagerRoleOptions;



  constructor(private store: Store<IAppState>, public service: LineManagersService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanListLineManager());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorLineManager));
    this.showViewer$ = this.store.pipe(select(showViewerLineManager));
    this.lineManagerData$ = this.store.pipe(select(getLineManagerData));
    this.planList$ = this.store.pipe(select(getLineManagerPlanList));
    this.isProcessingGrid$ = this.store.pipe(select(isProcessingGridLineManager));
  }

  getRowData$(rowId: number): Observable<ILineManager> {
    return this.lineManagerData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onFetchButtonClicked(){
    const planid = this.planLookUp.value;
    if(planid){
      this.store.dispatch(new ProcessingGridLineManager());
      this.store.dispatch(new LoadDataLineManager(planid));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorLineManager());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadPlanListLineManager());
    this.store.dispatch(new ShowToast({title: null, message: `Line Manager Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorLineManager());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerLineManager());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataLineManager({recordId: rowId, planId: this.planLookUp.value}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLineManager());
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
