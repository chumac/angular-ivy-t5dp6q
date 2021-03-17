import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventDetailFacilitators, IEventDetailFacilitatorsType } from '@nutela/models/talent/learning';
import { DeleteDataFacilitators, LoadDataFacilitatorsType, getFacilitatorsTypeData, HideEditorFacilitators, HideViewerFacilitators, ShowViewerFacilitators, showEditorFacilitators, showViewerFacilitators, getFacilitatorsData, ShowEditorFacilitators, LoadDataFacilitators, LoadDocumentFacilitators, LoadImageFacilitators } from '../../../../../store/setups';
import { FacilitatorsService } from './event-detail-facilitators.service';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { EventDetailFacilitatorsEditorComponent } from './event-detail-facilitators-editor/event-detail-facilitators-editor.component';
import { EventDetailFacilitatorsViewerComponent } from './event-detail-facilitators-viewer/event-detail-facilitators-viewer.component';

@Component({
  selector: 'x365-fm-talent-event-detail-facilitators',
  templateUrl: './event-detail-facilitators.component.html',
  styleUrls: ['./event-detail-facilitators.component.scss'],
  providers: [FacilitatorsService],
})
export class EventDetailFacilitatorsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  FacilitatorsData$: Observable<IEventDetailFacilitators[]>;
  FacilitatorsTypeData$: Observable<IEventDetailFacilitatorsType[]>;
  dropDownFilterValue: string;

  @Input() eventDetailId: number;
  @Input() isReview: number;

  @ViewChild('editor') editor: EventDetailFacilitatorsEditorComponent;
  @ViewChild('viewer') viewer: EventDetailFacilitatorsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: FacilitatorsService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFacilitators));
    this.showViewer$ = this.store.pipe(select(showViewerFacilitators));
    this.FacilitatorsData$ = this.store.pipe(select(getFacilitatorsData));
    this.FacilitatorsTypeData$ = this.store.pipe(select(getFacilitatorsTypeData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFacilitators({ recordId: this.eventDetailId }));
    this.store.dispatch(new LoadDataFacilitatorsType());

  }

  getRowData$(rowId: number): Observable<IEventDetailFacilitators> {
    return this.FacilitatorsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorFacilitators());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorFacilitators());
      }
      );
  }

  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataFacilitators({ recordId: this.eventDetailId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Faculty Nomination Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFacilitators());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFacilitators());
  }

  onViewIconClicked(rowId: number, doc_guid, img_guid, doc_ext, img_ext) {
    this.viewer.data = null;
    this.store.dispatch(new LoadDocumentFacilitators({ docGuid: doc_guid, docExt: doc_ext }));
    this.store.dispatch(new LoadImageFacilitators({ docGuid: img_guid, docExt: img_ext }));
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerFacilitators());
      }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFacilitators({ recordId: rowId, eventDetailId: this.eventDetailId }));
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
