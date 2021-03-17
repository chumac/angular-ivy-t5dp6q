import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IDependant, IHrDependant } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { HrDependantsEditorComponent } from './hr-dependants-editor/hr-dependants-editor.component';
import { HrDependantsViewerComponent } from './hr-dependants-viewer/hr-dependants-viewer.component';
import { showEditorDependant, showViewerDependant, getDependantApprovedData,
         getDependantAwaitingApprovalData, ShowEditorDependant,
         LoadApprovedPhotoDependant, getDependantApprovedPhoto, ShowViewerDependant,
         LoadAwaitingApprovalPhotoDependant, getDependantAwaitingApprovalPhoto,
         DeleteApprovedDataDependant,
         HideEditorDependant, HideViewerDependant, LoadApprovedDataDependant,
         ProcessingDependant, LoadAwaitingApprovalDataDependant, isProcessingDependant,
         DeleteAwaitingApprovalDataDependant } from '../../../store/employee-detailed-area'
import { IEmployeesProfileState } from '../../../store/root/employees-profile.state';
import { ActivatedRoute } from '@angular/router';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-dependants',
  templateUrl: './hr-dependants.component.html',
  styleUrls: ['./hr-dependants.component.scss']
})
export class HrDependantsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];


  approvedData$: Observable<IHrDependant[]>;
  awaitingApprovalData$: Observable<IHrDependant[]>;
  isProcessing$:Observable<boolean>;

  documentData$: Observable<any>;
  imageData$: Observable<any>;
  @Input() employeeId;

  @ViewChild('editor') editor: HrDependantsEditorComponent;
  @ViewChild('viewer') viewer: HrDependantsViewerComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,private store: Store<IEmployeesProfileState>,
  private dialogService: DialogService) {
    titleService.setTitle(
      `${'HR Dependants'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDependant));
    this.showViewer$ = this.store.pipe(select(showViewerDependant));
    this.isProcessing$=this.store.pipe(select(isProcessingDependant));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.approvedData$ = this.store.pipe(select(getDependantApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getDependantAwaitingApprovalData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataDependant({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataDependant({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingDependant());
  }

  getApprovedData$(rowId: number): Observable<IHrDependant> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IHrDependant> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.dependent_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorDependant());
      }
      );
}


  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadApprovedPhotoDependant({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getDependantApprovedPhoto));
          this.store.dispatch(new ShowViewerDependant());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadAwaitingApprovalPhotoDependant({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getDependantAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerDependant());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataDependant({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataDependant({recordId: rowId, employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataDependant({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataDependant({recordId: rowId, employeeId:this.employeeId}));
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
