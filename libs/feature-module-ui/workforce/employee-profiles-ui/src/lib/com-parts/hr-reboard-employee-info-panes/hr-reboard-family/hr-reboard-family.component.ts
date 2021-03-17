
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardFamilyEditorComponent } from './hr-reboard-family-editor/hr-reboard-family-editor.component';
import { HrReboardFamilyViewerComponent } from './hr-reboard-family-viewer/hr-reboard-family-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorHrReboardFamily, showViewerHrReboardFamily, getHrReboardFamilyDocument, ShowEditorHrReboardFamily, LoadDocumentHrReboardFamily, LoadPhotoHrReboardFamily, HideViewerHrReboardFamily, HideEditorHrReboardFamily, LoadInlineDocumentHrReboardFamily, ShowViewerHrReboardFamily, getHrReboardFamilyPhoto, LoadDataHrReboardFamily, getHrReboardFamilyData, ClearViewerPhotoHrReboardFamily, ClearDocumentHrReboardFamily, DeleteDataHrReboardFamily } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-family',
  templateUrl: './hr-reboard-family.component.html',
  styleUrls: ['./hr-reboard-family.component.scss']
})
export class HrReboardFamilyComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;
  familyData$: Observable<IFamily[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: HrReboardFamilyEditorComponent;
  @ViewChild('viewer') viewer: HrReboardFamilyViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();

  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardFamily({ employeeId: this.employeeId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardFamily));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardFamily));
    this.imageData$ = this.store.pipe(select(getHrReboardFamilyPhoto));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.familyData$ = this.store.pipe(select(getHrReboardFamilyData));
    this.documentData$ = this.store.pipe(select(getHrReboardFamilyDocument));
  }

  getRowData$(rowId: number): Observable<IFamily> {
    return this.familyData$.pipe(
      map(d => d.filter(v => v.family_id === rowId)),
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

    this.getRowData$(rowId).pipe(take(1)).subscribe(member => {
      this.editor.data = member;
      this.editor.reset();
      this.editor.setCountryLists(member);
      this.store.dispatch(new ShowEditorHrReboardFamily());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHrReboardFamily({recordId: rowId, employeeId: this.employeeId}));
          }
          this.store.dispatch(new LoadPhotoHrReboardFamily({recordId: rowId, employeeId: this.employeeId}));
          this.store.dispatch(new ShowViewerHrReboardFamily());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardFamily({ familyId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardFamily({recordId: rowId, employeeId: this.employeeId}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url !== null || result.img_url === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardFamily());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardFamily());
    this.store.dispatch(new ClearViewerPhotoHrReboardFamily());
    this.store.dispatch(new ClearDocumentHrReboardFamily());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
