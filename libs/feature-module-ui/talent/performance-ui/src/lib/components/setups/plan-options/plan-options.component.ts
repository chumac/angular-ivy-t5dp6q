import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPlanOption, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorPlanOption, showViewerPlanOption, getPlanOptionData, LoadDataPlanOption, ShowEditorPlanOption, HideEditorPlanOption, DeleteDataPlanOption, ShowViewerPlanOption, getPlanListPlanOption, isProcessingPlanOption, ProcessingPlanOption, getPlanData } from '../../../store/setups';
import { PlanOptionsEditorComponent } from './plan-options-editor/plan-options-editor.component';
import { PlanOptionsViewerComponent } from './plan-options-viewer/plan-options-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { PlanOptionsService } from './plan-options.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'x365-fm-talent-plan-options',
  templateUrl: './plan-options.component.html',
  styleUrls: ['./plan-options.component.scss'],
  providers: [PlanOptionsService],

})
export class PlanOptionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  planOptionData$: Observable<IPlanOption[]>;
  plansList$: Observable<IPlan[]>;


  @ViewChild('editor') editor: PlanOptionsEditorComponent;
  @ViewChild('viewer') viewer: PlanOptionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('plansLookUp') plansLookUp: DxLookupComponent;

  dropDownFilterValue: string;
  currPlanId: number = +this.route.snapshot.paramMap.get('id');

  constructor(private store: Store<IAppState>, private location: Location, private route: ActivatedRoute, public service: PlanOptionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPlanOption({planId: this.currPlanId}));
    this.plansLookUp.value = this.currPlanId;
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPlanOption));
    this.showViewer$ = this.store.pipe(select(showViewerPlanOption));
    this.isProcessing$ = this.store.pipe(select(isProcessingPlanOption));
    this.plansList$ = this.store.pipe(select(getPlanData));
    this.planOptionData$ = this.store.pipe(select(getPlanOptionData));
  }

  getRowData$(rowId: number): Observable<IPlanOption> {
    return this.planOptionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorPlanOption());
  }

  onLoadPlanOptionsButtonClicked(){
    if(this.plansLookUp.value){
      this.store.dispatch(new ProcessingPlanOption());
      this.store.dispatch(new LoadDataPlanOption({planId: this.plansLookUp.value}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', type: ToastTypes.INFO}))
    }
  }

  onRefreshButtonClicked(){
    this.onLoadPlanOptionsButtonClicked();
    this.store.dispatch(new ShowToast({title: null, message: `Plan Options Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPlanOption());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPlanOption());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPlanOption({recordId: rowId, planId: this.plansLookUp.value}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPlanOption());
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
