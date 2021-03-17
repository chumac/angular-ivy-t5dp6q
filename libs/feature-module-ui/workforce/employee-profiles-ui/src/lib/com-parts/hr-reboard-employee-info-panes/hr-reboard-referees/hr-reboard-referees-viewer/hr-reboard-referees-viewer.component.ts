
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IReferee } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-referees-viewer',
  templateUrl: './hr-reboard-referees-viewer.component.html',
  styleUrls: ['./hr-reboard-referees-viewer.component.scss']
})
export class HrReboardRefereesViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IReferee;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  @Output() public cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
