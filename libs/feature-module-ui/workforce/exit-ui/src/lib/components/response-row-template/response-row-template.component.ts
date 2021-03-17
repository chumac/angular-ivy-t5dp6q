import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { ISelectOption } from '@nutela/models/core-data';
import { IResponseRowData } from '../../interfaces';

@Component({
  selector: 'x365-fm-workforce-exit-response-row-template',
  templateUrl: './response-row-template.component.html',
  styleUrls: ['./response-row-template.component.scss']
})
export class ResponseRowTemplateComponent implements OnInit, AfterViewInit {

  @Input() public index: number = null;
  @Input() public data: IResponseRowData;
  @Input() public selectedOption: ISelectOption;
  @Input() public optionValues: ISelectOption;
  @Input() public validatorComment: string;
  @Input() public isSelfService: boolean = false
  @Input() public isMyData: boolean = false

  @Input() public useInputTextForRating: boolean;

  @Output() validityCheck = new EventEmitter()
  @Output() redirectItem = new EventEmitter()

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setValidation();
  }

  onOptionSelected(event) {
    this.validityCheck.emit()
  }

  setValidation() {
    this.validityCheck.emit()
  }

  onRedirectSingle() {
    this.redirectItem.emit([this.data])
  }
}
