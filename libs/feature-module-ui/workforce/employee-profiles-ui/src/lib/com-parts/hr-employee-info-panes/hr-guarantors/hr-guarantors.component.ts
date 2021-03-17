import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { HrGuarantorsEditorComponent } from './hr-guarantors-editor/hr-guarantors-editor.component';
import { HrGuarantorsViewerComponent } from './hr-guarantors-viewer/hr-guarantors-viewer.component';
import { IEmployeesProfileState } from '../../../store/root';
import { ActivatedRoute } from '@angular/router';
import { showEditorGuarantor, showViewerGuarantor, getGuarantorApprovedData,
         getGuarantorAwaitingApprovalData, ShowEditorGuarantor, LoadApprovedPhotoGuarantor,
         getGuarantorApprovedPhoto, ShowViewerGuarantor, LoadAwaitingApprovalPhotoGuarantor,
         getGuarantorAwaitingApprovalPhoto, DeleteApprovedDataGuarantor,
         RemoveAwaitingApprovalDataGuarantor, LoadInlineDocumentGuarantor,
         HideEditorGuarantor, HideViewerGuarantor, LoadApprovedDataGuarantor,
         LoadAwaitingApprovalDataGuarantor, ProcessingGuarantor, DeleteAwaitingApprovalDataGuarantor, } from '../../../store/employee-detailed-area';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-guarantors',
  templateUrl: './hr-guarantors.component.html',
  styleUrls: ['./hr-guarantors.component.scss']
})
export class HrGuarantorsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];


  guarantorData$: Observable<IGuarantor[]>;

  approvedData$: Observable<IGuarantor[]>;
  awaitingApprovalData$: Observable<IGuarantor[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @Input() employeeId: number;
  @ViewChild('editor') editor: HrGuarantorsEditorComponent;
  @ViewChild('viewer') viewer: HrGuarantorsViewerComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<IEmployeesProfileState>,
              private activatedRoute:ActivatedRoute,
              private dialogService: DialogService) {
                titleService.setTitle(
                  `${'HR Guarantors'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

    this.employeeId = this.activatedRoute.snapshot.params.employeeId;
  }

  storeDispatches() {
    // this.store.dispatch(new LoadApprovedPhotoGuarantor());
    // this.store.dispatch(new LoadAwaitingApprovalPhotoGuarantor());

    this.employeeId=this.activatedRoute.snapshot.params.employeeId;
    this.store.dispatch(new LoadApprovedDataGuarantor({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataGuarantor({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingGuarantor());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorGuarantor));
    this.showViewer$ = this.store.pipe(select(showViewerGuarantor));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData))
    this.approvedData$ = this.store.pipe(select(getGuarantorApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getGuarantorAwaitingApprovalData));
  }

  getApprovedData$(rowId: number): Observable<IGuarantor> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.guarantor_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IGuarantor> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.guarantor_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorGuarantor());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new LoadApprovedPhotoGuarantor({recordId: rowId, employeeId: this.employeeId}));
          this.imageData$ = this.store.pipe(select(getGuarantorApprovedPhoto));
          this.store.dispatch(new ShowViewerGuarantor());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new LoadAwaitingApprovalPhotoGuarantor({recordId: rowId, employeeId: this.employeeId}));
          this.imageData$ = this.store.pipe(select(getGuarantorAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerGuarantor());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataGuarantor({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataGuarantor({recordId: rowId, employeeId: this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataGuarantor({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataGuarantor({recordId: rowId, employeeId: this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: false}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getApprovedData$(rowId)
      .subscribe((result) => {
          if (result.attach_document !== null || result.attach_document === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorGuarantor());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGuarantor());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
