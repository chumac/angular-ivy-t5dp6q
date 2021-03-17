import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorCustomProcessMap, showViewerCustomProcessMap, getCustomProcessMapData, LoadDataCustomProcessMap, ShowEditorCustomProcessMap, HideEditorCustomProcessMap, DeleteDataCustomProcessMap, ShowViewerCustomProcessMap, isProcessingCustomProcessMap, ProcessingCustomProcessMap, HideViewerCustomProcessMap } from '../../../store/processes/custom-process-map';
import { CustomProcessMapsEditorComponent } from './custom-process-maps-editor/custom-process-maps-editor.component';
import { CustomProcessMapsViewerComponent } from './custom-process-maps-viewer/custom-process-maps-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { CustomProcessMapsService } from './custom-process-maps.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ICustomProcessMap, IProcessFormDefinition } from '@nutela/models/workforce/employee-profiles';
import { LoadWorkFlowListCustomForm } from '../../../store/processes/custom-form';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { getProcessFormDefinitionData } from '../../../store/processes/process-form-definition';
import { FormRendererComponent } from '@nutela/shared/ui';


@Component({
  selector: 'x365-fm-workforce-custom-process-maps',
  templateUrl: './custom-process-maps.component.html',
  styleUrls: ['./custom-process-maps.component.scss'],
  providers: [CustomProcessMapsService],

})
export class CustomProcessMapsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  customProcessMapData$: Observable<ICustomProcessMap[]>;
  approvedData$: Observable<ICustomProcessMap[]>;
  awaitingApprovalData$: Observable<ICustomProcessMap[]>;
  processDefnitionDataById$: Observable<IProcessFormDefinition>;


  @ViewChild('editor') editor: CustomProcessMapsEditorComponent;
  @ViewChild('viewer') viewer: CustomProcessMapsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('renderer') renderer: FormRendererComponent;

  dropDownFilterValue: string;
  queryParamId: number;
  showRenderer: boolean;

  constructor(private location: Location, private route: ActivatedRoute, private store: Store<IAppState>, public service: CustomProcessMapsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.retrieveProcessDefinition();
    this.storeDispatches();
    this.storeSelects();
  }

  retrieveProcessDefinition() {
    this.queryParamId = +this.route.snapshot.paramMap.get('id');
    this.processDefnitionDataById$ = this.store.pipe(select(getProcessFormDefinitionData)).pipe(
      map(d => d.filter(v => v.id === this.queryParamId)),
      map(e => e.shift()));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCustomProcessMap({processId: this.queryParamId}));
    this.store.dispatch(new LoadWorkFlowListCustomForm());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCustomProcessMap));
    this.showViewer$ = this.store.pipe(select(showViewerCustomProcessMap));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomProcessMap));
    this.customProcessMapData$ = this.store.pipe(select(getCustomProcessMapData));  
  }

  getRowData$(rowId: number): Observable<ICustomProcessMap> {
    return this.customProcessMapData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    if(this.queryParamId){
      this.editor.data = null;
      this.editor.reset();
  
      this.store.dispatch(new ShowEditorCustomProcessMap());  
    }
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Custom Process form information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCustomProcessMap());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomProcessMap());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataCustomProcessMap({recordId: rowId, processId: this.queryParamId}));
        }
      });
  }

  onShowRendererIconClicked(rowId: number) {
    this.viewer.data = null;
    this.renderer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.renderer.title = result.section_title;
          this.renderer.subTitle = '...';
          this.renderer.data = result.form_json;
          this.renderer.readonly = true;
          this.showRenderer = true;
        }
      );
  }

  onRendererSubmit($event) {
    
  }

  onCancelRenderer() {
    this.showRenderer = false;
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCustomProcessMap());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCustomProcessMap());
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
