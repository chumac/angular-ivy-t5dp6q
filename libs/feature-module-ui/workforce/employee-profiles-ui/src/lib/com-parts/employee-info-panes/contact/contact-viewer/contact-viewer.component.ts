import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerContact, LoadAwaitingApprovalNextOfKinPhoto, getAwaitingApprovalNextOfKinPhoto } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-contact-viewer',
  templateUrl: './contact-viewer.component.html',
  styleUrls: ['./contact-viewer.component.scss']
})
export class ContactViewerComponent implements OnInit {
  nextOfKinPhoto$: Observable<any>;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IContact;
  @Input() public dataDoc: any;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadAwaitingApprovalNextOfKinPhoto());
    this.nextOfKinPhoto$ = this.store.pipe(select(getAwaitingApprovalNextOfKinPhoto));
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerContact());
  }
}
