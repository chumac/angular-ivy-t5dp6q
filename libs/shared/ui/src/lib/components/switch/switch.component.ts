import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() public checkedText = '';
  @Input() public unCheckedText = '';

  @Input() public checkedColor = '';
  @Input() public unCheckedColor = '';

  @Output() switch = new EventEmitter<boolean>();

  @ViewChild('switch') switchElement: ElementRef;

  mValue = false;

  constructor() {}

  ngOnInit() {}

  onChange($event) {
    this.mValue = $event.target.checked;
    this.switch.emit($event.target.checked);
  }

  get value(): boolean {
    return this.mValue;
  }
}
