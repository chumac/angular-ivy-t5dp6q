import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import {
  IgxGridComponent,
} from 'igniteui-angular';
import { Observable, Subject } from 'rxjs';
import { IFormula } from '@nutela/models/compensation/payroll';
import { FormulaEditorComponent } from './formula-editor/formula-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadFormulaData, LoadingFormula, getFormula, isLoadingFormula, showEditorFormula, ShowEditorFormula, HideEditorFormula, DeleteDataFormula, getFilteredFormula, LoadFilteredFormula, hasFormulaAdminRole, NotLoadingFormula } from '../../../../store/dependencies/formula';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { take, map } from 'rxjs/operators';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { FormulaeService } from './formulae.service';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { ISelectOption } from '@nutela/models/core-data';
import { getPayrollProfileSelectOption, LoadPayrollProfileSelectOption } from '../../../../store/dependencies/profile';


@Component({
  selector: 'x365-fm-payrl-formulae',
  templateUrl: './formulae.component.html',
  styleUrls: ['./formulae.component.scss'],
  providers: [FormulaeService]
})
export class FormulaeComponent implements OnInit {
  formulaData$: Observable<IFormula[]>;
  filteredFormulaData$: Observable<IFormula[]>;
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  payrollProfileSelectOption$: Observable<ISelectOption[]>;
  isFormulaAdmin$: Observable<boolean>;
  selectedProfile: number = 0;

  @ViewChild('editor') editor: FormulaEditorComponent;
  @ViewChild('formulaGrid') formulaGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: FormulaeService, private store: Store<IRootState>,
    public utilService: UtilService, private dialogService: DialogService,
    private cd: ChangeDetectorRef) {
    titleService.setTitle(
      `${'Formulae Management'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.loadFilteredData();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFormula())
    this.store.dispatch(new LoadFormulaData());
    this.store.dispatch(new LoadPayrollProfileSelectOption({ useNoneOption: true }))
  }

  storeSelects() {
    this.formulaData$ = this.store.pipe(select(getFormula));
    this.filteredFormulaData$ = this.store.pipe(select(getFilteredFormula));
    this.isLoading$ = this.store.pipe(select(isLoadingFormula));
    this.showEditor$ = this.store.pipe(select(showEditorFormula));
    this.payrollProfileSelectOption$ = this.store.pipe(select(getPayrollProfileSelectOption))
    this.isFormulaAdmin$ = this.store.pipe(select(hasFormulaAdminRole))
  }

  loadFilteredData() {
    this.formulaData$.subscribe(val => {
      this.store.dispatch(new NotLoadingFormula())
      this.store.dispatch(new LoadFilteredFormula({ payrollProfileId: this.selectedProfile }));
    })
  }

  isPermitted(): boolean {
    let status = false;
    this.isFormulaAdmin$.pipe(take(1)).subscribe(val => {
      if (val === false && (this.selectedProfile === 0 || this.selectedProfile === null)) {
        status = false;
      } else if (val === false && this.selectedProfile) {
        status = true;
      } else {
        status = true;
      };
    });
    return status;
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

    if (this.formulaGrid) {
      this.service.search(
        this.formulaGrid,
        searchString,
        filterBy
      );
    }
  }


  getRowData$(rowId: number): Observable<IFormula> {
    return this.filteredFormulaData$.pipe(
      map(d => d.filter(v => v.formula_id === rowId)),
      map(e => e.shift()))
  }

  // hasPayrollProfile(rowId): boolean {
  //   let status = false;
  //   this.getRowData$(rowId).pipe(take(1)).subscribe(val => {
  //     if (val.payroll_profile_id) {
  //       this.allowEdit = true;
  //       status = true;
  //     }
  //   })
  //   return status;
  // }

  onProfileSelected(event: any) {
    console.log(event)
    this.store.dispatch(new LoadFilteredFormula({ payrollProfileId: +event }));
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.editor.setDynamicFieldsEdit(!!result.link_to_profile, result.payroll_profile_id)
        this.store.dispatch(new ShowEditorFormula());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete this item?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingFormula())
        this.store.dispatch(new DeleteDataFormula({recordId: rowId, payrollProfile: this.selectedProfile}));
      }
    });
  }

  onAdd() {
    this.editor.data = null;
    if (!this.isPermitted()) {
      this.store.dispatch(new ShowToast({ title: null, message: `You don't have access to create formula without selecting a profile.`, type: ToastTypes.INFO }));
      return;
    }
    this.editor.reset();
    this.store.dispatch(new ShowEditorFormula());
  }

  onRefresh() {
    this.store.dispatch(new LoadFormulaData());
    this.store.dispatch(new LoadFilteredFormula({ payrollProfileId: 0 }));
    this.selectedProfile = 0;
    this.filteredFormulaData$.pipe(take(1)).subscribe(val => {
        console.log(val)
    })
    this.store.dispatch(new ShowToast({ title: null, message: ` Formula data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFormula());
  }
}

