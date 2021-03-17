import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ITrainingRooms } from '@nutela/models/talent/learning';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LoadDataTrainingRooms, showEditorTrainingRooms, HideViewerTrainingRooms, DeleteDataTrainingRooms, showViewerTrainingRooms, getTrainingRoomsData, HideEditorTrainingRooms, ShowViewerTrainingRooms, ShowEditorTrainingRooms  } from '../../../../store';
import { TrainingRoomsService } from './training-rooms.service';
import { TrainingRoomsEditorComponent } from './training-rooms-editor/training-rooms-editor.component';
import { TrainingRoomsViewerComponent } from './training-rooms-viewer/training-rooms-viewer.component';

@Component({
  selector: 'x365-fm-talent-training-rooms',
  templateUrl: './training-rooms.component.html',
  styleUrls: ['./training-rooms.component.scss'],
  providers: [TrainingRoomsService],
})
export class TrainingRoomsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  trainingRoomsData$: Observable<ITrainingRooms[]>;

  dropDownFilterValue: string;

  @ViewChild('editor') editor: TrainingRoomsEditorComponent;
  @ViewChild('viewer') viewer: TrainingRoomsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: TrainingRoomsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataTrainingRooms());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTrainingRooms));
    this.showViewer$ = this.store.pipe(select(showViewerTrainingRooms));
    this.trainingRoomsData$ = this.store.pipe(select(getTrainingRoomsData));
  }

  getRowData$(rowId: number): Observable<ITrainingRooms> {
    return this.trainingRoomsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorTrainingRooms());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.editor.setCountryLists(result);
          this.store.dispatch(new ShowEditorTrainingRooms());
        }
      );
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataTrainingRooms());
    this.store.dispatch(new ShowToast({title: null, message: `Training Rooms Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTrainingRooms());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTrainingRooms());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTrainingRooms());
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
          this.store.dispatch(new DeleteDataTrainingRooms({recordId: rowId}));
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
