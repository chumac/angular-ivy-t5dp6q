import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { HideViewerContact } from '../../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../../store';


@Component({
  selector: 'x365-fm-workforce-hr-contact-viewer',
  templateUrl: './hr-contact-viewer.component.html',
  styleUrls: ['./hr-contact-viewer.component.scss']
})
export class HrContactViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IContact;
  @Input() public dataDoc: any;

  constructor(
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>
  ) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerContact());
  }
}
