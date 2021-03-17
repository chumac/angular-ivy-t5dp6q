import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IExempt } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerExempt } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-exempts-viewer',
  templateUrl: './exempts-viewer.component.html',
  styleUrls: ['./exempts-viewer.component.scss']
})
export class ExemptsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IExempt;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerExempt());
  }
  
}
