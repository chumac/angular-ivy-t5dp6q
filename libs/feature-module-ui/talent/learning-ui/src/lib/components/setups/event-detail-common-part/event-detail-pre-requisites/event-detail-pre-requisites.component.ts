import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventDetailPreRequisites, ICourse, IEventDetailPreRequisitesType } from '@nutela/models/talent/learning';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LoadDataPreRequisites, getcourseData, LoadDataCourse, LoadDataPreRequisitesType, getPreRequisitesTypeData, showEditorPreRequisites, HideViewerPreRequisites, DeleteDataPreRequisites, showViewerPreRequisites, getPreRequisitesData, HideEditorPreRequisites, ShowViewerPreRequisites, ShowEditorPreRequisites, LoadDataPreRequisitesTypeSuccess } from '../../../../../store';
import { PreRequisitesService } from './event-detail-pre-requisites.service';
import { EventDetailPreRequisitesEditorComponent } from './event-detail-pre-requisites-editor/event-detail-pre-requisites-editor.component';
import { EventDetailPreRequisitesViewerComponent } from './event-detail-pre-requisites-viewer/event-detail-pre-requisites-viewer.component';

@Component({
  selector: 'x365-fm-talent-event-detail-pre-requisites',
  templateUrl: './event-detail-pre-requisites.component.html',
  styleUrls: ['./event-detail-pre-requisites.component.scss']
})
export class EventDetailPreRequisitesComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  PreRequisitesData$: Observable<IEventDetailPreRequisites[]>;
  PreRequisitesDataType$: Observable<IEventDetailPreRequisitesType[]>;
  courseData$: Observable<ICourse[]>;

  @Input() eventDetailId: number;
  @Input() isReview: number;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: EventDetailPreRequisitesEditorComponent;
  @ViewChild('viewer') viewer: EventDetailPreRequisitesViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: PreRequisitesService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPreRequisites({ recordId: this.eventDetailId }));
    this.store.dispatch(new LoadDataPreRequisitesType);
    this.store.dispatch(new LoadDataCourse());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPreRequisites));
    this.showViewer$ = this.store.pipe(select(showViewerPreRequisites));
    this.PreRequisitesData$ = this.store.pipe(select(getPreRequisitesData));
    this.PreRequisitesDataType$ = this.store.pipe(select(getPreRequisitesTypeData));
    this.courseData$ = this.store.pipe(select(getcourseData));
  }

  getRowData$(rowId: number): Observable<IEventDetailPreRequisites> {
    return this.PreRequisitesData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorPreRequisites());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorPreRequisites());
      }
      );
  }

  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataPreRequisites({ recordId: this.eventDetailId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Pre Requisites Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPreRequisites());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPreRequisites());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPreRequisites());
      }
      );
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onDeleteIconClicked(rowId: number) {
    console.log(rowId);
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPreRequisites({ recordId: rowId, eventDetailId: this.eventDetailId }));
        }
      });
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

}
