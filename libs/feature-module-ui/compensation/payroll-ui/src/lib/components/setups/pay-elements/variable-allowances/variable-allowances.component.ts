import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IVariableAllowance } from '@nutela/models/compensation/payroll';
import { VariableAllowanceEditorComponent } from './variable-allowance-editor/variable-allowance-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadVariableAllowanceData, LoadingVariableAllowance, getVariableAllowance, isLoadingVariableAllowance, showEditorVariableAllowance, ShowEditorVariableAllowance, HideEditorVariableAllowance, DeleteVariableAllowance, ShowRateEditorVariableAllowance, HideRateEditorVariableAllowance, showRateEditorVariableAllowance, ShowViewerVariableAllowance, showViewerVariableAllowance, HideViewerVariableAllowance } from '../../../../store/pay-elements/variable-allowance';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { map, take } from 'rxjs/operators';
import { VariableAllowanceRateEditorComponent } from './variable-allowance-rate-editor/variable-allowance-rate-editor.component';
import { Router } from '@angular/router';
import { VariableAllowanceViewerComponent } from './variable-allowance-viewer/variable-allowance-viewer.component';
import { VariableAllowancesService } from './variable-allowances.service';
import { Title } from '@angular/platform-browser';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-payrl-variable-allowances',
  templateUrl: './variable-allowances.component.html',
  styleUrls: ['./variable-allowances.component.scss'],
  providers: [VariableAllowancesService]
})
export class VariableAllowancesComponent implements OnInit {

  variableAllowanceData$: Observable<IVariableAllowance[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showRateEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor:  VariableAllowanceEditorComponent;
  @ViewChild('viewer') viewer:  VariableAllowanceViewerComponent;
  @ViewChild('rateEditor') rateEditor:  VariableAllowanceRateEditorComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, private router: Router, public service: VariableAllowancesService) {
    titleService.setTitle(
      `${'Variable Allowances Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadVariableAllowanceData());
    this.store.dispatch(new LoadingVariableAllowance())
   }

  storeSelects() {
    this.variableAllowanceData$ = this.store.pipe(select(getVariableAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableAllowance));
    this.showEditor$ = this.store.pipe(select(showEditorVariableAllowance))
    this.showViewer$ = this.store.pipe(select(showViewerVariableAllowance))
    this.showRateEditor$ = this.store.pipe(select(showRateEditorVariableAllowance))
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

    if (this.dataGrid) {
      this.service.search(
        this.dataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IVariableAllowance> {
    return this.variableAllowanceData$.pipe(
      map(d => d.filter(v => v.varallowance_id === rowId)),
      map(e => e.shift()))
  }

onAdd(){
this.store.dispatch(new ShowEditorVariableAllowance());
}


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerVariableAllowance());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorVariableAllowance());
      });
  }

  onSetRateIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.variableAllowanceId = rowId;
        if (result.use_global_rate.toLowerCase() === 'no') {
          this.router.navigate([STANDARD_ROUTES.variableAllowancePaygroupRates, result.varallowance_id])
        } else {
          this.rateEditor.data = {...result, eligibility: 2, is_global: true};
          this.rateEditor.isGlobal = true;
          // this.rateEditor.eligibility = result.eligibility;
          this.rateEditor.variableAllowanceId = result.varallowance_id;
          this.rateEditor.paygroupId = null;
          this.rateEditor.employeeId = null;
          this.store.dispatch(new ShowRateEditorVariableAllowance());
        }
      });
  }
  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.getRowData$(rowId)
          .pipe(take(1))
          .subscribe(() => {
            this.store.dispatch(new DeleteVariableAllowance({ recordId: rowId }));
          })
      }
    });
  }

onRefresh(){
this.store.dispatch(new LoadVariableAllowanceData());
this.store.dispatch(new ShowToast({title: null, message: `  Variable Allowance data is being refreshed.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorVariableAllowance());
}

onCancelRateEditor(){
 this.store.dispatch(new HideRateEditorVariableAllowance());
}
  onCancelViewer() {
    this.store.dispatch(new HideViewerVariableAllowance());
  }
}


