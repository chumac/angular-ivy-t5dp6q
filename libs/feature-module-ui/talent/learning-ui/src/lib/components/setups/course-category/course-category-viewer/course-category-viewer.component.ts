import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { ICourseCategory } from '@nutela/models/talent/learning';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCourseCategory } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-course-category-viewer',
  templateUrl: './course-category-viewer.component.html',
  styleUrls: ['./course-category-viewer.component.scss']
})
export class CourseCategoryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ICourseCategory;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerCourseCategory());
  }

}
