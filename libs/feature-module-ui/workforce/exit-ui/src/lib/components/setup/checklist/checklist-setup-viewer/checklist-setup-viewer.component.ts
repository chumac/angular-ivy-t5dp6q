
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChecklistItem } from '../../../../interfaces';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-exit-checklist-setup-viewer',
  templateUrl: './checklist-setup-viewer.component.html',
  styleUrls: ['./checklist-setup-viewer.component.scss']
})
export class ChecklistSetupViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IChecklistItem;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
