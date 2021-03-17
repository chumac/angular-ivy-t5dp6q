import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-reboard-contact-viewer',
  templateUrl: './reboard-contact-viewer.component.html',
  styleUrls: ['./reboard-contact-viewer.component.scss']
})
export class ReboardContactViewerComponent implements OnInit {
  nextOfKinPhoto$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IContact;
  @Input() public dataDoc: any;
  @Output() public cancelClick = new EventEmitter<any>();

  constructor(
    public utilService: UtilService,
  ) {}

  ngOnInit() {

  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
