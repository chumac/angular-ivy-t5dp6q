import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveDto, ILibraryObjective } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { HideViewerLibraryLoadObjectives } from '../../../store/planning';

@Component({
  selector: 'x365-fm-talent-library-load-objectives-viewer',
  templateUrl: './library-load-objectives-viewer.component.html',
  styleUrls: ['./library-load-objectives-viewer.component.scss']
})
export class LibraryLoadObjectivesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILibraryObjective;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerLibraryLoadObjectives());
  }

}
