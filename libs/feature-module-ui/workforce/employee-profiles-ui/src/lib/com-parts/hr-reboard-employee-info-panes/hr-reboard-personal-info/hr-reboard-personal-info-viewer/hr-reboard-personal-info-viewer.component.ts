import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { GENERAL } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-personal-info-viewer',
  templateUrl: './hr-reboard-personal-info-viewer.component.html',
  styleUrls: ['./hr-reboard-personal-info-viewer.component.scss']
})
export class HrReboardPersonalInfoViewerComponent implements OnInit {

  imageBaseHeader = `${GENERAL.pngBase64Header}`;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGeneral;
  @Input() public dataDoc: any;

  @Output() public cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
