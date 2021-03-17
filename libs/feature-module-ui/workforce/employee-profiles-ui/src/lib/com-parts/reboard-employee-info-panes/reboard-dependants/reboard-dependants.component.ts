import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardDependantsEditorComponent } from './reboard-dependants-editor/reboard-dependants-editor.component';
import { ReboardDependantsViewerComponent } from './reboard-dependants-viewer/reboard-dependants-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogService } from '@nutela/shared/ui';
import { showEditorReboardDependant, showViewerReboardDependant, getReboardDependantData, ShowEditorReboardDependant, getReboardDependantPhoto, ShowViewerReboardDependant, LoadPhotoReboardDependant, HideEditorReboardDependant, HideViewerReboardDependant, DeleteDataReboardDependant, LoadDataReboardDependant } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-dependants',
  templateUrl: './reboard-dependants.component.html',
  styleUrls: ['./reboard-dependants.component.scss']
})
export class ReboardDependantsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() reboardMode: number;

  dependantData$: Observable<IDependant[]>;

  approvedData$: Observable<IDependant[]>;
  awaitingApprovalData$: Observable<IDependant[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: ReboardDependantsEditorComponent;
  @ViewChild('viewer') viewer: ReboardDependantsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches()
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardDependant));
    this.showViewer$ = this.store.pipe(select(showViewerReboardDependant));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.dependantData$ = this.store.pipe(select(getReboardDependantData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardDependant());
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
      this.store.dispatch(new ShowEditorReboardDependant());
    })
  }


  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((dependant) => {
          this.viewer.data = dependant;
          this.store.dispatch(new LoadPhotoReboardDependant({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getReboardDependantPhoto));
          this.store.dispatch(new ShowViewerReboardDependant());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardDependant({ recordId: rowId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardDependant());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardDependant());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
