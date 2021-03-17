import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ChecklistService } from './checklist.service';
import { Store, select } from '@ngrx/store';
import { IExitState } from '../../../store/root';
import { UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { ChecklistEditorComponent } from './checklist-editor/checklist-editor.component';
import { showEditorChecklistSetup, ShowEditorChecklistSetup, HideEditorChecklistSetup, ArchiveChecklistSetup, LoadDataChecklistSetup, getChecklistData, getValidationRoleData, LoadValidationRoleChecklistSetup, getWorkflowSelectOption, getPositionSelectOption, getRoleSelectOption, LoadWorkflowSelectOption, LoadRoleSelectOption, LoadPositionSelectOption, isLoadingChecklistSetup, LoadingChecklistSetup, HideViewerChecklistSetup, showViewerChecklistSetup, ShowViewerChecklistSetup } from '../../../store/setup/checklist';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnelHR } from 'libs/store/modules/foundation/src/lib/select-option-data';
import { take, map } from 'rxjs/operators';
import { IChecklistItem } from '../../../interfaces';
import { getWorkDefinitionApprovedData, getPositionData } from 'libs/feature-module-ui/platform/hr-foundations-ui/src/lib/store/workflow-definition';
import { IWorkDefinition } from '@nutela/models/foundation';
import {  getSecurityRoles } from '@nutela/store/modules/workforce/employee-profiles';
import { ISecurityRole } from '@nutela/models/common';
import { IAppState } from '@nutela/store/app-state';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ChecklistSetupViewerComponent } from './checklist-setup-viewer/checklist-setup-viewer.component';
// import { getWorkflowDefinition, LoadWorkflowDefinition } from '../../../store/resignation';

@Component({
  selector: 'x365-fm-workforce-exit-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  checklistData$: Observable<IChecklistItem[]>;
  workflowSelectOption$: Observable<IWorkDefinition[]>;
  validationRoleSelectOption$: Observable<any[]>;
  securityRoleSelectOption$: Observable<ISecurityRole[]>;
  positionSelectOption$: Observable<ISelectOption[]>;
  activePersonnel$: Observable<ISelectOption[]>;

  @ViewChild('editor') editor: ChecklistEditorComponent;
  @ViewChild('viewer') viewer: ChecklistSetupViewerComponent;
  @ViewChild('checklistDataGrid') checklistDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ChecklistService, private store: Store<IAppState>,
    public utilService: UtilService, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Setup Checklist'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.select(pipe(showEditorChecklistSetup));
    this.showViewer$ = this.store.select(pipe(showViewerChecklistSetup));
    this.isLoading$ = this.store.select(pipe(isLoadingChecklistSetup));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.workflowSelectOption$ = this.store.pipe(select(getWorkflowSelectOption));
    this.checklistData$ = this.store.pipe(select(getChecklistData));
    this.validationRoleSelectOption$ = this.store.pipe(select(getValidationRoleData));
    this.positionSelectOption$ = this.store.pipe(select(getPositionSelectOption));
    this.securityRoleSelectOption$ = this.store.pipe(select(getRoleSelectOption));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingChecklistSetup())
    this.store.dispatch(new LoadDataChecklistSetup());
    this.store.dispatch(new LoadValidationRoleChecklistSetup());
    this.store.dispatch(new LoadPositionSelectOption());
    this.store.dispatch(new LoadRoleSelectOption());
    this.store.dispatch(new LoadWorkflowSelectOption());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.checklistDataGrid) {
      this.service.search(
        this.checklistDataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IChecklistItem> {
    return this.checklistData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewProcessIconClicked(rowId: number) {

  }


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerChecklistSetup());
      }
      );
  }

  onAdd() {
    this.store.dispatch(new ShowEditorChecklistSetup());
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `This action will delete this checklist item. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ArchiveChecklistSetup({recordId: rowId}))
      }
    })
  }
  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }));
  }

  onEditIconClicked(rowId: number) {
    // this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1)).subscribe(item => {
      this.editor.data = item;
      this.store.dispatch(new ShowEditorChecklistSetup());
    })
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorChecklistSetup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerChecklistSetup());
  }

  onCloseAllButtonClicked() {

  }
}
