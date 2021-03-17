import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { IEventDetailData } from '@nutela/models/talent/learning';
import { IAppState } from '@nutela/store/app-state';
import { eventDetailData, GetDataEventDetail, PublishDataEventDetail, UnPublishDataEventDetail } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { Observable } from 'rxjs';
import { EventDetailListingService } from './event-detail-data-listing.services';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-talent-event-detail-data-listing',
  templateUrl: './event-detail-data-listing.component.html',
  styleUrls: ['./event-detail-data-listing.component.scss']
})
export class EventDetailDataListingComponent implements OnInit {
  eventDetailData$: Observable<IEventDetailData[]>;
  isLoading$: Observable<boolean>;
  @Input() eventDetailId: number;
  @Input() isReview: number;

  constructor( 
    public service: EventDetailListingService, 
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService,
    private router: Router) {
    
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects(){
    this.eventDetailData$ = this.store.pipe(select(eventDetailData));
  }

  storeDispatches(){
    this.store.dispatch(new GetDataEventDetail({ recordId: this.eventDetailId }));
  }

  onPublishEvent(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to publish your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new PublishDataEventDetail({ recordId: rowId }));
      }
    });
  }

  onUnPublishEvent(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to Unpublish your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new UnPublishDataEventDetail({ recordId: rowId }));
      }
    });
  }
}
