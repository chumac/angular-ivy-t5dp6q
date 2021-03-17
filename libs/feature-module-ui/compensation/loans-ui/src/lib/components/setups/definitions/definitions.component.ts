import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoanDefinition } from '@nutela/models/compensation/loans';
import { DefinitionEditorComponent } from './definition-editor/definition-editor.component';
import { IgxGridComponent } from 'igniteui-angular';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { LoadDataDefinitions, showLoanDefinitionEditor, isProcessingDefinitions, getDataLoanDefinitions, ShowEditorDefinition, DeleteDataDefinition, HideEditorDefinition, LoadDataPayrollProfileListDefinition, isLoadingDefinitions, LoadingDataDefinitions, LoadDataDeductionRulesDefinition, LoadDataGroupNamesDefinition, LoadDataAmortizationRulesDefinition, LoadDataDeductionAllowancesDefinition } from '../../../store/definitions';
import { DefinitionsService } from './definitions.service';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { ILoanState } from '../../../store';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-loans-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss'],
  providers: [DefinitionsService],
})
export class DefinitionsComponent implements OnInit {

  dropDownFilterValue: string;


  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  definitionsData$: Observable<ILoanDefinition[]>;


  @ViewChild('definitionEditor') definitionEditor: DefinitionEditorComponent;
  @ViewChild("definitionsDataGrid") definitionsDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string, private utilService: UtilService,
  private titleService: Title, public service: DefinitionsService, private store: Store<ILoanState>, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Loan Definition'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingDefinitions))
    this.isProcessing$ = this.store.pipe(select(isProcessingDefinitions));
    this.showEditor$ = this.store.pipe(select(showLoanDefinitionEditor));
    this.definitionsData$ = this.store.pipe(select(getDataLoanDefinitions));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataDefinitions())
    this.store.dispatch(new LoadDataDefinitions());
    this.store.dispatch(new LoadDataDeductionRulesDefinition());
    this.store.dispatch(new LoadDataGroupNamesDefinition());
    this.store.dispatch(new LoadDataAmortizationRulesDefinition());
  }


  getRowData$(rowId: number): Observable<ILoanDefinition> {
    return this.definitionsData$.pipe(
      map(d => d.filter(v => v.loan_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.store.dispatch(new ShowEditorDefinition())
  }

  onRefresh() {
    this.store.dispatch(new LoadDataDefinitions());
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
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

    if (this.definitionsDataGrid) {
      this.service.search(
        this.definitionsDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onEditIconClicked(rowId: number) {
    this.definitionEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if (result.deduct_from_allowance) {
          const payrollProfileId = result.PayrollProfileInfo.payroll_profile_id
          this.definitionEditor.deductFromAllowance = true
          this.store.dispatch(new LoadDataDeductionAllowancesDefinition({ payrollProfileId }))
        } else {
          this.definitionEditor.deductFromAllowance = false;
        }
        result.charge_interest ? this.definitionEditor.showInterestSettings = true : this.definitionEditor.showInterestSettings = false;
        result.groupitem ? this.definitionEditor.groupItem = true : this.definitionEditor.groupItem = false;
        this.definitionEditor.data = result;
          this.definitionEditor.reset();
          this.store.dispatch(new ShowEditorDefinition());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataDefinition({recordId: rowId}));
      }
    });
  }
  onCancelEditor() {
    this.store.dispatch(new HideEditorDefinition());
  }

  unsubscribe() {

  }

  ngOnDestroy() {
    this.unsubscribe();

  }
}
