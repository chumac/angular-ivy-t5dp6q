import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter, SimpleChanges, ElementRef } from '@angular/core';
import { ResignService } from './resign.service';
import { Store } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  BaseFormComponent,
  ToastTypes,
} from '@nutela/shared/app-global';
import { Observable, pipe } from 'rxjs';
import { FilePickerComponent } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter } from '../../../interfaces';
import { isProcessingResignations, getResignationTypes, LoadResignationTypesSelectOption, ProcessingResignation, SubmitResignationLetter, HideLetterEditor, LoadEmployeeExitProcessInitiationStatus } from '../../../store/resignation';
import { IAppState } from '@nutela/store/app-state';
import { Validators } from '@angular/forms';

@Component({
  selector: 'x365-fm-workforce-exit-resign',
  templateUrl: './resign.component.html',
  styleUrls: ['./resign.component.scss']
})
export class ResignComponent extends BaseFormComponent
  implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeData: any[];
  @Input() public processInitiated: boolean;
  @Input() public isProxy: boolean = false;

  @Input() public data: IResignationLetter;

  isProcessing$: Observable<boolean>;
  separationTypes$: Observable<ISelectOption[]>;
  isSubmitSuccessful$: Observable<boolean>;

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  useUpload: boolean = false;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    } else {
      this.setEmployeeFieldRequired()
    }
  }

  constructor(
    public fs: ResignService,
    private store: Store<IAppState>,
    public utilService: UtilService,
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.setEmployeeFieldRequired();
  }

  storeSelects() {
    this.isProcessing$ = this.store.select(pipe(isProcessingResignations));
    this.separationTypes$ = this.store.select(pipe(getResignationTypes));
  }

  storeDispatches() {
    this.store.dispatch(new LoadResignationTypesSelectOption())
   }

  onClose() { }

  onSubmit() {
    this.fs.transformDatesInput();
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingResignation());
      if (this.isProxy) {
        this.store.dispatch(
          new SubmitResignationLetter({
            data: <IResignationLetter>(this.fs.value),
            employeeId: this.fs.value.employee_id
          })
        )
      } else {
        this.fs.f.removeControl('employee_id');
        this.store.dispatch(
          new SubmitResignationLetter({ data: <IResignationLetter>(this.fs.value) })
        )
      };
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(),
          type: ToastTypes.ERROR
        })
      );
    }
  }

  setEmployeeFieldRequired() {
    if (this.isProxy) {
      this.fs.employeeId.setValidators([Validators.required]);
      this.fs.employeeId.updateValueAndValidity();
    }
  }
  onUploadLetterChecked(event: any) {
    this.useUpload = event.target.checked;
    if (this.useUpload) {
      this.fs.resignLetter.setValue('')
    } else {
      this.onFileRemoved()
    }
    this.fs.makeFieldsRequired(this.useUpload);
  }

  onEmployeeSelected(event: any) {
    this.store.dispatch(new LoadEmployeeExitProcessInitiationStatus({ employeeId: event }))
    if (this.processInitiated) {
      this.store.dispatch(new ShowToast({
        title: '',
        message: `The selected employee currently has an active process.`,
        type: ToastTypes.INFO
      }));
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
        doc_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved() {
    this.fs.patch({
      doc_binary: null,
      doc_extension: null,
      doc_size: 0
    });
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.store.dispatch(new HideLetterEditor());
    // this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    if (this.fs.value.doc_binary) {
      this.filePicker.removeFile();
    }

  }
}
