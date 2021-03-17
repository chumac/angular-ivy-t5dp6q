import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IDesignationDefinition } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { DesignationService } from './designation.service';
import { Title } from '@angular/platform-browser';
import { IEmployeesProfileState } from '../../../store';
import { UtilService } from '@nutela/core-services';
import { showEditorDesignationSetup, getDesignationSetupData, LoadDataDesignationSetup, ShowEditorDesignationSetup, HideEditorDesignationSetup, LoadDataPositionSelectOptionDesignationSetup, isLoadingDesignationSetup, getPositionSelectOptionDesignationSetup, getAwaitingDesignationSetupData, DeleteDataDesignationSetup } from '../../../store/setups/designation';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { DefineDesignationEditorComponent } from './define-designation-editor/define-designation-editor.component';

@Component({
  selector: 'x365-fm-workforce-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  @ViewChild('actionDataGrid') actionDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: DefineDesignationEditorComponent;

  approvedDesignationData$: Observable<IDesignationDefinition[]>;
  awaitingApprovalDesignationData$: Observable<IDesignationDefinition[]>;
  positionSelectOption$: Observable<ISelectOption[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: DesignationService, private store: Store<IEmployeesProfileState>,
  public utilService: UtilService, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Setup Designation'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDesignationSetup));
    this.isLoading$ = this.store.pipe(select(isLoadingDesignationSetup));
    this.positionSelectOption$ = this.store.pipe(select(getPositionSelectOptionDesignationSetup))
    this.awaitingApprovalDesignationData$ = this.store.pipe(select(getAwaitingDesignationSetupData))
    this.approvedDesignationData$ = this.store.pipe(select(getDesignationSetupData))
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataDesignationSetup());
    this.store.dispatch(new LoadDataPositionSelectOptionDesignationSetup());
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

    if (this.actionDataGrid) {
      this.service.search(this.actionDataGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IDesignationDefinition> {
    return this.approvedDesignationData$.pipe(
      map(d => d.filter(v => v.title_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingRowData$(rowId: number): Observable<IDesignationDefinition> {
    return this.awaitingApprovalDesignationData$.pipe(
      map(d => d.filter(v => v.title_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorDesignationSetup());
  }

  onRefresh() {
    this.store.dispatch(new LoadDataDesignationSetup());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  onViewApprovedIconClicked(rowId: number) {

  }

  onViewAwaitingIconClicked(rowId: number) {

  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorDesignationSetup());
      }
    );
  }

  onRemoveIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId).pipe(take(1))
        .subscribe(result => {
          this.store.dispatch(new DeleteDataDesignationSetup({recordId: rowId}));
        })
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDesignationSetup());
  }


}
