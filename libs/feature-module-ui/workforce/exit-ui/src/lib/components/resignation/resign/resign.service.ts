import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { UtilService, formatDate } from '@nutela/core-services';
import { IResignationLetter } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResignService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        employee_id: [null],
        resign_letter: ['', Validators.required],
        effective_date: [null, Validators.required],
        separation_type: [null, Validators.required],
        doc_binary: [null],
        doc_size: [null],
        doc_extension: [null]
      },
      {
        validator: []
      }
    );
  }

  init(data: IResignationLetter) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IResignationLetter): IResignationLetter | {} {
    if (data) {
      return {};
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      employee_id: {
        fieldTitle: `Employee`,
        required: `This field is required.`
      },
      resign_letter: {
        fieldTitle: `Resignation Message`,
        required: `This field is required.`
      },
      doc_binary: {
        fieldTitle: `Document`,
        required: `This field is required.`
      },
      separation_type: {
        fieldTitle: `Separation Type`,
        required: `This field is required.`
      },
      effective_date: {
        fieldTitle: `Effective Date`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }

  get resignLetter(): AbstractControl {
    return this.form.get('resign_letter');
  }

  get documentBinary(): AbstractControl {
    return this.form.get('doc_binary');
  }

  get effectiveDate(): AbstractControl {
    return this.form.get('effective_date');
  }

  get separationType(): AbstractControl {
    return this.form.get('separation_type');
  }

  makeFieldsRequired(usingUpload: boolean) {
    if (usingUpload) {
      this.documentBinary.setValidators([Validators.required]);
      this.resignLetter.setValidators([]);
    } else {
      this.resignLetter.setValidators([Validators.required]);
      this.documentBinary.setValidators([]);
    }

    this.resignLetter.updateValueAndValidity();
    this.documentBinary.updateValueAndValidity();
  }

  transformInputsToNumber() {
    if (
      this.effectiveDate.value !== null &&
      !isNaN(parseFloat(this.effectiveDate.value))
    ) {
      return this.effectiveDate.setValue(
        +parseFloat(this.effectiveDate.value).toFixed(2)
      );
    }
  }

  transformDatesInput() {
    if (this.effectiveDate.value !== null) {
      return this.effectiveDate.setValue(formatDate(this.effectiveDate.value));
    }
  }
  get f() {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Type letter here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
  };
}
