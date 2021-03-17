import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { ISubscriptionDefinition } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorSubscriptionDefinition, showViewerSubscriptionDefinition, getSubscriptionDefinitionData, LoadDataSubscriptionDefinition, ShowEditorSubscriptionDefinition, HideEditorSubscriptionDefinition, DeleteDataSubscriptionDefinition, ShowViewerSubscriptionDefinition } from '../../../store/setups';
import { SubscriptionDefinitionsEditorComponent } from './subscription-definitions-editor/subscription-definitions-editor.component';
import { SubscriptionDefinitionsViewerComponent } from './subscription-definitions-viewer/subscription-definitions-viewer.component';
import * as constants from '../../../constants';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { SubscriptionDefinitionsService } from './subscription-definitions.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-talent-subscription-definitions',
  templateUrl: './subscription-definitions.component.html',
  styleUrls: ['./subscription-definitions.component.scss'],
  providers: [SubscriptionDefinitionsService],
})
export class SubscriptionDefinitionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  subscriptionDefinitionData$: Observable<ISubscriptionDefinition[]>;
  subscriptionOptions = constants.subscriptionOptions;

  @ViewChild('editor') editor: SubscriptionDefinitionsEditorComponent;
  @ViewChild('viewer') viewer: SubscriptionDefinitionsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, public service: SubscriptionDefinitionsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataSubscriptionDefinition());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSubscriptionDefinition));
    this.showViewer$ = this.store.pipe(select(showViewerSubscriptionDefinition));
    this.subscriptionDefinitionData$ = this.store.pipe(select(getSubscriptionDefinitionData));
  }

  getRowData$(rowId: number): Observable<ISubscriptionDefinition> {
    return this.subscriptionDefinitionData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorSubscriptionDefinition());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataSubscriptionDefinition());
    this.store.dispatch(new ShowToast({title: null, message: `Subscription Definition Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorSubscriptionDefinition());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSubscriptionDefinition());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataSubscriptionDefinition({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorSubscriptionDefinition());
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
