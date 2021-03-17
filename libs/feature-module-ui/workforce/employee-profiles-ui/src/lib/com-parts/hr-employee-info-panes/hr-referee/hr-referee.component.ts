import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { HrRefereeViewerComponent } from './hr-referee-viewer/hr-referee-viewer.component';
import { HrRefereeEditorComponent } from './hr-referee-editor/hr-referee-editor.component';

import { IEmployeesProfileState } from '../../../store/root';
import { showEditorReferee, showViewerReferee, getRefereeApprovedData, getRefereeAwaitingApprovalData, getRefereeDocument, ShowEditorReferee, LoadDocumentReferee, LoadApprovedPhotoReferee, getRefereeApprovedPhoto, ShowViewerReferee, LoadAwaitingApprovalPhotoReferee, getRefereeAwaitingApprovalPhoto, DeleteApprovedDataReferee, RemoveAwaitingApprovalDataReferee, LoadInlineDocumentReferee, HideEditorReferee, HideViewerReferee, LoadApprovedDataReferee, LoadAwaitingApprovalDataReferee, ProcessingReferee, DeleteAwaitingApprovalDataReferee } from '../../../store/employee-detailed-area';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-referee',
  templateUrl: './hr-referee.component.html',
  styleUrls: ['./hr-referee.component.scss']
})
export class HrRefereeComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];
  @Input() employeeId:number;

  isProcessingData$: Observable<boolean>;
  approvedData$: Observable<IReferee[]>;
  awaitingApprovalData$: Observable<IReferee[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;
  imageData$: Observable<any>;

   @ViewChild('editor') editor: HrRefereeEditorComponent;
   @ViewChild('viewer') viewer: HrRefereeViewerComponent;

   constructor(@Inject('partialDocumentTitle')
   private partialDocumentTitle: string,
   private titleService: Title,
   private store: Store<IEmployeesProfileState>,
   private dialogService: DialogService) {
     titleService.setTitle(
       `${'HR Refeere'}${this.partialDocumentTitle}`
     );
   }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataReferee({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataReferee({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingReferee());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReferee));
    this.showViewer$ = this.store.pipe(select(showViewerReferee));

    this.approvedData$ = this.store.pipe(select(getRefereeApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getRefereeAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getRefereeDocument));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.imageData$= this.store.pipe(select(getRefereeApprovedPhoto));
  }




  getApprovedData$(rowId: number): Observable<IReferee> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.ref_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IReferee> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.ref_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorReferee());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentReferee({recordId: rowId, isApproved:true,employeeId:this.employeeId}));
          }

          this.store.dispatch(new LoadApprovedPhotoReferee({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getRefereeApprovedPhoto));
          this.store.dispatch(new ShowViewerReferee());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentReferee({recordId: rowId, isApproved:false, employeeId:this.employeeId}));
          }
          this.store.dispatch(new LoadAwaitingApprovalPhotoReferee({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getRefereeAwaitingApprovalPhoto));

          this.store.dispatch(new ShowViewerReferee());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataReferee({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataReferee({recordId: rowId, employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataReferee({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataReferee({recordId: rowId, employeeId:this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadDocIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReferee({recordId: rowId, isApproved:true, employeeId:this.employeeId}));
          }
        }
      );
  }

  onApprovedDownloadImageIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_passport === null || result.img_url_passport === '') {
            this.store.dispatch(new ShowToast({title: 'Image not Available', message: `There is no image attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadApprovedPhotoReferee({recordId: rowId, employeeId:this.employeeId}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReferee({recordId: rowId, isApproved:false, employeeId:this.employeeId}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document !== null || result.img_url_document === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  hasImageApproved(rowId: number):boolean {
    let status = false;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_passport !== null || result.img_url_passport === '') {
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
    this.store.dispatch(new ShowEditorReferee());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReferee());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReferee());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
