import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IHurdle } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerHurdle } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-hurdles-viewer',
  templateUrl: './hurdles-viewer.component.html',
  styleUrls: ['./hurdles-viewer.component.scss']
})
export class HurdlesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IHurdle;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerHurdle());
  }
  
}
