import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { ILineManager } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerLineManager } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-line-managers-viewer',
  templateUrl: './line-managers-viewer.component.html',
  styleUrls: ['./line-managers-viewer.component.scss']
})
export class LineManagersViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILineManager;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerLineManager());
  }
  
}
