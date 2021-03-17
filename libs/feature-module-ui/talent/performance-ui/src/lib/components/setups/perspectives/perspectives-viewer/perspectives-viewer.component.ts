import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPerspective } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPerspective } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-perspectives-viewer',
  templateUrl: './perspectives-viewer.component.html',
  styleUrls: ['./perspectives-viewer.component.scss']
})
export class PerspectivesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPerspective;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerPerspective());
  }
  
}
