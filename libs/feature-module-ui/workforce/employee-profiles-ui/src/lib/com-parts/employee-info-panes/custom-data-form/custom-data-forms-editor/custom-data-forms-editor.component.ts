import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { CustomDataFormsEditorService } from './custom-data-forms-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '../../../../constants';
import { ISelectOption } from '@nutela/models/core-data';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';
import { isProcessingCustomDataForm, ProcessingCustomDataForm, SaveCustomDataForm, AddCustomDataForm, NotProcessingCustomDataForm, SubmitCustomDataForm, isProcessingAltCustomDataForm, ProcessingAltCustomDataForm } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-custom-data-forms-editor',
  templateUrl: './custom-data-forms-editor.component.html',
  styleUrls: ['./custom-data-forms-editor.component.scss'],
  providers: [CustomDataFormsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDataFormsEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICustomDataForm;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  isProcessingAlt$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(
    public utilService: UtilService,
    public fs: CustomDataFormsEditorService,
    private store: Store<IAppState>,
    public dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomDataForm));
    this.isProcessingAlt$ = this.store.pipe(select(isProcessingAltCustomDataForm));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event) {}

  onRendererSubmit($event) {
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.data.json_text);
    for (const key of entries) {
      form_json.forEach(record => {
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.onSubmit(form_json);
  }

  onRendererSave($event) {
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.data.json_text);
    for (const key of entries) {
      form_json.forEach(record => {
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.onSave(form_json);
  }

  onSubmit(formJson) {
    const record_id = this.data.id;
    const form_id = this.data.form_id;
    const sumbitValues = {
      form_id: form_id,
      json_string: JSON.stringify(formJson)
    };
    if (this.data.id) {
      this.dialogBoxService.show(`Are you sure you want to submit this form?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ProcessingAltCustomDataForm());
          this.store.dispatch(
            new SubmitCustomDataForm({
              data: sumbitValues,
              recordId: record_id,
            })
          );
        }
      });
    } else {
      this.store.dispatch(new ShowToast({title: 'Data Could Not Be Submitted', message: `Status: Not Filled.`, type: ToastTypes.INFO}));
    }
  }

  onSave(formJson) {
    const record_id = this.data.id;
    const form_id = this.data.form_id;
    const sumbitValues = {
      form_id: form_id,
      json_string: JSON.stringify(formJson)
    };
    if (this.data.id) {
      this.store.dispatch(new ProcessingCustomDataForm());
      this.store.dispatch(
        new SaveCustomDataForm({
          data: sumbitValues,
          recordId: record_id,
          editMode: true
        })
      );
    } else {
      this.store.dispatch(new ProcessingCustomDataForm());
      this.store.dispatch(new AddCustomDataForm({ data: sumbitValues }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}
}
