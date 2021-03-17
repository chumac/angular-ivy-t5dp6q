import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { GradeService } from './grade.service';
import { IEmployeesProfileState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IGradeManagement } from '@nutela/models/workforce/employee-profiles';
import {
  ShowEditorGradeManagement,
  showEditorGradeManagement,
  HideEditorGradeManagement,
  getGradeManagementData,
  LoadDataGradeManagement,
  DeleteDataGradeManagement
} from '../../../store/setups/grade-management';
import { UtilService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { GradeEditorComponent } from './grade-editor/grade-editor.component';

@Component({
  selector: 'x365-fm-workforce-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  @ViewChild('gradeDataGrid') gradeDataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('editor') editor: GradeEditorComponent;

  gradeData$: Observable<IGradeManagement[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: GradeService,
    private store: Store<IEmployeesProfileState>,
    public utilService: UtilService,
    private dialogBoxService: DialogBoxService
  ) {
    titleService.setTitle(`${'Grade Management'}${this.partialDocumentTitle}`);
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorGradeManagement));
    this.gradeData$ = this.store.pipe(select(getGradeManagementData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataGradeManagement());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.gradeDataGrid) {
      this.service.search(this.gradeDataGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IGradeManagement> {
    return this.gradeData$.pipe(
      map(d => d.filter(v => v.grade_id === rowId)),
      map(e => e.shift())
    );
  }

  onAdd() {
    this.store.dispatch(new ShowEditorGradeManagement());
    console.log(this.editor.data);
  }

  onRefresh() {
    this.store.dispatch(new LoadDataGradeManagement());
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Data is being refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }

  onDeactivateIconClicked(rowId: number) {
    this.dialogBoxService
      .show(`Are you sure you want to deactivate this data?`)
      .pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.getRowData$(rowId)
            .pipe(take(1))
            .subscribe(result => {
              this.store.dispatch(
                new DeleteDataGradeManagement({ recordId: rowId })
              );
            });
        }
      });
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorGradeManagement());
      });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorGradeManagement());
  }
}
