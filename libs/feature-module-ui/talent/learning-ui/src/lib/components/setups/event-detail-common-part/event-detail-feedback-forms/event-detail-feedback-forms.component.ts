import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventDetailCustomForms, IEventDetailFeedbackForms, IEventDetailFeedbackRole, IEventDetailFormAvailability } from '@nutela/models/talent/learning';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LoadDataFeedbackForms, LoadDataFormAvailability, getFeedbackFormsAvailableData, getFeedbackFormsRoleData, LoadDataFormRole, LoadDataCustomForms, getCustomFormsData, LoadDataFeedbackFormsType, showEditorFeedbackForms, HideViewerFeedbackForms, DeleteDataFeedbackForms, showViewerFeedbackForms, getFeedbackFormsData, HideEditorFeedbackForms, ShowViewerFeedbackForms, ShowEditorFeedbackForms } from '../../../../../store';
import { FeedbackFormsService } from './event-detail-feedback-forms.service';
import { EventDetailFeedbackFormsEditorComponent } from './event-detail-feedback-forms-editor/event-detail-feedback-forms-editor.component';
import { EventDetailFeedbackFormsViewerComponent } from './event-detail-feedback-forms-viewer/event-detail-feedback-forms-viewer.component';

@Component({
  selector: 'x365-fm-talent-event-detail-feedback-forms',
  templateUrl: './event-detail-feedback-forms.component.html',
  styleUrls: ['./event-detail-feedback-forms.component.scss']
})
export class EventDetailFeedbackFormsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  FeedbackFormsData$: Observable<IEventDetailFeedbackForms[]>;
  CustomFormData$: Observable<IEventDetailCustomForms[]>;
  FeedbackFormsAvailableData$: Observable<IEventDetailFormAvailability[]>;
  FeedbackFormsRoleData$: Observable<IEventDetailFeedbackRole[]>;

  @Input() eventDetailId: number;
  @Input() isOpen: number;
  @Input() isReview: number;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: EventDetailFeedbackFormsEditorComponent;
  @ViewChild('viewer') viewer: EventDetailFeedbackFormsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: FeedbackFormsService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFeedbackForms({ recordId: this.eventDetailId }));
    this.store.dispatch(new LoadDataFeedbackFormsType);
    this.store.dispatch(new LoadDataCustomForms());
    this.store.dispatch(new LoadDataFormAvailability());
    this.store.dispatch(new LoadDataFormRole());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFeedbackForms));
    this.showViewer$ = this.store.pipe(select(showViewerFeedbackForms));
    this.FeedbackFormsData$ = this.store.pipe(select(getFeedbackFormsData));
    this.CustomFormData$ = this.store.pipe(select(getCustomFormsData));
    this.FeedbackFormsAvailableData$ = this.store.pipe(select(getFeedbackFormsAvailableData));
    this.FeedbackFormsRoleData$ = this.store.pipe(select(getFeedbackFormsRoleData));
  }

  getRowData$(rowId: number): Observable<IEventDetailFeedbackForms> {
    return this.FeedbackFormsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorFeedbackForms());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorFeedbackForms());
      }
      );
  }

  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataFeedbackForms({ recordId: this.eventDetailId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Pre Requisites Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFeedbackForms());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFeedbackForms());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerFeedbackForms());
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
          this.store.dispatch(new DeleteDataFeedbackForms({ recordId: rowId, eventDetailId: this.eventDetailId }));
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
