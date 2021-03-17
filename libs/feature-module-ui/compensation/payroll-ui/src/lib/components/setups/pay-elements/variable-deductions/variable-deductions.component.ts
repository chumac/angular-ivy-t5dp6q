import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IVariableDeduction } from '@nutela/models/compensation/payroll';
import { VariableDeductionEditorComponent } from './variable-deduction-editor/variable-deduction-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadVariableDeductionData, LoadingVariableDeduction, getVariableDeduction, isLoadingVariableDeduction, showEditorVariableDeduction, ShowEditorVariableDeduction, HideEditorVariableDeduction, DeleteVariableDeduction, showRateEditorVariableDeduction, ShowRateEditorVariableDeduction, DeleteRateVariableDeduction, HideViewerVariableDeduction, showViewerVariableDeduction, ShowViewerVariableDeduction, HideRateEditorVariableDeduction } from '../../../../store/pay-elements/variable-deduction';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { VariableDeductionRateEditorComponent } from './variable-deduction-rate-editor/variable-deduction-rate-editor.component';
import { Router } from '@angular/router';
import { VariableDeductionViewerComponent } from './variable-deduction-viewer/variable-deduction-viewer.component';
import { VariableDeductionsService } from './variable-deductions.service';
import { Title } from '@angular/platform-browser';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-payrl-variable-deductions',
  templateUrl: './variable-deductions.component.html',
  styleUrls: ['./variable-deductions.component.scss'],
  providers: [VariableDeductionsService]
})
export class VariableDeductionsComponent implements OnInit {

  variableDeductionData$: Observable<IVariableDeduction[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showRateEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor:  VariableDeductionEditorComponent;
  @ViewChild('rateEditor') rateEditor:  VariableDeductionRateEditorComponent;
  @ViewChild('viewer') viewer:  VariableDeductionViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService, private router: Router, public service: VariableDeductionsService) {
    titleService.setTitle(
      `${'Variable Deductions Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadingVariableDeduction())
    this.store.dispatch(new LoadVariableDeductionData());
   }

  storeSelects() {
    this.variableDeductionData$ = this.store.pipe(select(getVariableDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableDeduction));
    this.showEditor$ = this.store.pipe(select(showEditorVariableDeduction))
    this.showViewer$ = this.store.pipe(select(showViewerVariableDeduction))
    this.showRateEditor$ = this.store.pipe(select(showRateEditorVariableDeduction))
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
  getRowData$(rowId: number): Observable<IVariableDeduction> {
    return this.variableDeductionData$.pipe(
      map(d => d.filter(v => v.vardeduction_id === rowId)),
      map(e => e.shift()))
  }

  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorVariableDeduction());
  }


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerVariableDeduction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorVariableDeduction());
      });
  }

  onSetRateIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.variableDeductionId = rowId;
        if (result.use_global_rate.toLowerCase() === 'no') {
          this.router.navigate([STANDARD_ROUTES.variableDeductionPaygroupRates, result.vardeduction_id])
        } else {
          this.rateEditor.data = {...result, eligibility: 2, is_global: true};
          // this.rateEditor.isGlobal = true;
          // this.rateEditor.eligibility = 2;
          // // this.rateEditor.variableDeductionId = result.vardeduction_id;
          // this.rateEditor.paygroupId = null;
          this.store.dispatch(new ShowRateEditorVariableDeduction());
        }
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteVariableDeduction({ recordId: rowId }));
      }
    });
  }

onRefresh(){
this.store.dispatch(new LoadVariableDeductionData());
this.store.dispatch(new ShowToast({title: null, message: `  Variable Deduction data is being refreshed.`, type: ToastTypes.INFO}));
}

  onCancelViewer(){
 this.store.dispatch(new HideViewerVariableDeduction());
}

onCancelEditor(){
 this.store.dispatch(new HideEditorVariableDeduction());
 this.store.dispatch(new HideRateEditorVariableDeduction());
}

}

