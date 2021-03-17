import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { pipe, Observable } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { IAppState } from '@nutela/store/app-state';
import { ISubscriptions } from '@nutela/models/common';
import { employeeRateChartExistFixedAllowance, isProcessingItemCheckFixedAllowance, paygroupRateChartExistFixedAllowance } from '../../../../store/pay-elements/fixed-allowance';

@Component({
  selector: 'x365-fm-payrl-item-selection',
  templateUrl: './item-selection.component.html',
  styleUrls: ['./item-selection.component.scss']
})
export class ItemSelectionComponent implements OnInit {

  private subscriptions: ISubscriptions = {};

  public isProcessingFixedAllowance$: Observable<boolean>;
  public paygroupRateChartExistFixedAllowance$: Observable<any[]>;
  public employeeRateChartExistFixedAllowance$: Observable<any[]>;

  public isProcessingFixedDeduction$: Observable<boolean>;
  public employeeRateChartExistFixedDeduction$: Observable<boolean>;
  public paygroupRateChartExistFixedDeduction$: Observable<boolean>;

  public activePersonnelDataSource: any = new DataSource({
    paginate: true,
    pageSize: 50,
    store: this.dialogData.activePersonnel
  });

  public employeeId: number;
  public paygroupId: number;

  constructor(
    public dialogRef: MatDialogRef<ItemSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public utilService: UtilService,
    private store: Store<IAppState>,
  ) {}

  ngOnInit() {
    this.isProcessingFixedAllowance$ = this.store.select(pipe(isProcessingItemCheckFixedAllowance));
    this.employeeRateChartExistFixedAllowance$ = this.store.select(pipe(employeeRateChartExistFixedAllowance));
    this.paygroupRateChartExistFixedAllowance$ = this.store.select(pipe(paygroupRateChartExistFixedAllowance));
  }

  onCancelClicked() {
    this.dialogRef.close({ employee: null, is_cancel: true, paygroup: null });
  }

  unsubscribeSubmit() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }


  onSubmit() {
    if (this.employeeId) {
      this.dialogRef.close({ employee: this.employeeId, is_cancel: false, paygroup: null });
    } else if (this.paygroupId) {
      this.dialogRef.close({ paygroup: this.paygroupId, is_cancel: false, employee: null });
    }
  }

}
