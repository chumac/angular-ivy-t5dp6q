import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IControl, IPage, ISection } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import * as constants from '../../../constants';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorControl, showViewerControl, getControlData, LoadDataControl, ShowEditorControl, HideEditorControl, DeleteDataControl, ShowViewerControl, getCustomPageListControl, isProcessingGridControl, ProcessingGridControl, LoadSectionListControl, getSectionListControl } from '../../../store/setups/control';
import { ControlsEditorComponent } from './controls-editor/controls-editor.component';
import { ControlsViewerComponent } from './controls-viewer/controls-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ControlsService } from './controls.service';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-talent-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  providers: [ControlsService],
})
export class ControlsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessingGrid$: Observable<boolean>;
  controlData$: Observable<IControl[]>;
  uncompletedControlData$: Observable<IControl[]>;
  completedControlData$: Observable<IControl[]>;
  customPageList$: Observable<IPage[]>;
  sectionList$: Observable<ISection[]>;

  
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;
  WIDGET_CONSTANT = constants.WIDGET_OPT_CONSTANTS;

  @ViewChild('editor') editor: ControlsEditorComponent;
  @ViewChild('viewer') viewer: ControlsViewerComponent;
  @ViewChild('pagesLookup') pagesLookup: DxLookupComponent;
  @ViewChild('sectionsLookup') sectionsLookup: DxLookupComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: ControlsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorControl));
    this.showViewer$ = this.store.pipe(select(showViewerControl));
    this.controlData$ = this.store.pipe(select(getControlData));
    this.customPageList$ = this.store.pipe(select(getCustomPageListControl));
    this.sectionList$ = this.store.pipe(select(getSectionListControl));
    this.isProcessingGrid$ = this.store.pipe(select(isProcessingGridControl));
  }

  getCompletedRowData$(rowId: number): Observable<IControl> {
    return this.completedControlData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<IControl> {
    return this.controlData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onPageSelected(data){
    // this.sectionList$ = null;
    this.store.dispatch(new LoadSectionListControl({ pageID: data.value, widgetID: this.WIDGET_CONSTANT.section}));
  }


  onFilterButtonClicked(){
    if(this.pagesLookup.value && this.sectionsLookup.value){
      this.store.dispatch(new ProcessingGridControl());
      this.store.dispatch(new LoadDataControl({ pageID: this.sectionsLookup.value}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select custom page and section', options: toastOptionsError()}))
    }
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorControl());
  }

  onRefreshButtonClicked(){
    // this.store.dispatch(new LoadDataControl());
    this.store.dispatch(new ShowToast({title: null, message: `Control Information is being refreshed.`, type: ToastTypes.INFO})); 
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorControl());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerControl());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataControl({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorControl());
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
