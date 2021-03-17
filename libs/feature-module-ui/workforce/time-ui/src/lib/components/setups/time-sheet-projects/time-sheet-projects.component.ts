import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeSheetProjectsService } from './time-sheet-projects.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent, IgxStringFilteringOperand, FilteringLogic } from 'igniteui-angular';
import { TimesheetProjectEditorComponent } from './timesheet-project-editor/timesheet-project-editor.component';
import { TimesheetProjectViewerComponent } from './timesheet-project-viewer/timesheet-project-viewer.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorTimeSheetProject, showViewerTimeSheetProject, LoadDataTimeSheetProject, getTimeSheetProjectData, HideEditorTimeSheetProject, HideViewerTimeSheetProject, ShowViewerTimeSheetProject, DeleteDataTimeSheetProject, ShowEditorTimeSheetProject } from '../../../store/time-sheet-project';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-time-time-sheet-projects',
  templateUrl: './time-sheet-projects.component.html',
  styleUrls: ['./time-sheet-projects.component.scss'],
  providers: [TimeSheetProjectsService]
})
export class TimeSheetProjectsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  timeSheetProjectsData$: Observable<ITimeSheetProject[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: TimesheetProjectEditorComponent;
  @ViewChild('viewer') viewer: TimesheetProjectViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: TimeSheetProjectsService,  private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataTimeSheetProject());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTimeSheetProject));
    this.showViewer$ = this.store.pipe(select(showViewerTimeSheetProject));
    this.timeSheetProjectsData$ = this.store.pipe(select(getTimeSheetProjectData));
  }
  
  getRowData$(rowId: number): Observable<ITimeSheetProject> {
    return this.timeSheetProjectsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.showStructureTree = false;
    this.editor.reset();
    this.store.dispatch(new ShowEditorTimeSheetProject());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataTimeSheetProject());
    this.store.dispatch(new ShowToast({title: null, message: `Timesheet Projects Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.showStructureTree = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorTimeSheetProject());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTimeSheetProject());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    console.log(rowId);
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataTimeSheetProject({recordId: rowId}));
        }
      });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTimeSheetProject());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTimeSheetProject());
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

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

}
 