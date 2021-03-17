import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { IExitState } from '../../../../store/root';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '@nutela/core-services';
import { DialogBoxService } from '@nutela/shared/ui';
import { FormsService } from './forms.service';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { take, map } from 'rxjs/operators';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable, of, pipe } from 'rxjs';
import { showEditorInterviewQuestion, ShowQuestionEditorInterview, HideQuestionEditorInterview, showEditorInterviewForm, ShowFormEditorInterview, HideFormEditorInterview } from '../../../../store/setup/interview';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-exit-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  interviewFormsData$: Observable<any[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showEditorForQuestion$: Observable<boolean>;


  // @ViewChild('editor') editor: EnterpriseStructureTypeEditorComponent;
  @ViewChild('interviewFormsGrid')
  interviewFormsGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IExitState>,
    public service: FormsService,
    public router: ActivatedRoute,
    private route: Router,
    public utilService: UtilService,
    private dialogBoxService: DialogBoxService) {
    this.titleService.setTitle(
      `${'Setup Exit Interview Forms'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.interviewFormsData$ = of([
      {
        form_id: 2,
        title: "INTERVIEW FORM",
        description: 'Exit Interview Form',
        gradeInfo: 'OFFICERS',
      },
      {
        form_id: 3,
        title: "RESIGNATION FORM",
        description: 'Exit Interview Form',
        gradeInfo: 'EXPERTS'
      },
    ]);

    this.storeSelects();

  }

  storeSelects() {
    this.showEditorForQuestion$ = this.store.select(pipe(showEditorInterviewQuestion));
    this.showEditor$ = this.store.select(pipe(showEditorInterviewForm));
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

    if (this.interviewFormsGrid) {
      this.service.search(this.interviewFormsGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<any> {
    return this.interviewFormsData$.pipe(
      map(d => d.filter(v => v.form_id === rowId)),
      map(e => e.shift())
    );
  }

  onAdd() {
    this.store.dispatch(new ShowFormEditorInterview());
  }
  onRefresh() {
    // this.store.dispatch(
    //   new LoadEnterpriseStructureDetails({ recordId: this.structureId })
    // );
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Data is being refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }
  onViewIconClicked(rowId: number) { }
  onAddIconClicked(rowId: number) {
    this.store.dispatch(new ShowQuestionEditorInterview());
  }
  onEditIconClicked(rowId: number) { }

  onQuestionIconClicked(rowId: number) {
    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(val => {
        this.route.navigate([
          `${STANDARD_ROUTES.questions}/${
          val.title}`
        ]);
      });
  }

  onCancelEditor() {
    this.store.dispatch(new HideQuestionEditorInterview());
    this.store.dispatch(new HideFormEditorInterview());
  }
}
