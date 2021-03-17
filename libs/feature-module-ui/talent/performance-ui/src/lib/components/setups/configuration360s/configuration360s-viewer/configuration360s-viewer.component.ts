import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IConfiguration360 } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerConfiguration360 } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-configuration360s-viewer',
  templateUrl: './configuration360s-viewer.component.html',
  styleUrls: ['./configuration360s-viewer.component.scss']
})
export class Configuration360sViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IConfiguration360;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerConfiguration360());
  }
  
}
