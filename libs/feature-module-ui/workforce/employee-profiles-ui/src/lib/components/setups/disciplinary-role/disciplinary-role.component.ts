import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ShowEditorDisciplinaryRoleSetup, HideEditorDisciplinaryRoleSetup, showEditorDisciplinaryRoleSetup, getDisciplinaryRoleSetupData, LoadDataDisciplinaryRoleSetup, isLoadingDisciplinaryRoleSetup, LoadingDisciplinaryRoleSetup, DeleteDataDisciplinaryRoleSetup } from '../../../store/setups/disciplinary-role';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { IEmployeesProfileState } from '../../../store';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { DisciplinaryRoleService } from './disciplinary-role.service';
import { IDisciplinaryRoleDefinition } from '@nutela/models/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { DefineRoleEditorComponent } from './define-role-editor/define-role-editor.component';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-workforce-disciplinary-role',
  templateUrl: './disciplinary-role.component.html',
  styleUrls: ['./disciplinary-role.component.scss']
})
export class DisciplinaryRoleComponent implements OnInit {

  @ViewChild('rolesDataGrid') rolesDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: DefineRoleEditorComponent;


  disciplinaryRoleData$: Observable<IDisciplinaryRoleDefinition[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: DisciplinaryRoleService, private store: Store<IEmployeesProfileState>,
  public utilService: UtilService, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Setup Disciplinary Roles'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDisciplinaryRoleSetup))
    this.isLoading$ = this.store.pipe(select(isLoadingDisciplinaryRoleSetup))
    this.disciplinaryRoleData$ = this.store.pipe(select(getDisciplinaryRoleSetupData))
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDisciplinaryRoleSetup())
    this.store.dispatch(new LoadDataDisciplinaryRoleSetup())
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

    if (this.rolesDataGrid) {
      this.service.search(this.rolesDataGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IDisciplinaryRoleDefinition> {
    return this.disciplinaryRoleData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorDisciplinaryRoleSetup());
  }

  onRefresh() {
    this.store.dispatch(new LoadDataDisciplinaryRoleSetup());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId).pipe(take(1))
        .subscribe(result => {
          this.store.dispatch(new DeleteDataDisciplinaryRoleSetup({recordId: rowId}));
        })
      }
    });
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorDisciplinaryRoleSetup());
      }
    );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDisciplinaryRoleSetup());
  }

}
