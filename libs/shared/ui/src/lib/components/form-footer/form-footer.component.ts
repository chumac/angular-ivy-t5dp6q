import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  @Input() doneText = 'Done';
  @Input() busy = false;
  @Input() doneButtonDisabled = false;
  @Input() showPrimaryButton = true;

  @Input() secondaryButtonText = '';
  @Input() secondaryBusy = false;
  @Input() secondaryButtonDisabled = false;
  @Input() showSecondaryButton = false;

  @Input() showCancelButton = true;

  @Output() doneClick = new EventEmitter<any>();
  @Output() secondaryClick = new EventEmitter<any>();

  @Output() cancelClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onDoneClick() {
    if (!this.busy) {
      this.doneClick.emit();
    }
  }

  onSecondaryClick() {
    if (!this.secondaryBusy) {
      this.secondaryClick.emit();
    }
  }

  onCancelClick() {
    this.cancelClick.emit();
  }
}
