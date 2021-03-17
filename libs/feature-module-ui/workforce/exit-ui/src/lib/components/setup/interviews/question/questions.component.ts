import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Title } from '@angular/platform-browser';
import { IExitState } from '../../../../store/root';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from './questions.service';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { take, map } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { ShowToast } from '@nutela/store/shared';
import { showEditorInterviewQuestion, ShowQuestionEditorInterview, HideQuestionEditorInterview } from '../../../../store/setup/interview';

@Component({
  selector: 'x365-fm-workforce-exit-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionData$: Observable<any[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showEditorForForm$: Observable<boolean>;

  multipleSelected = true;

  @ViewChild('editor') editor: QuestionEditorComponent;
  @ViewChild('interviewQuestionsGrid', { read: IgxGridComponent }) interviewQuestionsGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IExitState>,
    public service: QuestionsService,
    public route: ActivatedRoute,
    private router: Router,
  ) {
    titleService.setTitle(
      `${'Setup Exit Interview Questions'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.questionData$ = of([
      {
        question_id: 12,
        question_text: "In concrete terms could you state your intentions for wanting to leaving?",
        has_comment: "No",
        response_type: "Comment",
      },
      {
        question_id: 13,
        question_text: "what are the positives and negatives you are leaving with?",
        has_comment: "No",
        response_type: "Comment",
      },
      {
        question_id: 14,
        question_text: "Have u submitted your laptop?",
        has_comment: "No",
        response_type: "Yes/No",
      },
      {
        question_id: 15,
        question_text: "How has your experience been working with Xceed365?",
        has_comment: "Yes",
        response_type: "Multiple Selection",
      },
    ])

    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.select(pipe(showEditorInterviewQuestion));
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

    if (this.interviewQuestionsGrid) {
      this.service.search(this.interviewQuestionsGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<any> {
    return this.questionData$.pipe(
      map(d => d.filter(v => v.question_id === rowId)),
      map(e => e.shift())
    );
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.forms}`]);
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
  onAddButtonClicked() {
    this.store.dispatch(new ShowQuestionEditorInterview());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowQuestionEditorInterview());
      });
  }

  onCancelEditor() {
    this.store.dispatch(new HideQuestionEditorInterview());
  }

}
