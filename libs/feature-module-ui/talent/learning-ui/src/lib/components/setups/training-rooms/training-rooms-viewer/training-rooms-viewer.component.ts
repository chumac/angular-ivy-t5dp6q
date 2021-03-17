import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ITrainingRooms } from '@nutela/models/talent/learning';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerTrainingRooms } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-training-rooms-viewer',
  templateUrl: './training-rooms-viewer.component.html',
  styleUrls: ['./training-rooms-viewer.component.scss']
})
export class TrainingRoomsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITrainingRooms;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerTrainingRooms());
  }

}
