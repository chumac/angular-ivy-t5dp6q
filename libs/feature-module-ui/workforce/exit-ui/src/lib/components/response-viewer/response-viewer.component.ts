import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IExitState } from '../../store/root';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import {
  showChecklistViewerResign,
  getResignationReviewChecklist,
} from '../../store/resign';
import { Observable, pipe } from 'rxjs';
import { IReviewChecklist, IResponse, IResignationSubmitted } from 'libs/models/workforce/exit/src/lib/interfaces';

@Component({
  selector: 'x365-fm-workforce-exit-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.scss']
})
export class ResponseViewerComponent implements OnInit {
  showChecklistViewer$: Observable<boolean>;
  checklistData$: Observable<IReviewChecklist[]>;

  @Input() public responseData: IResponse[];
  @Input() public data: IResignationSubmitted;
  @Input() public show: boolean;
  @Input() public isAdmin: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(
    public utilService: UtilService,
    private store: Store<IExitState>
  ) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showChecklistViewer$ = this.store.select(
      pipe(showChecklistViewerResign)
    );
    this.checklistData$ = this.store.select(
      pipe(getResignationReviewChecklist)
    );
  }

  storeDispatches() {
    // this.store.dispatch(new LoadReviewChecklistDataResignation());
  }

  onViewChecklistClicked() {

  }
  onDoneClicked() {
    this.cancelClick.emit();
  }

}
