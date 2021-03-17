import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter, Output } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { DxLookupComponent } from 'devextreme-angular';
import { ISchedule } from '@nutela/models/compensation/payment';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ClosedService } from './closed.service';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../store/root';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';
import { ScheduleViewerComponent } from '../schedule-viewer/schedule-viewer.component';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { getClosedScheduleData, ArchiveClosedSchedule, LoadingDataClosedSchedule, isLoadingClosedSchedule, showClosedScheduleViewer, LoadDataClosedSchedule, ShowViewerClosedSchedule, HideViewerClosedSchedule } from '../../store/closed';

@Component({
  selector: 'x365-fm-cmp-payment-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss'],
  providers: [ClosedService]
})
export class ClosedComponent implements OnInit {

  private subscriptions: ISubscriptions = {};
  hasPayrollProfile: boolean;

  @ViewChild("closedDataGrid") closedDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: DxLookupComponent;
  @ViewChild('viewer') viewer: ScheduleViewerComponent;

  @Output() showForm = new EventEmitter<any>();

  isLoading$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  closedData$: Observable<ISchedule[]>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ClosedService, private store: Store<IRootState>, private route: Router, private dialogBoxService: DialogBoxService) {
    titleService.setTitle(
      `${'Closed Schedule'}${this.partialDocumentTitle}`
    );
  };

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  };

  storeSelects() {
    this.closedData$ = this.store.pipe(select(getClosedScheduleData));
    this.isLoading$ = this.store.pipe(select(isLoadingClosedSchedule));
    this.showViewer$ = this.store.pipe(select(showClosedScheduleViewer));
  };

  storeDispatches() {
    this.store.dispatch(new LoadDataClosedSchedule());
    this.store.dispatch(new LoadingDataClosedSchedule());
  };

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.closedDataGrid) {
      this.service.search(this.closedDataGrid, searchString, filterBy);
    }
  };

  onRefresh() {
    this.store.dispatch(new LoadDataClosedSchedule());
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));

  };

  getRowData$(rowId: number): Observable<ISchedule> {
    return this.closedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  };

  onViewDetailIconClicked(rowID: number) {
    this.route.navigate([`${STANDARD_ROUTES.scheduleDetail}/${rowID}`]);
  };

  onViewIconClicked(rowID: number) {
    this.viewer.data = null;
    this.getRowData$(rowID).pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerClosedSchedule());
        }
      });
  };

  onAbandonIconClicked(rowID: number) {
    this.dialogBoxService.show(`Are you sure you want to Archive this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new LoadingDataClosedSchedule());
          this.store.dispatch(new ArchiveClosedSchedule({ recordId: rowID }));
        }
      });
  };

  onCancelViewer() {
    this.store.dispatch(new HideViewerClosedSchedule());
  };

}
