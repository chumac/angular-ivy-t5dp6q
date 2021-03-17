import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDisciplinaryActionTransaction } from '@nutela/models/workforce/employee-profiles';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { DisciplinaryActionsService } from './disciplinary-actions.service';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { IEmployeesProfileState } from '../../../../store';
import { Store, select } from '@ngrx/store';
import { ISelectOption } from 'dist/libs/models/core-data';
import { DisciplinaryActionEditorComponent } from './disciplinary-action-editor/disciplinary-action-editor.component';
import { isLoadingDisciplinaryAction, isProcessingDisciplinaryAction, showEditorDisciplinaryAction, getApprovedDataDisciplinaryAction, LoadingDisciplinaryAction, LoadApprovedDataDisciplinaryAction, LoadAwaitingApprovalDataDisciplinaryAction, LoadActionRoleSelectOptionDataDisciplinaryAction, LoadTakeActionSelectOptionDataDisciplinaryAction, getAwaitingApprovalDataDisciplinaryAction, getTakeActionSelectOptionDataDisciplinaryAction, getActionRolesSelectOptionDataDisciplinaryAction, ShowEditorDisciplinaryAction, HideEditorDisciplinaryAction, LoadRecommendationSelectOptionDataDisciplinaryAction, getRecommendationSelectOptionDataDisciplinaryAction, DeleteDataDisciplinaryAction, showViewerDisciplinaryAction, ShowViewerDisciplinaryAction, NotProcessingDisciplinaryAction, HideViewerDisciplinaryAction } from '../../../../store/hr-transactions/disciplinary-action';
import { map, take } from 'rxjs/operators';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { DisciplinaryActionViewerComponent } from './disciplinary-action-viewer';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
@Component({
  selector: 'x365-fm-workforce-disciplinary-actions',
  templateUrl: './disciplinary-actions.component.html',
  styleUrls: ['./disciplinary-actions.component.scss']
})
export class DisciplinaryActionsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  approvedDisciplinaryActionsData$: Observable<IDisciplinaryActionTransaction[]>
  awaitingDisciplinaryActionsData$: Observable<IDisciplinaryActionTransaction[]>
  activePersonnel$: Observable<ISelectOption[]>
  takeActionSelectOption$: Observable<ISelectOption[]>;
  actionRoleSelectOption$: Observable<ISelectOption[]>;
  xRecommendationSelectOption$: Observable<ISelectOption[]>;
  hrRecommendationSelectOption$: Observable<ISelectOption[]>;


  @ViewChild('awaitingDataGrid') awaitingDataGrid: IgxGridComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: DisciplinaryActionEditorComponent;
  @ViewChild('viewer') viewer: DisciplinaryActionViewerComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: DisciplinaryActionsService, private store: Store<IEmployeesProfileState>,
  public utilService: UtilService, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Disciplinary Actions Transaction'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingDisciplinaryAction));
    this.isProcessing$ = this.store.pipe(select(isProcessingDisciplinaryAction));
    this.showEditor$ = this.store.pipe(select(showEditorDisciplinaryAction));
    this.showViewer$ = this.store.pipe(select(showViewerDisciplinaryAction));
    this.approvedDisciplinaryActionsData$ = this.store.pipe(select(getApprovedDataDisciplinaryAction))
    this.awaitingDisciplinaryActionsData$ = this.store.pipe(select(getAwaitingApprovalDataDisciplinaryAction))
    this.takeActionSelectOption$ = this.store.pipe(select(getTakeActionSelectOptionDataDisciplinaryAction))
    this.actionRoleSelectOption$ = this.store.pipe(select(getActionRolesSelectOptionDataDisciplinaryAction))
    this.xRecommendationSelectOption$ = this.store.pipe(select(getRecommendationSelectOptionDataDisciplinaryAction))
    this.hrRecommendationSelectOption$ = this.store.pipe(select(getRecommendationSelectOptionDataDisciplinaryAction))
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDisciplinaryAction());
    this.store.dispatch(new LoadApprovedDataDisciplinaryAction());
    this.store.dispatch(new LoadAwaitingApprovalDataDisciplinaryAction());
    this.store.dispatch(new LoadTakeActionSelectOptionDataDisciplinaryAction());
    this.store.dispatch(new LoadActionRoleSelectOptionDataDisciplinaryAction());
    this.store.dispatch(new LoadRecommendationSelectOptionDataDisciplinaryAction());
    // this.store.dispatch(new LoadHrRecommendationSelectOptionDataDisciplinaryAction());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if(this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }


    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.approvedDataGrid) {
      this.service.search(this.approvedDataGrid, searchString, filterBy);
    } else if(this.awaitingDataGrid) {
      this.service.search(this.awaitingDataGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IDisciplinaryActionTransaction> {
    return this.approvedDisciplinaryActionsData$.pipe(
      map(d => d.filter(v => v.daction_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingRowData$(rowId: number): Observable<IDisciplinaryActionTransaction> {
    return this.awaitingDisciplinaryActionsData$.pipe(
      map(d => d.filter(v => v.daction_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorDisciplinaryAction());
  }

  onRefresh() {
    this.store.dispatch(new LoadApprovedDataDisciplinaryAction());
    this.store.dispatch(new LoadAwaitingApprovalDataDisciplinaryAction());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  onRemoveIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId).pipe(take(1))
        .subscribe(result => {
          this.store.dispatch(new DeleteDataDisciplinaryAction({dactionId: rowId}));
        })
      }
    });
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getAwaitingRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorDisciplinaryAction());
          console.log(this.editor.data);
        }
      );
  }

  onViewApprovedIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe(result => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerDisciplinaryAction());
          this.store.dispatch(new NotProcessingDisciplinaryAction());
        }
      );
  }

  onViewAwaitingIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingRowData$(rowId).pipe(take(1))
      .subscribe(result => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerDisciplinaryAction());
          this.store.dispatch(new NotProcessingDisciplinaryAction());
        }
      );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDisciplinaryAction());
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerDisciplinaryAction());
  }
}
