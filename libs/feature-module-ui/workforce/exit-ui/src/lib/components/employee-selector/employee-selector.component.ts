import {
  Component,
  OnInit,
  Input,
  Inject,
} from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { pipe, Observable } from 'rxjs';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import DataSource from 'devextreme/data/data_source';
import { IAppState } from '@nutela/store/app-state';
import { DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { SubmitChecklistTransactionHR, getHRSubmitStatus } from '../../store/hr-process';
import { IResponseBody } from '../../interfaces';
import { ProcessingProcessData, SubmitChecklistTransaction, ProcessingRedirectData, isProcessingRedirectData, getSubmitStatus } from '../../store/process';
import { CHECKLIST_ACTIONS } from '../../constants';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-workforce-exit-employee-selector',
  templateUrl: './employee-selector.component.html',
  styleUrls: ['./employee-selector.component.scss']
})
export class EmployeeSelectorComponent implements OnInit {

  private subscriptions: ISubscriptions = {};

  @Input() public show: boolean;
  @Input() public isAdmin: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: any;

  public isProcessing$: Observable<boolean>;
  public isProcessingHR$: Observable<boolean>;
  public isSubmitSuccessful$: Observable<boolean>;
  public isHRSubmitSuccessful$: Observable<boolean>;
  public activePersonnel$: Observable<IPersonal[]>;

  public activePersonnelDataSource: any = new DataSource({
    paginate: true,
    pageSize: 50,
    store: this.dialogData.activePersonnel
  });;

  public logonName: string = '';

  constructor(
    public dialogRef: MatDialogRef<EmployeeSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.isProcessing$ = this.store.select(pipe(isProcessingRedirectData));
    this.isSubmitSuccessful$ = this.store.select(pipe(getSubmitStatus));
    this.isHRSubmitSuccessful$ = this.store.select(pipe(getHRSubmitStatus));
  }

  onCancelClicked() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => this.unsubscribeSubmit());
  }

  unsubscribeSubmit() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }


  onSubmit() {
    const newBody = this.dialogData.formBody.map(obj => ({ id: obj.id ? obj.id : obj.checklist_trans_id, is_validated: false, validated_by: this.logonName, validator_comment: null, selected_option: null }));
    const message = `You are about to redirect ${(newBody.length > 1) ? 'checklist items' : 'the checklist item'}. Do you want to continue?`
    this.dialogService.show(this.dialogService.options(), message);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ProcessingRedirectData(true));
        if (this.dialogData.isAdmin) {
          this.store.dispatch(new SubmitChecklistTransactionHR({ requestType: CHECKLIST_ACTIONS.redirect, data: <IResponseBody[]>newBody, employeeId: this.dialogData.employeeId, resignationId: this.dialogData.resignationId }));

          this.subscriptions['hrSubmit'] = this.isHRSubmitSuccessful$.subscribe(val => {
            if (typeof (val) === 'boolean' && val) {
              this.dialogRef.close();
              this.dialogRef.afterClosed().subscribe(() => this.unsubscribeSubmit());
            }
          })
        } else {
          this.store.dispatch(new SubmitChecklistTransaction({ requestType: CHECKLIST_ACTIONS.redirect, isLM: true, data: <IResponseBody[]>newBody, employeeId: this.dialogData.employeeId, resignationId: this.dialogData.resignationId }));

          this.subscriptions['lmSubmit'] = this.isSubmitSuccessful$.subscribe(val => {
            if (typeof (val) === 'boolean' && val) {
              this.dialogRef.close();
              this.dialogRef.afterClosed().subscribe(() => this.unsubscribeSubmit());
            }
          })
        }
      }
    })
  }

}
