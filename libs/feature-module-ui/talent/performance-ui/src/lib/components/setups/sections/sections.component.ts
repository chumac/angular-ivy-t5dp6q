import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { ISection, IPage } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import * as constants from '../../../constants';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorSection, showViewerSection, getSectionData, LoadDataSection, ShowEditorSection, HideEditorSection, DeleteDataSection, ShowViewerSection, getCustomPageListSection, isProcessingGridSection, ProcessingGridSection } from '../../../store/setups/section';
import { SectionsEditorComponent } from './sections-editor/sections-editor.component';
import { SectionsViewerComponent } from './sections-viewer/sections-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError } from '@nutela/core-services';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { SectionsService } from './sections.service';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-talent-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  providers: [SectionsService],
})
export class SectionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessingGrid$: Observable<boolean>;
  sectionData$: Observable<ISection[]>;
  uncompletedSectionData$: Observable<ISection[]>;
  completedSectionData$: Observable<ISection[]>;
  customPageList$: Observable<IPage[]>;

  
  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;
  WIDGET_CONSTANT = constants.WIDGET_OPT_CONSTANTS;

  @ViewChild('editor') editor: SectionsEditorComponent;
  @ViewChild('viewer') viewer: SectionsViewerComponent;
  @ViewChild('pagesLookup') pagesLookup: DxLookupComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, public service: SectionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSection));
    this.showViewer$ = this.store.pipe(select(showViewerSection));
    this.sectionData$ = this.store.pipe(select(getSectionData));
    this.customPageList$ = this.store.pipe(select(getCustomPageListSection));
    this.isProcessingGrid$ = this.store.pipe(select(isProcessingGridSection));
  }

  getCompletedRowData$(rowId: number): Observable<ISection> {
    return this.completedSectionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<ISection> {
    return this.sectionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onFilterButtonClicked(){
    if(this.pagesLookup.value){
      this.store.dispatch(new ProcessingGridSection());
      this.store.dispatch(new LoadDataSection({ pageID: this.pagesLookup.value, widgetID: this.WIDGET_CONSTANT.section}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a custom page', options: toastOptionsError()}))
    }
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorSection());
  }

  onRefreshedButtonClicked(){
    // this.store.dispatch(new LoadDataSection());
    this.store.dispatch(new ShowToast({title: null, message: `Sections Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorSection());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSection());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataSection({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorSection());
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
