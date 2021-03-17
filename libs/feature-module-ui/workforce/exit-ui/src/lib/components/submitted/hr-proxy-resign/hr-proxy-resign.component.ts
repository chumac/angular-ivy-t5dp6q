import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter, SimpleChanges, ElementRef } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { HrProxyResignService } from './hr-proxy-resign.service';
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
import { getResignationTypes, LoadResignationTypesSelectOption, HideLetterEditor, LoadEmployeeExitProcessInitiationStatus } from '../../../store/resignation';
import { IAppState } from '@nutela/store/app-state';
import { SubmitEmployeeResignationLetter, HideResignationEditor, ProcessingResignation, isProcessingHrResignations } from '../../../store/hr-resignation';

@Component({
  selector: 'x365-fm-workforce-exit-hr-proxy-resign',
  templateUrl: './hr-proxy-resign.component.html',
  styleUrls: ['./hr-proxy-resign.component.scss']
})
export class HrProxyResignComponent extends BaseFormComponent
  implements OnInit {
  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeData: any[];
  @Input() public processInitiated: boolean;
  @Input() public activePersonnel: ISelectOption[];

  @Input() public data: IResignationLetter;

  isProcessing$: Observable<boolean>;
  separationTypes$: Observable<ISelectOption[]>;
  isSubmitSuccessful$: Observable<boolean>;

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  useUpload = false;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.useUpload = false;
      this.fs.form = this.fs.buildForm();
      this.onFileRemoved();
      if (this.fs.documentBinary.value) {
        this.filePicker.removeFile();
      }
    }
  }

  constructor(
    public fs: HrProxyResignService,
    private store: Store<IAppState>,
    public utilService: UtilService,
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.select(pipe(isProcessingHrResignations));
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
        this.store.dispatch(new SubmitEmployeeResignationLetter({ data: <IResignationLetter>(this.fs.value) }))
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

  onUploadLetterChecked(event: any) {
    this.useUpload = event.target.checked;
    if (this.useUpload) {
      this.fs.resignLetter.setValue('')
    } else {
      this.onFileRemoved();
    }
    this.fs.makeFieldsRequired(this.useUpload);
  }

  onEmployeeSelected(event: any) {
    this.store.dispatch(new LoadEmployeeExitProcessInitiationStatus({ employeeId: event }));
    if (this.processInitiated !== false) {
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

  public options: Object = {
    placeholder: 'Type Message...',
    events: {
      focus: function (e, editor) { }
    },
    height: '1200',
    theme: 'gray',
    fileUpload: false,
    emoticonsUseImage: false,
    pluginsEnabled: [
      'align',
      'charCounter',
      'colors',
      'fontFamily',
      'fontSize',
      'lineBreaker',
      'list',
      'lineHeight',
      'url'
    ],
    // toolbarInline: true,
    toolbarSticky: false
  };


  onCancel() {
    this.data = null;
    this.reset();
    this.store.dispatch(new HideResignationEditor());
    // this.cancelClick.emit();
  }

  reset() {
    if (this.fs.documentBinary.value) {
      this.filePicker.removeFile();
    }
    this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
  }
}
