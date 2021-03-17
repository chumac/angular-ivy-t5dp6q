import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IRoleWeight } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorRoleWeight, showViewerRoleWeight, getRoleWeightData, LoadDataRoleWeight, ShowEditorRoleWeight, HideEditorRoleWeight, DeleteDataRoleWeight, ShowViewerRoleWeight } from '../../../store/setups';
import { RoleWeightsEditorComponent } from './role-weights-editor/role-weights-editor.component';
import { RoleWeightsViewerComponent } from './role-weights-viewer/role-weights-viewer.component';

@Component({
  selector: 'x365-fm-talent-role-weights',
  templateUrl: './role-weights.component.html',
  styleUrls: ['./role-weights.component.scss']
})
export class RoleWeightsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  roleWeightData$: Observable<IRoleWeight[]>;

  @ViewChild('editor') editor: RoleWeightsEditorComponent;
  @ViewChild('viewer') viewer: RoleWeightsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataRoleWeight());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorRoleWeight));
    this.showViewer$ = this.store.pipe(select(showViewerRoleWeight));
    this.roleWeightData$ = this.store.pipe(select(getRoleWeightData));
  }

  getRowData$(rowId: number): Observable<IRoleWeight> {
    return this.roleWeightData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorRoleWeight());
  }

  onResetButtonClicked(){
    this.store.dispatch(new LoadDataRoleWeight());
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorRoleWeight());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerRoleWeight());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataRoleWeight({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorRoleWeight());
  }

  onCancelViewer() {

  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
