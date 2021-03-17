import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IContractPageDefinition } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorContractPageDefinition, showViewerContractPageDefinition, getContractPageDefinitionData, LoadDataContractPageDefinition, ShowEditorContractPageDefinition, HideEditorContractPageDefinition, DeleteDataContractPageDefinition, ShowViewerContractPageDefinition } from '../../../store/setups';
import { ContractPageDefinitionsEditorComponent } from './contract-page-definitions-editor/contract-page-definitions-editor.component';
import { ContractPageDefinitionsViewerComponent } from './contract-page-definitions-viewer/contract-page-definitions-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ContractPageDefinitionsService } from './contract-page-definitions.service';

@Component({
  selector: 'x365-fm-talent-contract-page-definitions',
  templateUrl: './contract-page-definitions.component.html',
  styleUrls: ['./contract-page-definitions.component.scss'],
  providers: [ContractPageDefinitionsService],
})
export class ContractPageDefinitionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  contractPageDefinitionData$: Observable<IContractPageDefinition[]>;

  @ViewChild('editor') editor: ContractPageDefinitionsEditorComponent;
  @ViewChild('viewer') viewer: ContractPageDefinitionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, public service: ContractPageDefinitionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataContractPageDefinition());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorContractPageDefinition));
    this.showViewer$ = this.store.pipe(select(showViewerContractPageDefinition));
    this.contractPageDefinitionData$ = this.store.pipe(select(getContractPageDefinitionData));
  }

  getRowData$(rowId: number): Observable<IContractPageDefinition> {
    return this.contractPageDefinitionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorContractPageDefinition());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataContractPageDefinition());
    this.store.dispatch(new ShowToast({title: null, message: `Contract Page Definition Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorContractPageDefinition());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerContractPageDefinition());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataContractPageDefinition({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorContractPageDefinition());
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
