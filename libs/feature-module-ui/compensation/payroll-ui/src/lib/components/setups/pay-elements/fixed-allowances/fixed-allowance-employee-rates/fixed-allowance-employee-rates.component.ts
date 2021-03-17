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
import { IFixedAllowanceEmployeeRate } from '@nutela/models/compensation/payroll';
import { activePersonnel } from '@nutela/store/modules/foundation';
import { LoadEmployeeRatesFixedAllowance, getEmployeeRatesFixedAllowance, DeleteEmployeeRateFixedAllowance, LoadingFixedAllowance, isLoadingFixedAllowance, ShowRateEditorFixedAllowance, HideRateEditorFixedAllowance, showRateEditorFixedAllowance, showViewerEmployeeRateFixedAllowance, ShowViewerEmployeeRateFixedAllowance, HideViewerEmployeeRateFixedAllowance } from '../../../../../store/pay-elements/fixed-allowance';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedAllowanceEmployeeRatesService } from './fixed-allowance-employee-rates.service';
import { FixedAllowanceRateEditorComponent } from '../fixed-allowance-rate-editor/fixed-allowance-rate-editor.component';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { FixedAllowanceEmployeeRateViewerComponent } from './fixed-allowance-employee-rate-viewer/fixed-allowance-employee-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-employee-rates',
  templateUrl: './fixed-allowance-employee-rates.component.html',
  styleUrls: ['./fixed-allowance-employee-rates.component.scss'],
  providers: [FixedAllowanceEmployeeRatesService]
})

export class FixedAllowanceEmployeeRatesComponent implements OnInit {

  allowanceId: number;
  employeeRatesData$: Observable<IFixedAllowanceEmployeeRate[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<IPersonal[]>;

  @ViewChild('rateEditor') rateEditor: FixedAllowanceRateEditorComponent;
  @ViewChild('viewer') viewer: FixedAllowanceEmployeeRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  employeeDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedAllowanceEmployeeRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Allowance Employee Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
      this.allowanceId = val.allowanceId
    })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedAllowance());
    this.store.dispatch(new LoadEmployeeRatesFixedAllowance({allowanceId: this.allowanceId}));
  }

  storeSelects() {
    this.employeeRatesData$ = this.store.pipe(select(getEmployeeRatesFixedAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedAllowance));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedAllowance));
    this.showViewer$ = this.store.pipe(select(showViewerEmployeeRateFixedAllowance));
    this.activePersonnel$ = this.store.pipe(select(activePersonnel));
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

  getDataByEmployee$(rowId: number): Observable<IFixedAllowanceEmployeeRate> {
    return this.employeeRatesData$.pipe(
      map(d => d.filter(v => v.employee_id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<IFixedAllowanceEmployeeRate> {
    return this.employeeRatesData$.pipe(
      map(d => d.filter(v => v.fa_empspec_id === rowId)),
      map(e => e.shift()))
  }

  onSetRate(data: any) {
    if (!data.is_cancel) {
      this.rateEditor.data = null;
      this.rateEditor.isGlobal = false;
      this.getDataByEmployee$(data.employee).pipe(take(1))
      .subscribe(result => {
        this.rateEditor.fixedAllowanceId = +this.allowanceId;
          if (!result) {
            this.dialogService.show(this.dialogService.options(), `No rate chart exist for this employee. Do you want to create one?`);

            this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
              if (confirmed) {
                this.rateEditor.employeeId = data.employee;
                this.rateEditor.paygroupId = null;
                this.rateEditor.eligibility = 0;
                this.rateEditor.reset();
                this.store.dispatch(new ShowRateEditorFixedAllowance());
              }
            })
          } else {
            this.rateEditor.data = result;
            this.rateEditor.paygroupId = null;
            this.store.dispatch(new ShowRateEditorFixedAllowance());
          }
        });
    }
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.isGlobal = false;
    this.getRowData$(rowId).pipe(take(1))
    .subscribe(result => {
      this.rateEditor.fixedAllowanceId = +this.allowanceId;
      this.rateEditor.data = result;
      this.rateEditor.paygroupId = null;
      this.rateEditor.reset();
      this.store.dispatch(new ShowRateEditorFixedAllowance());
    });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteEmployeeRateFixedAllowance({ recordId: rowId, allowanceId: this.allowanceId }));
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
        data: { activePersonnel, elementType: 'fixedAllowance' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.employeeDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }


  onAddButtonClicked() {
    this.openModal();
    // this.store.dispatch(new ShowRateEditorFixedAllowance());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerEmployeeRateFixedAllowance());
      }
      );
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEmployeeRateFixedAllowance());
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedAllowance());
  }

}


