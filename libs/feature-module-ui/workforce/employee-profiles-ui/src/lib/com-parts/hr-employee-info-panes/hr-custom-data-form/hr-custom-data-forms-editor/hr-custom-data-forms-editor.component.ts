import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { HrCustomDataFormsEditorService } from './hr-custom-data-forms-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '../../../../constants';
import { ISelectOption } from '@nutela/models/core-data';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';
import { isProcessingHrCustomDataForm, ProcessingHrCustomDataForm, SaveHrCustomDataForm, AddHrCustomDataForm, NotProcessingHrCustomDataForm, SubmitHrCustomDataForm, ProcessingAltHrCustomDataForm, isProcessingAltHrCustomDataForm } from '../../../../store/employee-detailed-area';
import { IAppState } from '@nutela/store/app-state';
import { IEmployeesProfileState } from '../../../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-hr-custom-data-forms-editor',
  templateUrl: './hr-custom-data-forms-editor.component.html',
  styleUrls: ['./hr-custom-data-forms-editor.component.scss'],
  providers: [HrCustomDataFormsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HrCustomDataFormsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IHrCustomDataForm;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  isProcessingAlt$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public dialogBoxService: DialogBoxService,  public fs: HrCustomDataFormsEditorService, private store: Store<IEmployeesProfileState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHrCustomDataForm));
    this.isProcessingAlt$ = this.store.pipe(select(isProcessingAltHrCustomDataForm));
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

  onFileSelected($event){}

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

  onRendererSubmit($event) {
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.data.json_text);
    for (const key of entries) {
      form_json.forEach((record)=>{
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.onSubmit(form_json);
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
          this.store.dispatch(new ProcessingAltHrCustomDataForm());
          this.store.dispatch(
            new SubmitHrCustomDataForm({
              data: sumbitValues,
              recordId: record_id,
              employeeId: this.data.employee_id
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
      this.store.dispatch(new ProcessingHrCustomDataForm());
      this.store.dispatch(
        new SaveHrCustomDataForm({
          data: sumbitValues,
          recordId: record_id,
          editMode: true,
          employeeId: this.data.employee_id
        })
      );    
    } else {
      this.store.dispatch(new ProcessingHrCustomDataForm());
      this.store.dispatch(new AddHrCustomDataForm({ employeeId: this.data.employee_id, data: sumbitValues }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
