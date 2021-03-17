import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventDetail, ICourse, IEventDetailData, IEventDetailFaculty, IEventDetailType, IEventEmployee } from '@nutela/models/talent/learning';
import { DeleteDataEventDetail, LoadDataCourse, getEventEmployee, showNominationEditorEvent, ShowNominationEditorEvent, GetEventEmployee, PublishDataEventDetail, UnPublishDataEventDetail, GetEventDetailFaculty, getEventDetailFaculty, GetEventDetailType, getEventDetailType, getcourseData, showEditorEventDetail, eventDetailData, ShowEditorEventDetail, GetDataEventDetail, getEventDetailData, IEventDetailState, LoadDataEventDetail, HideEditorEventDetail, ShowCloseEditorEvent, showCloseEditorEvent, getEventParticipants, GetEventParticipants, HideCloseEditorEvent, GetEventEmployeeSuccess } from '../../../../store/setups';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { EventDetailEditorComponent } from './event-detail-editor/event-detail-editor.component';
import { EventDetailService } from './event-detail.service';
import { EventDetailCloseComponent } from './event-detail-close/event-detail-close.component';
import { IEventAllParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-detail-participants.interface';
import { EventDetailNominationComponent } from './event-detail-nomination/event-detail-nomination.component';

@Component({
  selector: 'x365-fm-talent-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],

})
export class EventDetailComponent implements OnInit {

  eventDetailData$: Observable<IEventDetail[]>;
  eventDetailType$: Observable<IEventDetailType[]>;
  eventDetailFaculty$: Observable<IEventDetailFaculty[]>;
  getEventDetailData$: Observable<IEventDetailData[]>;
  courseData$: Observable<ICourse[]>;
  allParticipants$: Observable<IEventAllParticiants[]>;
  allEmployee$: Observable<IEventEmployee[]>;
  showEditor$: Observable<boolean>;
  dropDownFilterValue: string;
  showCloseEditor$: Observable<boolean>;
  showNominationEditor$: Observable<boolean>;
  currentDate: Date;

  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('editor') editor: EventDetailEditorComponent;
  @ViewChild('close') close: EventDetailCloseComponent;
  @ViewChild('nomination') nomination: EventDetailNominationComponent;


  constructor(private store: Store<IAppState>, public service: EventDetailService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataEventDetail());
    this.store.dispatch(new LoadDataCourse());
    this.store.dispatch(new GetEventDetailType());
    this.store.dispatch(new GetEventEmployee());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorEventDetail());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEventDetail));
    this.eventDetailData$ = this.store.pipe(select(getEventDetailData));
    this.getEventDetailData$ = this.store.pipe(select(eventDetailData));
    this.courseData$ = this.store.pipe(select(getcourseData));
    this.eventDetailType$ = this.store.pipe(select(getEventDetailType));
    this.eventDetailFaculty$ = this.store.pipe(select(getEventDetailFaculty));
    this.allParticipants$ = this.store.pipe(select(getEventParticipants));
    this.allEmployee$ = this.store.pipe(select(getEventEmployee));
    this.showCloseEditor$ = this.store.pipe(select(showCloseEditorEvent));
    this.showNominationEditor$ = this.store.pipe(select(showNominationEditorEvent));
  }


  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataEventDetail());
    this.store.dispatch(new ShowToast({ title: null, message: `Event Detail Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  getRowData$(rowId: number): Observable<IEventDetailData> {
    return this.getEventDetailData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked() {
    this.editor.data = null;
    this.editor.setFieldvalueOnAdd();
    this.store.dispatch(new ShowEditorEventDetail());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.store.dispatch(new GetEventDetailFaculty({ recordId: rowId }));
    this.store.dispatch(new GetDataEventDetail({ recordId: rowId }));
    this.getRowData$(rowId).subscribe((result) => {
      if (result) {
        this.editor.data = result;
        this.editor.setFieldvalue(result);
        this.editor.reset();
        this.store.dispatch(new ShowEditorEventDetail());
        this.store.dispatch(new HideCloseEditorEvent());
      }

    }
    );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataEventDetail({ recordId: rowId }));
        }
      });
  }

  onCloseIconClicked(rowId: number) {
    this.close.data = null;
    this.store.dispatch(new GetDataEventDetail({ recordId: rowId }));
    this.getRowData$(rowId).subscribe((result) => {
      if (result) {
        this.close.data = result;
        this.close.setFieldvalue(rowId);
        this.close.reset();
        this.store.dispatch(new GetEventParticipants({ recordId: rowId }));
        this.store.dispatch(new ShowCloseEditorEvent());
      }
    }
    );
  }

  onNominationIconClicked(rowId: number) {
    this.nomination.data = null;
    this.nomination.setFieldvalue(rowId);
    this.nomination.reset();
    this.store.dispatch(new ShowNominationEditorEvent());
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

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onDownloadIconClicked(rowId: number) { }

  hasDocumentApproved(rowId: number): boolean {
    return false;
  }

  unsubscribe() { }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
