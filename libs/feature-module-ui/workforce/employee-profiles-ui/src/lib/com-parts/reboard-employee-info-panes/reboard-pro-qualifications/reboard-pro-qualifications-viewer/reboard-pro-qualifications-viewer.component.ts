
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-reboard-pro-qualifications-viewer',
  templateUrl: './reboard-pro-qualifications-viewer.component.html',
  styleUrls: ['./reboard-pro-qualifications-viewer.component.scss']
})
export class ReboardProQualificationsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfessionalQualification;
  @Input() public dataDoc: any;

  @Output() public cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
