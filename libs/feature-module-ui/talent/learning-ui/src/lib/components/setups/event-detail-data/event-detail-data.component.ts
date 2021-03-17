import { Component, OnInit } from '@angular/core';
import { NavMenuItemTypes } from '../event-detail-common-part/event-detail-enumerations';
import { ActivatedRoute, Router } from '@angular/router';
import { PreRequisitesService } from './services/pre-requisites.service';
import { AssetsService } from './services/assets.service';
import { EventScheduleService } from './services/event-schedule.service';
import { EventDetailService } from './services/event-detail.service';
import { FacilitatorsService } from './services/facilitators.service';
import { FeedbackFormsService } from './services/feedback-forms.service';
import { EventParticipantService } from './services/event-participant.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { eventDetailData, GetDataEventDetail } from '../../../../store';
import { Location } from '@angular/common';
import { IEventDetailData } from 'libs/models/talent/learning/src/lib/interfaces/event-detail.interface';

@Component({
  selector: 'x365-fm-talent-event-detail-data',
  templateUrl: './event-detail-data.component.html',
  styleUrls: ['./event-detail-data.component.scss']
})
export class EventDetailDataComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    public preRequisitesService: PreRequisitesService,
    public assetsService: AssetsService,
    public facilitatorsService: FacilitatorsService,
    public feedbackFormsService: FeedbackFormsService,
    public scheduleService: EventScheduleService,
    public eventDetailService: EventDetailService,
    public eventParticipantService: EventParticipantService,
    private router: Router,
    private _location: Location,
    private store: Store<IAppState>,
  ) { }

  eventDetailData$: Observable<IEventDetailData[]>;
  selectedModuleId = NavMenuItemTypes.EVENT_DETAILS;

  showBack = true;
  addButtonStatus = false;
  editButtonStatus = false;
  awaitingButtonStatus = false;
  deleteButtonStatus = false;
  refreshButton = true;
  showAgreement: boolean = false;
  showEnableEditButtonStatus = false;
  eventDetailId = Number(this.route.snapshot.paramMap.get('id'));
  isReview: boolean = false;
  showAddParticipantCriteria = false;
  addParticipantCriteria = false;
  isOpen = false;

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    if ((this.router.url.search('event-review-data') !== -1) || this.router.url.search('event-view-data') !== -1) {
      this.isReview = false;
    } else {
      this.isReview = true;
    }
    if (this.router.url.search('event-open-data') !== -1) {
      this.isOpen = true;
    }
    if (this.isOpen) {
      this.selectedModuleId = NavMenuItemTypes.ASSETS;
      this.addButtonStatus = false;
      this.refreshButton = false;
      this.addParticipantCriteria = false;
    }
  }

  storeSelects() {
    this.eventDetailData$ = this.store.pipe(select(eventDetailData));
  }

  storeDispatches() {
    this.store.dispatch(new GetDataEventDetail({ recordId: this.eventDetailId }));
  }

  onNavMenuItemSelected($event) {
    this.selectedModuleId = $event;

    switch ($event) {
      case NavMenuItemTypes.EVENT_DETAILS: {
        this.addButtonStatus = false;
        this.refreshButton = true;
        this.addParticipantCriteria = false;
        break;
      }
      case NavMenuItemTypes.PARTICIPANTS: {
        this.addButtonStatus = true;
        this.addParticipantCriteria = true;
        this.refreshButton = true;
        break;
      }
      case NavMenuItemTypes.SCHEDULE:
      case NavMenuItemTypes.ASSETS: {
        if (this.isOpen) {
          this.addButtonStatus = false;
          this.addParticipantCriteria = false;
          this.refreshButton = false;
          break;
        }
      }
      case NavMenuItemTypes.PRE_REQUISITES:
      case NavMenuItemTypes.FACILITATORS:
      case NavMenuItemTypes.FEEDBACK_FORMS: {
        if (this.isOpen) {
          this.addButtonStatus = false;
          this.addParticipantCriteria = false;
          this.refreshButton = false;
          break;
        } else {
          this.setAllButtonsMode();
          break;
        }
      }
      default: {
        this.setAllButtonsMode();
        break;
      }
    }
  }

  setAllButtonsMode() {
    this.addButtonStatus = true;
    this.refreshButton = true;
    this.addParticipantCriteria = false;
  }

  onBackButtonClicked($event) {
    this._location.back();
  }

  onButtonClicked($event, eventDetailId = this.eventDetailId) {
    switch (this.selectedModuleId) {

      case NavMenuItemTypes.EVENT_DETAILS: {
        this.eventDetailService.commandProcessor($event, eventDetailId);
        break;
      }

      case NavMenuItemTypes.PRE_REQUISITES: {
        this.preRequisitesService.commandProcessor($event, eventDetailId);
        break;
      }
      case NavMenuItemTypes.ASSETS: {
        this.assetsService.commandProcessor($event, eventDetailId);
        break;
      }
      case NavMenuItemTypes.SCHEDULE: {
        this.scheduleService.commandProcessor($event, eventDetailId);
        break;
      }
      case NavMenuItemTypes.FEEDBACK_FORMS: {
        this.feedbackFormsService.commandProcessor($event, eventDetailId);
        break;
      }
      case NavMenuItemTypes.FACILITATORS: {
        this.facilitatorsService.commandProcessor($event, eventDetailId);
        break;
      }
      case NavMenuItemTypes.PARTICIPANTS: {
        this.eventParticipantService.commandProcessor($event, eventDetailId);
        break;
      }
      default:
        break;
    }
  }

}
