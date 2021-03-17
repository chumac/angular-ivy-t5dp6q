
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardFamilyEditorComponent } from './reboard-family-editor/reboard-family-editor.component';
import { ReboardFamilyViewerComponent } from './reboard-family-viewer/reboard-family-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorReboardFamily, showViewerReboardFamily, getReboardFamilyDocument, ShowEditorReboardFamily, LoadDocumentReboardFamily, LoadPhotoReboardFamily, HideViewerReboardFamily, HideEditorReboardFamily, LoadInlineDocumentReboardFamily, ShowViewerReboardFamily, getReboardFamilyPhoto, LoadDataReboardFamily, getReboardFamilyData, ClearViewerPhotoReboardFamily, ClearDocumentReboardFamily, DeleteDataReboardFamily } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-family',
  templateUrl: './reboard-family.component.html',
  styleUrls: ['./reboard-family.component.scss']
})
export class ReboardFamilyComponent implements OnInit {

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

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: ReboardFamilyEditorComponent;
  @ViewChild('viewer') viewer: ReboardFamilyViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();

  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardFamily());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardFamily));
    this.showViewer$ = this.store.pipe(select(showViewerReboardFamily));
    this.imageData$ = this.store.pipe(select(getReboardFamilyPhoto));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.familyData$ = this.store.pipe(select(getReboardFamilyData));
    this.documentData$ = this.store.pipe(select(getReboardFamilyDocument));
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
      this.store.dispatch(new ShowEditorReboardFamily());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentReboardFamily({recordId: rowId, isApproved: true}));
          }
          this.store.dispatch(new LoadPhotoReboardFamily({recordId: rowId}));
          this.store.dispatch(new ShowViewerReboardFamily());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardFamily({ recordId: rowId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardFamily({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorReboardFamily());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardFamily());
    this.store.dispatch(new ClearViewerPhotoReboardFamily());
    this.store.dispatch(new ClearDocumentReboardFamily());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
