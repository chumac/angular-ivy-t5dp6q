import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IFixedDeductionEmployeeRate } from '@nutela/models/compensation/payroll';
import { activePersonnel } from '@nutela/store/modules/foundation';
import { LoadEmployeeRatesFixedDeduction, getEmployeeRatesFixedDeduction, DeleteEmployeeRateFixedDeduction, LoadingFixedDeduction, isLoadingFixedDeduction, ShowRateEditorFixedDeduction, HideRateEditorFixedDeduction, showRateEditorFixedDeduction, HideViewerEmployeeRateFixedDeduction, showViewerEmployeeRateFixedDeduction, ShowViewerEmployeeRateFixedDeduction  } from '../../../../../store/pay-elements/fixed-deduction';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedDeductionEmployeeRatesService } from './fixed-deduction-employee-rates.service';
import { FixedDeductionRateEditorComponent } from '../fixed-deduction-rate-editor/fixed-deduction-rate-editor.component';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { FixedDeductionEmployeeRateViewerComponent } from './fixed-deduction-employee-rate-viewer/fixed-deduction-employee-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-employee-rates',
  templateUrl: './fixed-deduction-employee-rates.component.html',
  styleUrls: ['./fixed-deduction-employee-rates.component.scss'],
  providers: [FixedDeductionEmployeeRatesService]
})

export class FixedDeductionEmployeeRatesComponent implements OnInit {

  deductionId: number;
  employeeRatesData$: Observable<IFixedDeductionEmployeeRate[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<IPersonal[]>;


  @ViewChild('rateEditor') rateEditor: FixedDeductionRateEditorComponent;
  @ViewChild('rateViewer') rateViewer: FixedDeductionEmployeeRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  employeeDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedDeductionEmployeeRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Deduction Employee Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
      this.deductionId = val.deductionId
    })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedDeduction());
    this.store.dispatch(new LoadEmployeeRatesFixedDeduction({deductionId: this.deductionId}));

  }

  storeSelects() {
    this.employeeRatesData$ = this.store.pipe(select(getEmployeeRatesFixedDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedDeduction));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedDeduction));
    this.activePersonnel$ = this.store.pipe(select(activePersonnel));
    this.showViewer$ = this.store.pipe(select(showViewerEmployeeRateFixedDeduction));
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

  getRowData$(rowId: number): Observable<IFixedDeductionEmployeeRate> {
    console.log(rowId);
    return this.employeeRatesData$.pipe(
      map(d => d.filter(v => v.fd_empspec_id === rowId)),
      map(e => e.shift()))
  }

  getByEmployeeData$(rowId: number): Observable<IFixedDeductionEmployeeRate> {
    console.log(rowId);
    return this.employeeRatesData$.pipe(
      map(d => d.filter(v => v.employee_id === rowId)),
      map(e => e.shift()))
  }

  onSetRateIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.data = result;
        this.rateEditor.reset();
        this.store.dispatch(new ShowRateEditorFixedDeduction());
      });
  }


  onSetRate(data: any) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    if (!data.is_cancel) {
      this.rateEditor.fixedDeductionId = +this.deductionId;
      this.rateEditor.isGlobal = false;
      this.getByEmployeeData$(data.employee).pipe(take(1))
        .subscribe((result) => {
          if (!result) {
            this.dialogService.show(this.dialogService.options(), `No rate chart exist for this paygroup. Do you want to create one?`);

            this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
              if (confirmed) {
                this.rateEditor.paygroupId = null;
                this.rateEditor.employeeId = data.employee;
                this.rateEditor.eligibility = 0;
                this.store.dispatch(new ShowRateEditorFixedDeduction());
              }
            })
          } else {
            this.rateEditor.data = result;
            this.rateEditor.paygroupId = null;
            this.rateEditor.reset();
            this.store.dispatch(new ShowRateEditorFixedDeduction());
          }
        });
    }
  }

  onViewIconClicked(rowId: number) {
    this.rateViewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateViewer.data = result;
        this.store.dispatch(new ShowViewerEmployeeRateFixedDeduction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.isGlobal = false;
        this.rateEditor.fixedDeductionId = +this.deductionId;
        this.rateEditor.paygroupId = null;
        this.rateEditor.data = result;
        this.store.dispatch(new ShowRateEditorFixedDeduction());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteEmployeeRateFixedDeduction({ recordId: rowId, deductionId: this.deductionId, rateType: 'employee' }));
      }
    });
  }

  goBack() {
    this.location.back();
  };

  openModal(): void {
    this.activePersonnel$.pipe(take(1)).subscribe(activePersonnel => {
      this.employeeDialogRef = this.dialog.open(ItemSelectionComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { activePersonnel, elementType: 'fixedDeduction' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.employeeDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }


  onAddButtonClicked() {
    this.openModal();
    // this.store.dispatch(new ShowRateEditorFixedDeduction());
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEmployeeRateFixedDeduction());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedDeduction());
  }

}


