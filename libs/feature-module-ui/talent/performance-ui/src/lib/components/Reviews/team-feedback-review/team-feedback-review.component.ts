import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as constants from '../../../constants';
import { IPerformanceState } from '../../../store';
import { getLMTeamListFeedbackForm, getLoadingTeamFeedbackForm, LoadLMTeamFeedbackForm, isLoadingTeamFeedbackForm, SetMetadataFeedbackForm, LoadEmployeeInfoFeedbackFormSuccess } from '../../../store/reviews/feedback-form';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-team-feedback-review-team-feedback-review',
  templateUrl: './team-feedback-review.component.html',
  styleUrls: ['./team-feedback-review.component.scss']
})
export class TeamFeedbackReviewComponent implements OnInit {
  paramId: string;
  feedbackTeamReview$: Observable<IPersonal[]>
  isLoading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<IPerformanceState>, private location: Location, public router: Router) { }

  ngOnInit() {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new isLoadingTeamFeedbackForm(true));
    this.store.dispatch(new LoadLMTeamFeedbackForm(+this.paramId));
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(getLoadingTeamFeedbackForm));
    this.feedbackTeamReview$ = this.store.pipe(select(getLMTeamListFeedbackForm));
  }

  onAppraiseIconClicked(data: IPersonal) {
    this.store.dispatch(new LoadEmployeeInfoFeedbackFormSuccess({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_number: data.employee_number
      }));
    this.store.dispatch(new SetMetadataFeedbackForm({isEmp: false, isLm: true, isHr: false}));
    this.router.navigate([constants.MANAGE_OBJECTIVES_URLs.objectiveFeedbackUrl], { skipLocationChange: false });

  }

  onRefresh(){ 

  }

  goBack() {
    this.location.back();
  }

  search() {}

}
