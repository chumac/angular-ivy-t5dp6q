import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LMRespondService } from './lm-respond.service';
import { Store } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable, pipe, Subject } from 'rxjs';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter, IResponseRowData, IResponseBody } from '../../interfaces';
import { Location } from '@angular/common';
import { ProcessingProcessData, SubmitChecklistTransaction, isProcessingSaveData, getChecklistTransactions, isProcessingExitProcess, LoadChecklistTransactions, ProcessingSaveData, LoadExitEmployeePhoto, getExitEmployeePhotoLM } from '../../store/process';
import { IChecklistTransaction } from '../../interfaces/checklist-transaction.interface';
import { LoadEmployeeSubmittedLetter, getEmployeeSubmittedLetter, isUserAdmin, IsUserAdmin } from '../../store/hr-process';
import { take, takeUntil } from 'rxjs/operators';
import { IPersonal, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { getComprehensiveData } from 'libs/store/modules/workforce/employee-profiles/src/lib/domains';
import { activePersonnel, allowLMViewEmployeeLetter } from '@nutela/store/modules/foundation';
import { EmployeeSelectorComponent } from '../employee-selector/employee-selector.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CHECKLIST_ACTIONS } from '../../constants';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-workforce-exit-lm-respond',
  templateUrl: './lm-respond.component.html',
  styleUrls: ['./lm-respond.component.scss'],
  providers: [LMRespondService]
})
export class LMRespondComponent extends BaseFormComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private subscriptions: ISubscriptions = {};

  employeeId: number;
  resignationId: number
  rowData: IResponseRowData[];
  isProcessing$: Observable<boolean>;
  isProcessingSave$: Observable<boolean>;
  isSubmitSuccessful$: Observable<boolean>;
  checklistTransactions$: Observable<IChecklistTransaction[]>;
  employeeResignation$: Observable<IResignationLetter>;
  isAdmin$: Observable<boolean>;
  employeePhoto$: Observable<any>;
  activePersonnel$: Observable<IPersonal[]>;
  comprehensiveData$: Observable<IComprehensiveData>;
  allowViewLetter$: Observable<string>;

  checklistId: number;
  finalValue: any[] = [];
  disableSubmit: boolean;

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  employeeDialogRef: MatDialogRef<EmployeeSelectorComponent>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public fs: LMRespondService,
    private store: Store<IAppState>,
    public utilService: UtilService,
    private location: Location,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    super();
    titleService.setTitle(
      `${'LM Checklist Response'}${this.partialDocumentTitle}`
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
  }

  storeSelects() {
    this.isProcessing$ = this.store.select(pipe(isProcessingExitProcess));
    this.isProcessingSave$ = this.store.select(pipe(isProcessingSaveData));
    this.checklistTransactions$ = this.store.select(pipe(getChecklistTransactions));
    this.employeeResignation$ = this.store.select(pipe(getEmployeeSubmittedLetter));
    this.activePersonnel$ = this.store.select(pipe(activePersonnel));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.isAdmin$ = this.store.select(pipe(isUserAdmin));
    this.employeePhoto$ = this.store.select(pipe(getExitEmployeePhotoLM));
    this.allowViewLetter$ = this.store.select(pipe(allowLMViewEmployeeLetter));
  }

  storeDispatches() {
    this.store.dispatch(new LoadChecklistTransactions({ isLM: true, resignationId: this.resignationId, employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeeSubmittedLetter({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadExitEmployeePhoto(this.employeeId));
   }

  checkValidity() {
    this.disableSubmit = this.getValidityFromBody();
  }

  onBackButtonClicked() {
    this.location.back();
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
  }

  setData() {
    this.checklistTransactions$.pipe(takeUntil(this.destroy$)).subscribe(transactions => {
      (transactions && transactions.length) ?
        this.rowData = this.transformToRowData(transactions) :
        this.rowData = null;
    })
  }

  isMyData(): boolean {
    let status: boolean;
    this.comprehensiveData$.pipe(take(1)).subscribe(data => {
      status = data.employee_id === +this.employeeId;
    })

    return status;
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
            validated_by: transaction.validated_by,
            is_validated: transaction.is_validated,
            selected_option: transaction.selected_option,
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

  onSubmit() {
    const body = this.getResponseBody()
      .filter(val => val.is_validated.trim().toLowerCase() !== 'yes')
      .map(val => ({...val, is_validated: true }));
    // const employeeId = this.rowData[0].employee_id
    if (!this.disableSubmit) {
      this.dialogService.show(this.dialogService.options(), `This submission is final and will close the session. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingProcessData());
          this.store.dispatch(new SubmitChecklistTransaction({ requestType: CHECKLIST_ACTIONS.submit, isLM: true, data: <any[]>body, employeeId: this.employeeId, resignationId: this.resignationId }))

          this.subscriptions['submitSuccess'] = this.isSubmitSuccessful$.subscribe(status => {
            if (typeof (status) === 'boolean' && status) {
              this.setData();
              this.unsubscribeSubmit();
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
            message: `Comment is required for ${data.selected_option}.`,
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

  onSaveClicked() {
    const newBody: any[] = this.getResponseBody()
      .filter(val => val.is_validated.trim().toLowerCase() !== 'yes')
      .map(obj => ({ ...obj, is_validated: false }));
    this.store.dispatch(new ProcessingSaveData(true));
    this.store.dispatch(new SubmitChecklistTransaction({ requestType: CHECKLIST_ACTIONS.submit, isLM: true, data: <IResponseBody[]>newBody, employeeId: this.employeeId, resignationId: this.resignationId }))

    this.subscriptions['saveSuccess'] = this.isSubmitSuccessful$.subscribe(status => {
      if (status) {
        this.setData();
        this.unsubscribeSubmit();
      }
    })
  }

  openModal(result: IPersonal[], formBody: any): void {
    if (formBody) {
      this.employeeDialogRef = this.dialog.open(EmployeeSelectorComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { activePersonnel: result, formBody, isAdmin: false, employeeId: this.employeeId, resignationId: this.resignationId },
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

  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({
      title: '',
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }));
  }

  onViewReportClicked(event: any) {
    console.log(event)
  }
  unsubscribeSubmit() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.store.dispatch(new IsUserAdmin(false))
    this.destroy$.next(true);
    this.unsubscribeSubmit();
  }

}
