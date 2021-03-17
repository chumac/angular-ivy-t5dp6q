import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardDependantsEditorComponent } from './hr-reboard-dependants-editor/hr-reboard-dependants-editor.component';
import { HrReboardDependantsViewerComponent } from './hr-reboard-dependants-viewer/hr-reboard-dependants-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogService } from '@nutela/shared/ui';
import { showEditorHrReboardDependant, showViewerHrReboardDependant, getHrReboardDependantData, ShowEditorHrReboardDependant, getHrReboardDependantPhoto, ShowViewerHrReboardDependant, LoadPhotoHrReboardDependant, HideEditorHrReboardDependant, HideViewerHrReboardDependant, DeleteDataHrReboardDependant, LoadDataHrReboardDependant } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-dependants',
  templateUrl: './hr-reboard-dependants.component.html',
  styleUrls: ['./hr-reboard-dependants.component.scss']
})
export class HrReboardDependantsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  dependantData$: Observable<IDependant[]>;

  approvedData$: Observable<IDependant[]>;
  awaitingApprovalData$: Observable<IDependant[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: HrReboardDependantsEditorComponent;
  @ViewChild('viewer') viewer: HrReboardDependantsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches()
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardDependant));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardDependant));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.dependantData$ = this.store.pipe(select(getHrReboardDependantData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardDependant({ employeeId: this.employeeId}));
  }

  getRowData$(rowId: number): Observable<IDependant> {
    return this.dependantData$.pipe(
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  canEdit(): boolean {
    let status: boolean;
    if (this.reboardMode === 1 || this.reboardMode === 2) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1)).subscribe(dependant => {
      this.editor.data = dependant;
      this.editor.reset();
      this.store.dispatch(new ShowEditorHrReboardDependant());
    })
  }


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((dependant) => {
          this.viewer.data = dependant;
          this.store.dispatch(new LoadPhotoHrReboardDependant({recordId: rowId, employeeId: this.employeeId}));
          this.imageData$ = this.store.pipe(select(getHrReboardDependantPhoto));
          this.store.dispatch(new ShowViewerHrReboardDependant());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardDependant({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardDependant());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardDependant());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
