import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IVariableDeductionRate } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeleteRateVariableDeduction, LoadingVariableDeduction, isLoadingVariableDeduction, getRatesVariableDeduction, ShowRateEditorVariableDeduction, HideRateEditorVariableDeduction, showRateEditorVariableDeduction, LoadRatesVariableDeduction, getPaygroupListVariableDeduction, LoadPaygroupListVariableDeduction, HideRateViewerVariableDeduction, showRateViewerVariableDeduction, ShowRateViewerVariableDeduction } from '../../../../../store/pay-elements/variable-deduction';
import { IRootState } from '../../../../../store/root/root.state';
import { VariableDeductionRatesService } from './variable-deduction-rates.service';
import { ISelectOption } from '@nutela/models/core-data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { VariableDeductionRateEditorComponent } from '../variable-deduction-rate-editor/variable-deduction-rate-editor.component';
import { VariableDeductionRateViewerComponent } from './variable-deduction-rate-viewer/variable-deduction-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-variable-deduction-rates',
  templateUrl: './variable-deduction-rates.component.html',
  styleUrls: ['./variable-deduction-rates.component.scss'],
  providers: [VariableDeductionRatesService]
})

export class VariableDeductionRatesComponent implements OnInit {

  deductionId: number
  paygroupRatesData$: Observable<IVariableDeductionRate[]>;
  paygroupList$: Observable<ISelectOption[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('rateEditor') rateEditor: VariableDeductionRateEditorComponent;
  @ViewChild('rateViewer') rateViewer: VariableDeductionRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: VariableDeductionRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Deduction Paygroup Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
        this.deductionId = val.vardeductionId
      })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingVariableDeduction());
    this.store.dispatch(new LoadRatesVariableDeduction({ recordId: this.deductionId }));
    this.store.dispatch(new LoadPaygroupListVariableDeduction());

  }

  storeSelects() {
    this.paygroupRatesData$ = this.store.pipe(select(getRatesVariableDeduction));
    this.paygroupList$ = this.store.pipe(select(getPaygroupListVariableDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableDeduction));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorVariableDeduction));
    this.showViewer$ = this.store.pipe(select(showRateViewerVariableDeduction));
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

  getRowData$(rowId: number): Observable<IVariableDeductionRate> {
    console.log(rowId);
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.vdeductgrprate_id === rowId)),
      map(e => e.shift()))
  }

  getByPaygroupData$(rowId: number): Observable<IVariableDeductionRate> {
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.paygroup_id === rowId)),
      map(e => e.shift()))
  }


  goBack() {
    this.location.back();
  };

  onAddButtonClicked() {
    this.openModal()
  }

  openModal(): void {
    this.paygroupList$.pipe(take(1)).subscribe(paygroupList => {
      this.paygroupDialogRef = this.dialog.open(ItemSelectionComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { paygroupList, elementType: 'VariableDeduction' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.paygroupDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }

  onSetRate(data: any) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    if (!data.is_cancel) {
      this.rateEditor.variableDeductionId = +this.deductionId;
      this.rateEditor.isGlobal = false;
      this.getByPaygroupData$(data.paygroup).pipe(take(1))
        .subscribe((result) => {
          if (!result) {
            this.dialogService.show(this.dialogService.options(), `No rate chart exist for this paygroup. Do you want to create one?`);

            this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
              if (confirmed) {
                const newData = {
                  paygroup_id: data.paygroup,
                  usedirect_amount: false,
                  direct_amount: null,
                  formula_id: null,
                  currency_id: null,
                  vardeduction_id: +this.deductionId,
                  eligibility: 1,
                  is_global: false, is_edit: false
                }
                this.rateEditor.data = newData;
                this.store.dispatch(new ShowRateEditorVariableDeduction());
              }
            })
          } else {
            this.rateEditor.data = {...result, eligibility: 1, is_global: false, is_edit: true};
            this.rateEditor.employeeId = null;
            this.rateEditor.reset();
            this.store.dispatch(new ShowRateEditorVariableDeduction());
          }
        });
    }
  }

  onViewIconClicked(rowId: number) {
    this.rateViewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateViewer.data = result;
        this.store.dispatch(new ShowRateViewerVariableDeduction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.data = {...result, eligibility: 1, is_global: false, is_edit: true};
        this.store.dispatch(new ShowRateEditorVariableDeduction());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        console.log('dispatch delete')
        this.store.dispatch(new DeleteRateVariableDeduction({ recordId: rowId, deductionId: this.deductionId }));
      }
    });
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideRateViewerVariableDeduction());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorVariableDeduction());
  }
}


