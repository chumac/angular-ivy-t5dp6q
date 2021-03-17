
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getCourses, LoadCourses, getProfessionalQualifications, LoadProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { HrProfessionalQualificationEditorComponent } from './hr-professional-qualification-editor/hr-professional-qualification-editor.component';
import { HrProfessionalQualificationViewerComponent } from './hr-professional-qualification-viewer/hr-professional-qualification-viewer.component';
import { IEmployeesProfileState } from '../../../store/root';
import { ActivatedRoute } from '@angular/router';
import { showEditorProfessionalQualifications, showViewerProfessionalQualifications, getProfessionalQualificationsApprovedData, getProfessionalQualificationsAwaitingApprovalData, getProfessionalQualificationsDocument, ShowEditorProfessionalQualifications, LoadDocumentProfessionalQualifications, ShowViewerProfessionalQualifications, DeleteApprovedDataProfessionalQualifications, LoadInlineDocumentProfessionalQualifications, HideEditorProfessionalQualifications, HideViewerProfessionalQualifications, LoadApprovedDataProfessionalQualifications, LoadAwaitingApprovalDataProfessionalQualifications, ProcessingProfessionalQualifications, DeleteAwaitingApprovalDataProfessionalQualifications } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-professional-qualification',
  templateUrl: './hr-professional-qualification.component.html',
  styleUrls: ['./hr-professional-qualification.component.scss']
})
export class HrProfessionalQualificationComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];
  @Input() employeeId: number;

  professionalQualificationData$: Observable<IProfessionalQualification[]>;

  approvedData$: Observable<IProfessionalQualification[]>;
  awaitingApprovalData$: Observable<IProfessionalQualification[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;

   @ViewChild('editor') editor: HrProfessionalQualificationEditorComponent;
   @ViewChild('viewer') viewer: HrProfessionalQualificationViewerComponent;

   constructor(@Inject('partialDocumentTitle')
   private partialDocumentTitle: string,
   private titleService: Title,
   private store: Store<IEmployeesProfileState>,
   private dialogService: DialogService,
   private activatedRoute:ActivatedRoute) {
     titleService.setTitle(
       `${'HR Professional Qualification'}${this.partialDocumentTitle}`
     );
   }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadCourses());

      this.employeeId=this.activatedRoute.snapshot.params.employeeId;
      this.store.dispatch(new LoadApprovedDataProfessionalQualifications({employeeId:this.employeeId}));
      this.store.dispatch(new LoadAwaitingApprovalDataProfessionalQualifications({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingProfessionalQualifications());
    this.store.dispatch(new LoadProfessionalInstitutions());

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorProfessionalQualifications));
    this.showViewer$ = this.store.pipe(select(showViewerProfessionalQualifications));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.institutions$ = this.store.pipe(select(getProfessionalQualifications));
    this.courses$ = this.store.pipe(select(getCourses));


    this.approvedData$ = this.store.pipe(select(getProfessionalQualificationsApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getProfessionalQualificationsAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getProfessionalQualificationsDocument));
  }

  getApprovedData$(rowId: number): Observable<IProfessionalQualification> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.proqual_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IProfessionalQualification> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.proqual_id === rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorProfessionalQualifications());
      }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentProfessionalQualifications({recordId: rowId, isApproved: true, employeeId:result.employee_id}));
          }

          this.store.dispatch(new ShowViewerProfessionalQualifications());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentProfessionalQualifications({recordId: rowId, isApproved: false, employeeId:result.employee_id}));
          }

          this.store.dispatch(new ShowViewerProfessionalQualifications());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataProfessionalQualifications({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataProfessionalQualifications({recordId: rowId, employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataProfessionalQualifications({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataProfessionalQualifications({recordId: rowId, employeeId:this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentProfessionalQualifications({recordId: rowId, employeeId: result.employee_id, isApproved: true}));
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
            this.store.dispatch(new LoadInlineDocumentProfessionalQualifications({recordId: rowId, employeeId: result.employee_id, isApproved: false}));
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
    this.store.dispatch(new ShowEditorProfessionalQualifications());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorProfessionalQualifications());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProfessionalQualifications());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
