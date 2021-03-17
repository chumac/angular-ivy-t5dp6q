import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IEcosystem360, IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorEcosystem360, showViewerEcosystem360, getEcosystem360Data, LoadDataEcosystem360, ShowEditorEcosystem360, HideEditorEcosystem360, DeleteDataEcosystem360, ShowViewerEcosystem360, LoadPlanListEcosystem360, getEcosystem360PlanList, ProcessingGridEcosystem360, isProcessingGridEcosystem360, getEcosystem360EmployeeList, LoadEmployeeListEcosystem360 } from '../../../store/setups';
import { Ecosystem360sEditorComponent } from './ecosystem360s-editor/ecosystem360s-editor.component';
import { Ecosystem360sViewerComponent } from './ecosystem360s-viewer/ecosystem360s-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import * as constants from '../../../constants';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Ecosystem360sService } from './ecosystem360s.service';
import { ToastTypes } from '@nutela/shared/app-global';



@Component({
  selector: 'x365-fm-talent-ecosystem360s',
  templateUrl: './ecosystem360s.component.html',
  styleUrls: ['./ecosystem360s.component.scss'],
  providers: [Ecosystem360sService],
})
export class Ecosystem360sComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessingGrid$: Observable<boolean>;
  ecosystem360Data$: Observable<IEcosystem360[]>;
  planList$: Observable<IPlan[]>;
  employeesList$: Observable<IPersonal[]>;
  role360Options = constants.role360Options;


  @ViewChild('editor') editor: Ecosystem360sEditorComponent;
  @ViewChild('viewer') viewer: Ecosystem360sViewerComponent;
  @ViewChild('planLookUp') planLookUp: DxLookupComponent; 
  @ViewChild('employeesLookUp') employeesLookUp: DxLookupComponent; 
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, public service: Ecosystem360sService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanListEcosystem360());
    this.store.dispatch(new LoadEmployeeListEcosystem360());

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEcosystem360));
    this.showViewer$ = this.store.pipe(select(showViewerEcosystem360));
    this.ecosystem360Data$ = this.store.pipe(select(getEcosystem360Data));
    this.planList$ = this.store.pipe(select(getEcosystem360PlanList));
    this.employeesList$ = this.store.pipe(select(getEcosystem360EmployeeList));
    this.isProcessingGrid$ = this.store.pipe(select(isProcessingGridEcosystem360));
  }

  getRowData$(rowId: number): Observable<IEcosystem360> {
    return this.ecosystem360Data$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onFetchButtonClicked(){
    const planid = this.planLookUp.value;
    const employeeid = this.employeesLookUp.value;
    if(planid && employeeid){
      this.store.dispatch(new ProcessingGridEcosystem360());
      this.store.dispatch(new LoadDataEcosystem360({planId: planid, employeeId: employeeid}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select plan and employee', options: toastOptionsError()}))
    }
  }

  onFileChange(){
    
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorEcosystem360());
  }

  onRefreshButtonClicked(){
    const planid = this.planLookUp.value;
    const employeeid = this.employeesLookUp.value;
    if(planid && employeeid){
      this.store.dispatch(new LoadDataEcosystem360({planId: planid, employeeId: employeeid}));
      this.store.dispatch(new ShowToast({title: null, message: `360 Ecosystem Information is being refreshed.`, type: ToastTypes.INFO}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select plan and employee', options: toastOptionsError()}))
    }
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorEcosystem360());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerEcosystem360());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataEcosystem360({recordId: rowId, planId: this.planLookUp.value, employeeId: this.employeesLookUp.value}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorEcosystem360());
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
