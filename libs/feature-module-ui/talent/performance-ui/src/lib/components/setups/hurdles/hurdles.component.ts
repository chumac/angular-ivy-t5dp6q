import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IHurdle } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorHurdle, showViewerHurdle, getHurdleData, LoadDataHurdle, ShowEditorHurdle, HideEditorHurdle, DeleteDataHurdle, ShowViewerHurdle } from '../../../store/setups';
import { HurdlesEditorComponent } from './hurdles-editor/hurdles-editor.component';
import { HurdlesViewerComponent } from './hurdles-viewer/hurdles-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { HurdlesService } from './hurdles.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-talent-hurdles',
  templateUrl: './hurdles.component.html',
  styleUrls: ['./hurdles.component.scss'],
  providers: [HurdlesService],
})
export class HurdlesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  hurdleData$: Observable<IHurdle[]>;

  @ViewChild('editor') editor: HurdlesEditorComponent;
  @ViewChild('viewer') viewer: HurdlesViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, public service: HurdlesService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHurdle());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHurdle));
    this.showViewer$ = this.store.pipe(select(showViewerHurdle));
    this.hurdleData$ = this.store.pipe(select(getHurdleData));
  }

  getRowData$(rowId: number): Observable<IHurdle> {
    return this.hurdleData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorHurdle());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataHurdle());
    this.store.dispatch(new ShowToast({title: null, message: `Hurdles Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorHurdle());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerHurdle());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataHurdle({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHurdle());
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
