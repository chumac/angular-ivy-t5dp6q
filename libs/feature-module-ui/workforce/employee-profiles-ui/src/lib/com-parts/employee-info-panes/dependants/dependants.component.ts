import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadApprovedDataDependantSuccess, LoadAwaitingApprovalDataDependantSuccess, HideEditorDependant, ShowEditorDependant, ShowViewerDependant, HideViewerDependant, DeleteApprovedDataDependant, RemoveAwaitingApprovalDataDependant, getDependantData, showEditorDependant, showViewerDependant, getDependantApprovedData, getDependantAwaitingApprovalData, LoadApprovedDataItemDependant, getDependantApprovedDataMap, LoadApprovedPhotoDependant, getDependantApprovedPhoto, LoadAwaitingApprovalPhotoDependant, getDependantAwaitingApprovalPhoto, LoadDataDependant, DeleteAwaitingApprovalDataDependant } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { DependantsEditorComponent } from './dependants-editor/dependants-editor.component';
import { DependantsViewerComponent } from './dependants-viewer/dependants-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-workforce-dependants',
  templateUrl: './dependants.component.html',
  styleUrls: ['./dependants.component.scss']
})
export class DependantsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  dependantData$: Observable<IDependant[]>;

  approvedData$: Observable<IDependant[]>;
  awaitingApprovalData$: Observable<IDependant[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: DependantsEditorComponent;
  @ViewChild('viewer') viewer: DependantsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.getGridData();
    this.pushApprovedDataToStore();
    this.store.dispatch(new LoadDataDependant());

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDependant));
    this.showViewer$ = this.store.pipe(select(showViewerDependant));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.dependantData$ = this.store.pipe(select(getDependantData));

    this.approvedData$ = this.store.pipe(select(getDependantApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getDependantAwaitingApprovalData));
  }


  approvedDataList():Observable<IDependant[]>  {
    return this.dependantData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList():Observable<IDependant[]>  {
    return this.dependantData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)));
  }

  pushApprovedDataToStore() {
    this.approvedDataList()
      .subscribe((list: IDependant[]) => {
        list.forEach((data: IDependant) => this.store.dispatch(new LoadApprovedDataItemDependant({recordId: data.dependent_id})));
      }
    );
  }

  getGridData() {
    this.dependantData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataDependantSuccess(result));
          }
        );

    this.dependantData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataDependantSuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IDependant> {
    return this.dependantData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IDependant> {
    return this.dependantData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IDependant> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getDependantApprovedDataMap), take(1))
      .subscribe((data: {[key: number]: IDependant}) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorDependant());
        }
      })
  }


  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadApprovedPhotoDependant({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getDependantApprovedPhoto));
          this.store.dispatch(new ShowViewerDependant());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadAwaitingApprovalPhotoDependant({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getDependantAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerDependant());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataDependant({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataDependant({ recordId: rowId }));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data awaiting approval?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataDependant({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataDependant({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataDependant({recordId: rowId}));
    //     }
    //   });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorDependant());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerDependant());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
