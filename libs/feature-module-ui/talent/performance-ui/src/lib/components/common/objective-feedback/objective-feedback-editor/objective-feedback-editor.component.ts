import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IFeedbackObjectiveMaster } from '@nutela/models/talent/performance';

@Component({
  selector: 'x365-objective-feedback-editor-objective-feedback-editor',
  templateUrl: './objective-feedback-editor.component.html',
  styleUrls: ['./objective-feedback-editor.component.scss'],
})
export class ObjectiveFeedbackEditorComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFeedbackObjectiveMaster;
  @Output() cancelClick = new EventEmitter<any>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(public utilService: UtilService, private fb: FormBuilder) { 
    this.form = this.buildForm();
  }

  ngOnInit() {
  }

  initFormValues(data) {
    this.form.patchValue(this.fieldData(data));
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id:[null],
      description: [null],
      metric: [null],
      target: [null],
      due_date: [null],
      weight: [null],
      }, {
        validator: []
      }
    );
  }

  fieldData(data: IFeedbackObjectiveMaster): IFeedbackObjectiveMaster | {} {
    if (data) {
      return {
        id:data.id,
        description: data.description,
        metric: data.metric,
        target: data.target,
        due_date: data.due_date,
        weight: data.weight,
      };
    } else {
      return {};
    }
  }


  onSubmit(){
    this.formSubmit.emit(this.form.value);
  }

  onCancel() {
    this.cancelClick.emit();
  }

}
