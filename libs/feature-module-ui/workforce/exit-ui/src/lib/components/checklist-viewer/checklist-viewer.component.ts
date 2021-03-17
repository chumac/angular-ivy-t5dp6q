import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IExitState } from '../../store/root';
import { LoadLetterResign, getResignationLetter } from '../../store/resign';
import { take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { Observable, pipe } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorValidate, ShowValidateEditor, HideValidateEditor } from '../../store/resignation';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnel } from 'libs/store/modules/foundation/src/lib/select-option-data';
import { IResignationLetter } from '../../interfaces';
import { CloseAllChecklists } from '../../store/hr-resignation';

@Component({
  selector: 'x365-fm-workforce-exit-checklist-viewer',
  templateUrl: './checklist-viewer.component.html',
  styleUrls: ['./checklist-viewer.component.scss']
})
export class ChecklistViewerComponent implements OnInit {
  @Input() public checklistData: any[];
  @Input() public show: boolean;
  @Input() public isAdmin: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public employeeId: any;
  @Input() public resignation: IResignationLetter;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() separateClick = new EventEmitter<any>();
  @Output() bulkValidateClick = new EventEmitter<any>();

  showEditor$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;

  resignationApplication$: Observable<IResignationLetter[]>;
  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(
    public utilService: UtilService,
    private store: Store<IExitState>, public dialog: MatDialog, private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.resignationApplication$ = this.store.select(
      pipe(getResignationLetter)
    );
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorValidate));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }

  onSeparateClicked() {
    // this.store.dispatch(new LoadLetterResign());
    // this.resignationApplication$.pipe(take(1)).subscribe(data => {
    //   if (data == null || data.length == 0) {
    //     new ShowToast({
    //       title: null,
    //       message: `Resignation Letter not available yet.`,
    //       type: ToastTypes.INFO
    //     });
    //   } else {
    //     console.log(data[0])
    //     this.openModal(data[0]);
    //   }
    // });
  }

  onValidateIconClicked(val) {
    this.store.dispatch(new ShowValidateEditor());
  }

  openModal(result: IResignationLetter): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }
  onCloseAllClicked() {
    this.dialogService.show(this.dialogService.options(), `This action will close resignation process for all employee. Continue?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new CloseAllChecklists({ employeeId: this.employeeId, resignationId: this.resignation.id }));
      }
    })

  }

  onCancelClicked() {
    this.cancelClick.emit();
  }
  onCancelEditor() {
    this.store.dispatch(new HideValidateEditor());
  }
}
