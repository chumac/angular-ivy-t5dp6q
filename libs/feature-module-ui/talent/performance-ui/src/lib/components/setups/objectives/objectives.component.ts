import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorObjective, showViewerObjective, getObjectiveData, LoadDataObjective, ShowEditorObjective, HideEditorObjective, DeleteDataObjective, ShowViewerObjective } from '../../../store/setups/objective';
import { ObjectivesEditorComponent } from './objectives-editor/objectives-editor.component';
import { ObjectivesViewerComponent } from './objectives-viewer/objectives-viewer.component';

@Component({
  selector: 'x365-fm-talent-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  objectiveData$: Observable<IObjectiveDto[]>;

  @ViewChild('editor') editor: ObjectivesEditorComponent;
  @ViewChild('viewer') viewer: ObjectivesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataObjective());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorObjective));
    this.showViewer$ = this.store.pipe(select(showViewerObjective));
    this.objectiveData$ = this.store.pipe(select(getObjectiveData));
  }

  getRowData$(rowId: number): Observable<IObjectiveDto> {
    return this.objectiveData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorObjective());
  }

  onResetButtonClicked(){
    this.store.dispatch(new LoadDataObjective());
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorObjective());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerObjective());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataObjective({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorObjective());
  }

  onCancelViewer() {

  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
