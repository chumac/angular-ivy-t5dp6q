import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IVariableAllowanceRate } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeleteRateVariableAllowance, LoadingVariableAllowance, isLoadingVariableAllowance, getRatesVariableAllowance, ShowRateEditorVariableAllowance, HideRateEditorVariableAllowance, showRateEditorVariableAllowance, LoadRatesVariableAllowance, getPaygroupListVariableAllowance, LoadPaygroupListVariableAllowance, HideRateViewerVariableAllowance, showRateViewerVariableAllowance, ShowRateViewerVariableAllowance } from '../../../../../store/pay-elements/variable-allowance';
import { IRootState } from '../../../../../store/root/root.state';
import { VariableAllowanceRatesService } from './variable-allowance-rates.service';
import { ISelectOption } from '@nutela/models/core-data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { VariableAllowanceRateEditorComponent } from '../variable-allowance-rate-editor/variable-allowance-rate-editor.component';
import { VariableAllowanceRateViewerComponent } from './variable-allowance-rate-viewer/variable-allowance-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-variable-allowance-rates',
  templateUrl: './variable-allowance-rates.component.html',
  styleUrls: ['./variable-allowance-rates.component.scss'],
  providers: [VariableAllowanceRatesService]
})

export class VariableAllowanceRatesComponent implements OnInit {

  varallowanceId: number
  paygroupRatesData$: Observable<IVariableAllowanceRate[]>;
  paygroupList$: Observable<ISelectOption[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('rateEditor') rateEditor: VariableAllowanceRateEditorComponent;
  @ViewChild('rateViewer') rateViewer: VariableAllowanceRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: VariableAllowanceRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Variable Allowance Paygroup Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
        this.varallowanceId = val.varallowanceId
      })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingVariableAllowance());
    this.store.dispatch(new LoadRatesVariableAllowance({ allowanceId: this.varallowanceId }));
    this.store.dispatch(new LoadPaygroupListVariableAllowance());

  }

  storeSelects() {
    this.paygroupRatesData$ = this.store.pipe(select(getRatesVariableAllowance));
    this.paygroupList$ = this.store.pipe(select(getPaygroupListVariableAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingVariableAllowance));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorVariableAllowance));
    this.showViewer$ = this.store.pipe(select(showRateViewerVariableAllowance));
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

  getRowData$(rowId: number): Observable<IVariableAllowanceRate> {
    console.log(rowId);
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.vallowgrprate_id === rowId)),
      map(e => e.shift()))
  }

  getByPaygroupData$(rowId: number): Observable<IVariableAllowanceRate> {
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
        data: { paygroupList, elementType: 'VariableAllowance' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.paygroupDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }

  onSetRate(data: any) {
    this.rateEditor.data = null;
    if (!data.is_cancel) {
      this.getByPaygroupData$(data.paygroup).pipe(take(1))
        .subscribe((result) => {
          if (!result) {
            this.dialogService.show(this.dialogService.options(), `No rate chart exist for this paygroup. Do you want to create one?`);

            this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
              if (confirmed) {
                this.rateEditor.data = {
                  usedirect_amount: false,
                  direct_amount: null,
                  formula_id: null,
                  currency_id: null,
                  is_taxable: false,
                  tax_amount: null,
                  tax_percent: null,
                  min_nontaxable: null,
                  varallowance_id: +this.varallowanceId,
                  eligibility: 1,
                  is_global: false,
                  is_edit: false,
                  paygroup_id: data.paygroup
                };
                this.rateEditor.reset();
                this.store.dispatch(new ShowRateEditorVariableAllowance());
              }
            })
          } else {
            this.rateEditor.data = {...result, eligibility: 1, is_global: false, is_edit: true};
            this.rateEditor.employeeId = null;
            this.rateEditor.reset();
            this.store.dispatch(new ShowRateEditorVariableAllowance());
          }
        });
    }
  }

  onViewIconClicked(rowId: number) {
    this.rateViewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateViewer.data = result;
        this.store.dispatch(new ShowRateViewerVariableAllowance());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.variableAllowanceId = +this.varallowanceId;
        this.rateEditor.employeeId = null;
        this.rateEditor.data = {...result, eligibility: 1, is_global: false, is_edit: true};
        this.store.dispatch(new ShowRateEditorVariableAllowance());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteRateVariableAllowance({ recordId: rowId, allowanceId: this.varallowanceId }));
      }
    });
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideRateViewerVariableAllowance());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorVariableAllowance());
  }
}


