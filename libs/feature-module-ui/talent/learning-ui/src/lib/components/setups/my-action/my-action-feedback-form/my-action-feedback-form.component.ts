import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IFeedBackForm } from '@nutela/models/talent/learning';
import { FeedbackFormEvent, ILearningState, ProcessingMyAction } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Observable } from 'rxjs';
import { IAppState } from '@nutela/store/app-state';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { take } from 'rxjs/operators';
import { BaseFormComponent, FILE_EXTENSIONS, ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-my-action-feedback-form-editor',
  templateUrl: './my-action-feedback-form.component.html',
  styleUrls: ['./my-action-feedback-form.component.scss'],
})

export class MyActionFeedbackFormComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public data: IFeedBackForm;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  isProcessingAlt$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>,
    public dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event) { }

  onRendererSubmit($event) {
    console.log('desctription', $event);
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.data[0].json_string);
    for (const key of entries) {
      form_json.forEach(record => {
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
    this.onSubmit($event);
  }

  onRendererSave($event) {
    const entries = Object.entries($event);
    const form_json = JSON.parse(this.data[0].json_string);
    for (const key of entries) {
      form_json.forEach(record => {
        if (record.field_name === key[0]) {
          record.value = key[1];
        }
      });
    }
  }

  onSubmit(formJson) {
    const record_id = this.data[0].id;
    const form_id = this.data[0].id;
    const sumbitValues = {
      id: form_id,
      json_string: JSON.stringify(formJson)
    };
    if (this.data[0].id) {
      this.dialogBoxService.show(`Are you sure you want to submit this form?`).pipe(take(1))
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.store.dispatch(
              new FeedbackFormEvent({
                data: sumbitValues,
                recordId: record_id,
              })
            );
          }
        });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Submitted', message: `Status: Not Filled.`, type: ToastTypes.INFO }));
    }
  }

  reset() {
  }

  ngOnDestroy() { }
}
