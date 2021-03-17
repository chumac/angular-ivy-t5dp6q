import { Component, OnInit, Input } from '@angular/core';
 
import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCommendation } from '../../../../../store/hr-transactions/commendation';


@Component({
  selector: 'x365-fm-workforce-commendations-viewer',
  templateUrl: './commendations-viewer.component.html',
  styleUrls: ['./commendations-viewer.component.scss']
})
export class CommendationsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICommendationTransaction;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCommendation());
  }
  
}
