import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { IValidLocation } from '@nutela/models/workforce/leave';
import { HideViewerValidLocation } from '../../../../store/setups/valid-location';


@Component({
  selector: 'x365-fm-workforce-valid-locations-viewer',
  templateUrl: './valid-locations-viewer.component.html',
  styleUrls: ['./valid-locations-viewer.component.scss']
})
export class ValidLocationsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IValidLocation;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerValidLocation());
  }
  
}
