import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorValidLocation, showViewerValidLocation, getValidLocationData, LoadDataValidLocation, ShowEditorValidLocation, HideEditorValidLocation, DeleteDataValidLocation, ShowViewerValidLocation, isProcessingValidLocation, ProcessingValidLocation, HideViewerValidLocation } from '../../../store/setups/valid-location';
import { ValidLocationsEditorComponent } from './valid-locations-editor/valid-locations-editor.component';
import { ValidLocationsViewerComponent } from './valid-locations-viewer/valid-locations-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ValidLocationsService } from './valid-locations.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IValidLocation } from '@nutela/models/workforce/leave';


@Component({
  selector: 'x365-fm-workforce-absence-valid-locations',
  templateUrl: './valid-locations.component.html',
  styleUrls: ['./valid-locations.component.scss'],
  providers: [ValidLocationsService],

})
export class ValidLocationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  validLocationData$: Observable<IValidLocation[]>;
  approvedData$: Observable<IValidLocation[]>;
  awaitingApprovalData$: Observable<IValidLocation[]>;


  @ViewChild('editor') editor: ValidLocationsEditorComponent;
  @ViewChild('viewer') viewer: ValidLocationsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: ValidLocationsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataValidLocation());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorValidLocation));
    this.showViewer$ = this.store.pipe(select(showViewerValidLocation));
    this.isProcessing$ = this.store.pipe(select(isProcessingValidLocation));
    this.validLocationData$ = this.store.pipe(select(getValidLocationData));  
  }

  getRowData$(rowId: number): Observable<IValidLocation> {
    return this.validLocationData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorValidLocation());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Location information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorValidLocation());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerValidLocation());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataValidLocation({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorValidLocation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerValidLocation());
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
