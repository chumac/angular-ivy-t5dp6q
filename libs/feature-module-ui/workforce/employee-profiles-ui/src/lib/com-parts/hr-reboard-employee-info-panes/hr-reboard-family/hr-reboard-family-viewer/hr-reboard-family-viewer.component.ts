
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IFamily } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-family-viewer',
  templateUrl: './hr-reboard-family-viewer.component.html',
  styleUrls: ['./hr-reboard-family-viewer.component.scss']
})
export class HrReboardFamilyViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFamily;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  @Output() public cancelClick: EventEmitter<any> = new EventEmitter();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
