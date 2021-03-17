import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HrRespondService } from './hr-respond.service';
import { Store } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  BaseFormComponent,
  ToastTypes,
  STANDARD_ROUTES
} from '@nutela/shared/app-global';
import { Observable, pipe, Subject } from 'rxjs';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter, IResponseRowData, IResponseBody } from '../../interfaces';
import { Location } from '@angular/common';
import { IChecklistTransaction } from '../../interfaces/checklist-transaction.interface';
import { getEmployeeSubmittedLetter, isUserAdmin, IsUserAdmin, LoadChecklistTransactionsHR, SubmitChecklistTransactionHR, getEmployeeChecklistTransactions, isLoadingHrProcessData, LoadingEmployeeProcessData, isProcessingHrProcessData, ProcessingHRProcessData, getHRSubmitStatus } from '../../store/hr-process';
import { take, takeUntil } from 'rxjs/operators';
import { CloseAllChecklists, ProcessingResignation, isProcessingHrResignations } from '../../store/hr-resignation';
import { IComprehensiveData, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { LoadComprehensiveData, getComprehensiveData, LoadEmployeePhoto, getEmployeePhoto } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/employee-detailed-area';
import { MatDialog, MatDialogRef } from '@angular/material';
import { activePersonnel } from '@nutela/store/modules/foundation';
import { EmployeeSelectorComponent } from '../employee-selector/employee-selector.component';
import { CHECKLIST_ACTIONS } from '../../constants';
import { ProcessingSaveData, isProcessingSaveData } from '../../store/process';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-workforce-exit-hr-respond',
  templateUrl: './hr-respond.component.html',
  styleUrls: ['./hr-respond.component.scss'],
  providers: [HrRespondService]
})
export class HrRespondComponent extends BaseFormComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  private subscriptions: ISubscriptions = {};

  employeeId: number;
  resignationId: number
  rowData: IResponseRowData[];
  isProcessing$: Observable<boolean>;
  isProcessingResignation$: Observable<boolean>;
  isProcessingSave$: Observable<boolean>;
  isSubmitSuccessful$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;
  checklistTransactions$: Observable<IChecklistTransaction[]>;
  employeeResignation$: Observable<IResignationLetter>;
  isAdmin$: Observable<boolean>;
  employeePhoto$: Observable<any>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<IPersonal[]>;

  checklistId: number;
  finalValue: any[] = [];
  disableSubmit: boolean;

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  employeeDialogRef: MatDialogRef<EmployeeSelectorComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public fs: HrRespondService,
    private store: Store<IAppState>,
    public utilService: UtilService,
    private location: Location,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    super();
    titleService.setTitle(
      `${'HR Checklist Response'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(params => {
      this.resignationId = params.resignationId;
      this.employeeId = params.employeeId;
    })
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.setData();
    this.loadEmployeeData()
  }

  storeSelects() {
    this.isProcessing$ = this.store.select(pipe(isProcessingHrProcessData));
    this.isProcessingSave$ = this.store.select(pipe(isProcessingSaveData));
    this.isLoading$ = this.store.select(pipe(isLoadingHrProcessData));
    this.checklistTransactions$ = this.store.select(pipe(getEmployeeChecklistTransactions));
    this.employeeResignation$ = this.store.select(pipe(getEmployeeSubmittedLetter));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.isAdmin$ = this.store.select(pipe(isUserAdmin));
    this.isProcessingResignation$ = this.store.select(pipe(isProcessingHrResignations));
    this.employeePhoto$ = this.store.select(pipe(getEmployeePhoto));
    this.isSubmitSuccessful$ = this.store.select(pipe(getHRSubmitStatus));
    this.activePersonnel$ = this.store.select(pipe(activePersonnel));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingEmployeeProcessData());
    this.store.dispatch(new LoadChecklistTransactionsHR({ resignationId: this.resignationId, employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeePhoto({employeeId: this.employeeId}));
   }

  loadEmployeeData() {
    this.isAdmin$.pipe(take(1)).subscribe(val => {
      if (!val) {
        this.store.dispatch(new LoadComprehensiveData({ employeeId: this.employeeId }));
      }
    })
  }

  checkValidity() {
    this.disableSubmit = this.getValidityFromBody();
  }

  onSubmit() {
    const newBody: any[] = this.getResponseBody()
      .filter(val => val.is_validated.trim().toLowerCase() !== 'yes')
      .map(obj => ({ ...obj, is_validated: true, }));
    if (!this.disableSubmit) {
      this.dialogService.show(this.dialogService.options(), `This submission is final and will close the session. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingHRProcessData());
          this.store.dispatch(new SubmitChecklistTransactionHR({ requestType: CHECKLIST_ACTIONS.submit, data: <IResponseBody[]>newBody, employeeId: this.employeeId, resignationId: this.resignationId }))

          this.subscriptions['submitSuccess'] = this.isSubmitSuccessful$.subscribe(status => {
            if (status) {
              this.setData();
              this.unsubscribeSubmit()
            }
          })
        }
      });
    }
  }

  getErrorMessage() {
    if (this.rowData) {
      this.rowData.forEach(data => {
        if (!(data.requires_comment && data.validator_comment)) {
          this.store.dispatch(new ShowToast({
            title: 'Correct the Following',
            message: `Comment is required for ${data.selected_option || 'the selected option'}.`,
            type: ToastTypes.INFO
          }));
        } else {
          return true
        }
      })
    }
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onBackButtonClicked() {
    this.location.back();
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
  }

  onCloseAllButtonClicked() {
    this.dialogService.show(this.dialogService.options(), `This action will close resignation process for current employee. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ProcessingResignation());
        this.store.dispatch(new CloseAllChecklists({ employeeId: this.rowData[0].employee_id, resignationId: this.rowData[0].resignation_id }));
      }
    })
  }

  setData() {
    this.checklistTransactions$.pipe(takeUntil(this.destroy$)).subscribe(transactions => {
      (transactions && transactions.length) ?
        this.rowData = this.transformToRowData(transactions) :
        this.rowData = null;
    })
  }

  getOptionValues(optionValueString: string): ISelectOption[] {
    let list: ISelectOption[] = [];
    if (optionValueString) {
      const ar = optionValueString.split(',');
      ar.forEach(element => {
        const ap = {
          value: element.trim(),
          label: element.trim()
        }

        list.push(ap);
      });

      return list;
    } else {
      return []
    }

  }

  getResponseBody(): IResponseBody[] {
    let list: IResponseBody[] = [];
      if (this.rowData) {
        this.rowData.forEach(transaction => {
          const data: IResponseBody = {
            selected_option: transaction.selected_option,
            validated_by: transaction.validated_by,
            is_validated: transaction.is_validated,
            validator_comment: transaction.validator_comment,
            id: transaction.checklist_trans_id,
          }

          list.push(data);
        });
      }
    return list;
  }

  getValidityFromBody(): boolean {
    let list: boolean[] = [];
    if (this.rowData) {
      this.rowData.forEach(transaction => {
        let data = false;
        if (((transaction.requires_comment.trim().toLowerCase() === 'yes' && transaction.validator_comment) || transaction.requires_comment.trim().toLowerCase() === 'no') && transaction.selected_option) {
          data = true
        };

        list.push(data);
      });
    }
    return list.includes(false);
  }

  getValidationStatusFromBody(): boolean {
    let list: boolean[] = [];
    if (this.rowData) {
      this.rowData.forEach(transaction => {
        let data = false;
        if (transaction.is_validated && transaction.is_validated.trim().toLowerCase() == 'yes') {
          data = true
        };

        list.push(data);
      });
    }
    return list.includes(false);
  }

  transformToRowData(checklistTransactions: IChecklistTransaction[] = []): IResponseRowData[] {
    let list: IResponseRowData[] = [];

    if (checklistTransactions) {
      checklistTransactions.forEach(item => {
        const data: IResponseRowData = {
          option_values: item.option_values ? this.getOptionValues(item.option_values) : [],
          selected_option: item.selected_option,
          validator_comment: item.validator_comment,
          instruction: item.instructions,
          requires_comment: item.requires_comment,
          resignation_id: item.resignation_id,
          employee_id: item.employee_id,
          description: item.description,
          summary: item.summary,
          checklist_trans_id: item.checklist_trans_id,
          is_validated: item.is_validated,
          validated_by: item.validated_by
        }
        list.push(data);
      });
      return list;
    } else {
      return list;
    }
  }

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: '',
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }));
  }


  onRedirectAll() {
    this.activePersonnel$.pipe(take(1)).subscribe(data => {
      if (data) {
        this.openModal(data, this.getResponseBody().filter(val => val.is_validated.trim().toLowerCase() !== 'yes'));
      }
    });
  }

  onRedirectItem(event) {
    this.activePersonnel$.pipe(take(1)).subscribe(data => {
      if (data) {
        this.openModal(data, event);
      }
    });
  }

  onSaveClicked() {
    const newBody: any[] = this.getResponseBody()
      .filter(val => val.is_validated.trim().toLowerCase() !== 'yes')
      .map(obj => ({ ...obj, is_validated: false }));
    this.store.dispatch(new ProcessingSaveData(true));
    this.store.dispatch(new SubmitChecklistTransactionHR({ requestType: CHECKLIST_ACTIONS.save, data: <IResponseBody[]>newBody, employeeId: this.employeeId, resignationId: this.resignationId }))

    this.subscriptions['saveSuccess'] = this.isSubmitSuccessful$.subscribe(status => {
      if (status) {
        this.setData();
        this.unsubscribeSubmit()
      }
    })
  }

  openModal(result: IPersonal[], formBody: any): void {
    if (formBody) {
      this.employeeDialogRef = this.dialog.open(EmployeeSelectorComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { activePersonnel: result, formBody, isAdmin: true, employeeId: this.employeeId, resignationId: this.resignationId },
        panelClass: 'custom-dialog-container'
      });
    } else {
      this.store.dispatch(new ShowToast({
        title: 'Cannot Redirect',
        message: `All checklist transactions have already been validated`,
        type: ToastTypes.INFO
      }));
    }

  }

  unsubscribeSubmit() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.store.dispatch(new IsUserAdmin(false))
    this.destroy$.next(true);
    this.unsubscribeSubmit()
  }

}
