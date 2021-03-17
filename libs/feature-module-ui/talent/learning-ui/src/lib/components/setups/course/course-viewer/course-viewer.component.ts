import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ICourse } from '@nutela/models/talent/learning';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCourse } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICourse;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerCourse());
  }

}