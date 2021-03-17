
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IFamily, IHrFamily } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { HrFamilyEditorComponent } from './hr-family-editor/hr-family-editor.component';
import { HrFamilyViewerComponent } from './hr-family-viewer/hr-family-viewer.component';
import { LoadAwaitingApprovalDataFamily, LoadApprovedDataFamily,
         showEditorFamily, showViewerFamily, getFamilyApprovedData,
         getFamilyAwaitingApprovalData, getFamilyDocument, ShowEditorFamily,
         LoadDocumentFamily, LoadApprovedPhotoFamily, getFamilyApprovedPhoto,
         ShowViewerFamily, LoadAwaitingApprovalPhotoFamily, getFamilyAwaitingApprovalPhoto,
         DeleteApprovedDataFamily,  LoadInlineDocumentFamily,
         HideEditorFamily, HideViewerFamily, DeleteAwaitingApprovalDataFamily, ProcessingFamily } from '../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../store/root';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-family',
  templateUrl: './hr-family.component.html',
  styleUrls: ['./hr-family.component.scss']
})
export class HrFamilyComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];

  approvedData$: Observable<IHrFamily[]>;
  awaitingApprovalData$: Observable<IHrFamily[]>;
  documentData$: Observable<any>;
  isProcessingData$: Observable<boolean>;
  imageData$: Observable<any>;
  inlineDocumentData$: Observable<any>;
  @Input() employeeId;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: HrFamilyEditorComponent;
  @ViewChild('viewer') viewer: HrFamilyViewerComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,
              private dialogService: DialogService) {
                titleService.setTitle(
                  `${'HR Family Information'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataFamily({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataFamily({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingFamily());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFamily));
    this.showViewer$ = this.store.pipe(select(showViewerFamily));
    this.isProcessingData$ = this.store.pipe(select(showViewerFamily));


    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getFamilyApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getFamilyAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getFamilyDocument));
    this.imageData$=this.store.pipe(select(getFamilyApprovedPhoto));
  }




  getApprovedData$(rowId: number): Observable<IHrFamily> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.family_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IFamily> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.family_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFamily());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentFamily({recordId: rowId, isApproved: true, employeeId:this.employeeId}));
          }
          this.store.dispatch(new LoadApprovedPhotoFamily({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getFamilyApprovedPhoto));

          this.store.dispatch(new ShowViewerFamily());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentFamily({recordId: rowId, isApproved: false, employeeId:this.employeeId}));
          }
          this.store.dispatch(new LoadAwaitingApprovalPhotoFamily({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getFamilyAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerFamily());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataFamily({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataFamily({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataFamily({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataFamily({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentFamily({recordId: rowId, isApproved: true, employeeId:this.employeeId}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentFamily({recordId: rowId, isApproved: false, employeeId:this.employeeId}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getApprovedData$(rowId)
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

  showEditor() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorFamily());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFamily());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFamily());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
