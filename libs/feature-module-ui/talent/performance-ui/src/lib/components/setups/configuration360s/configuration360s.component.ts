import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IConfiguration360 } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorConfiguration360, showViewerConfiguration360, getConfiguration360Data, LoadDataConfiguration360, ShowEditorConfiguration360, HideEditorConfiguration360, DeleteDataConfiguration360, ShowViewerConfiguration360 } from '../../../store/setups';
import { Configuration360sEditorComponent } from './configuration360s-editor/configuration360s-editor.component';
import { Configuration360sViewerComponent } from './configuration360s-viewer/configuration360s-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { Configuration360Service } from './configuration360s.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-talent-configuration360s',
  templateUrl: './configuration360s.component.html',
  styleUrls: ['./configuration360s.component.scss'],
  providers: [Configuration360Service]
})
export class Configuration360sComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  configuration360Data$: Observable<IConfiguration360[]>;

  @ViewChild('editor') editor: Configuration360sEditorComponent;
  @ViewChild('viewer') viewer: Configuration360sViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: Configuration360Service, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataConfiguration360());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorConfiguration360));
    this.showViewer$ = this.store.pipe(select(showViewerConfiguration360));
    this.configuration360Data$ = this.store.pipe(select(getConfiguration360Data));
  }

  getRowData$(rowId: number): Observable<IConfiguration360> {
    return this.configuration360Data$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorConfiguration360());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataConfiguration360());
    this.store.dispatch(new ShowToast({title: null, message: `360 Configuration Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result; 
          this.editor.eligibiltyRule = result.eligibility_rule;
          this.editor.reset();
          this.store.dispatch(new ShowEditorConfiguration360());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerConfiguration360());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataConfiguration360({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorConfiguration360());
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
