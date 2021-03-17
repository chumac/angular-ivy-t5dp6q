import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { DisciplinaryActionService } from './disciplinary-action.service';
import { IEmployeesProfileState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IDisciplinaryActionDefinition } from '@nutela/models/workforce/employee-profiles';
import { ShowEditorDisciplinaryActionSetup, showEditorDisciplinaryActionSetup, HideEditorDisciplinaryActionSetup, getDisciplinaryActionSetupData, LoadDataDisciplinaryActionSetup, DeleteDataDisciplinaryActionSetup } from '../../../store/setups/disciplinary-action';
import { UtilService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { DefineActionEditorComponent } from './define-action-editor/define-action-editor.component';

@Component({
  selector: 'x365-fm-workforce-disciplinary-action',
  templateUrl: './disciplinary-action.component.html',
  styleUrls: ['./disciplinary-action.component.scss']
})
export class DisciplinaryActionComponent implements OnInit {


  @ViewChild('actionDataGrid') actionDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: DefineActionEditorComponent;


  disciplinaryActionData$: Observable<IDisciplinaryActionDefinition[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private titleService: Title, public service: DisciplinaryActionService, private store: Store<IEmployeesProfileState>,
  public utilService: UtilService, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Setup Disciplinary Actions'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDisciplinaryActionSetup))
    this.disciplinaryActionData$ = this.store.pipe(select(getDisciplinaryActionSetupData))
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataDisciplinaryActionSetup())
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

  getRowData$(rowId: number): Observable<IDisciplinaryActionDefinition> {
    return this.disciplinaryActionData$.pipe(
      map(d => d.filter(v => v.daction_type_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorDisciplinaryActionSetup());
  }

  onRefresh() {
    this.store.dispatch(new LoadDataDisciplinaryActionSetup())
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.getRowData$(rowId).pipe(take(1))
        .subscribe(result => {
          this.store.dispatch(new DeleteDataDisciplinaryActionSetup({recordId: rowId}));
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
        this.store.dispatch(new ShowEditorDisciplinaryActionSetup());
      }
    );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDisciplinaryActionSetup());
  }

}
