import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { RespondService } from './respond.service';
import { Store } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  BaseFormComponent,
  ToastTypes
} from '@nutela/shared/app-global';
import { Observable, pipe } from 'rxjs';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter, IResponseRowData, IResponseBody } from '../../interfaces';
import { Location } from '@angular/common';
import { ProcessingProcessData, SubmitChecklistTransaction, getChecklistTransactions, isProcessingExitProcess, LoadChecklistTransactions, getSubmittedLetter, getSubmitStatus, ProcessingSaveData, isProcessingSaveData } from '../../store/process';
import { IChecklistTransaction } from '../../interfaces/checklist-transaction.interface';
import {  isUserAdmin, IsUserAdmin } from '../../store/hr-process';
import { take } from 'rxjs/operators';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { getComprehensiveData, getEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';
import { CHECKLIST_ACTIONS } from '../../constants';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-workforce-exit-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss'],
  providers: [RespondService]
})
export class RespondComponent extends BaseFormComponent implements OnInit {
  private subscriptions: ISubscriptions = {};

  employeeId: number;
  resignationId: number
  rowData: IResponseRowData[];
  isProcessing$: Observable<boolean>;
  isSubmitSuccessful$: Observable<boolean>;
  comprehensiveData$: Observable<IComprehensiveData>;
  checklistTransactions$: Observable<IChecklistTransaction[]>;
  myResignation$: Observable<IResignationLetter>;
  isAdmin$: Observable<boolean>;
  isProcessingSave$: Observable<boolean>;
  myPhoto$: Observable<any>;

  checklistId: number;
  finalValue: any[] = [];
  disableSubmit: boolean;

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public fs: RespondService,
    private store: Store<IAppState>,
    public utilService: UtilService,
    private location: Location,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {
    super();
    titleService.setTitle(
      `${'Checklist Response'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(params => {
      this.resignationId = params.resignationId;
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
    this.myResignation$ = this.store.select(pipe(getSubmittedLetter));
    this.comprehensiveData$ = this.store.select(pipe(getComprehensiveData));
    this.isAdmin$ = this.store.select(pipe(isUserAdmin));
    this.myPhoto$ = this.store.select(pipe(getEmployeePhoto));
    this.isSubmitSuccessful$ = this.store.select(pipe(getSubmitStatus));
  }

  storeDispatches() {
    this.store.dispatch(new LoadChecklistTransactions({ isLM: false, resignationId: this.resignationId }));
    // this.store.dispatch(new LoadEmployeePhoto(this.employeeId));
   }

  checkValidity() {
    this.disableSubmit = this.getValidityFromBody();
  }

  onSubmit() {
    const body = this.getResponseBody()
      .filter(val => val.is_validated && val.is_validated.trim().toLowerCase() !== 'yes')
      .map(val => ({...val, is_validated: true }));
    const employeeId = this.rowData[0].employee_id
    if (!this.disableSubmit) {
      this.dialogService.show(this.dialogService.options(), `This submission is final and will close the session. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingProcessData());
          this.store.dispatch(new SubmitChecklistTransaction({ requestType: CHECKLIST_ACTIONS.submit, isLM: false, data: <any[]>body, employeeId, resignationId: this.resignationId }))

          this.isSubmitSuccessful$.pipe(take(1)).subscribe(status => {
            if (status) {
              this.setData();
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

  setData() {
    this.checklistTransactions$.pipe(take(2)).subscribe(transactions => {
      if (transactions) {
        this.rowData = this.transformToRowData(transactions)
      }
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
            validator_comment: transaction.validator_comment,
            validated_by: transaction.validated_by,
            is_validated: transaction.is_validated,
            id: transaction.checklist_trans_id,
          }

          list.push(data);
        });
    }
    return list;
  }

  getValidityFromBody(): boolean {
    let list: any[] = [];
      if (this.rowData) {
        this.rowData.forEach(transaction => {
          let isValid = false;
          if (((transaction.requires_comment.trim().toLowerCase() === 'yes' && transaction.validator_comment) || transaction.requires_comment.trim().toLowerCase() === 'no') && transaction.selected_option) {
            isValid = true
          };

          list.push(isValid);
        });
    }
    return list.includes(false);
  }

  getValidationStatusFromBody(): boolean {
    let list: boolean[] = [];
    if (this.rowData) {
      this.rowData.forEach(transaction => {
        let data = false;
        console.log(transaction.selected_option);
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

  onSaveClicked() {
    const employeeId = this.rowData[0].employee_id;
    const newBody: any[] = this.getResponseBody()
      .filter(val => val.is_validated && val.is_validated.trim().toLowerCase() !== 'yes')
      .map(obj => ({ ...obj, is_validated: false }));
    this.store.dispatch(new ProcessingSaveData(true));
    this.store.dispatch(new SubmitChecklistTransaction({ requestType: CHECKLIST_ACTIONS.save, isLM: false, data: <IResponseBody[]>newBody, employeeId, resignationId: this.resignationId }));

    this.isSubmitSuccessful$.pipe(take(1)).subscribe(status => {
      if (status) {
        this.setData();
      }
    });
  }

  onRefresh() {
    this.storeDispatches()
    this.setData();
    this.store.dispatch(new ShowToast({
      title: '',
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    }));

  }

  unsubscribeSubmit() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  ngOnDestroy() {
    this.store.dispatch(new IsUserAdmin(false))
  }

}
