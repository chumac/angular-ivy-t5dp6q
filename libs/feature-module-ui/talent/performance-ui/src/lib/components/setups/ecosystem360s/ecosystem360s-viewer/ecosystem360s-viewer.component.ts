import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IEcosystem360 } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerEcosystem360 } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-ecosystem360s-viewer',
  templateUrl: './ecosystem360s-viewer.component.html',
  styleUrls: ['./ecosystem360s-viewer.component.scss']
})
export class Ecosystem360sViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IEcosystem360;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerEcosystem360());
  }
  
}
