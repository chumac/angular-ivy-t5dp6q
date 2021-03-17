import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectOptionData } from '@nutela/models/common';
import { IDocumentTags } from '@nutela/models/platform/lookup';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadDocumentTagsData, getDocumentTags, showEditorDocumentTags, HideEditorDocumentTags, ShowEditorDocumentTags, DeleteDocumentTags, isProcessingDocumentTags, ProcessingDocumentTags } from '../../store';
import { map, take } from 'rxjs/operators';
import { DocumentTagsEditorComponent } from './document-tags-editor/document-tags-editor.component';
import { DocumentTagsService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-document-tags',
  templateUrl: './document-tags.component.html',
  styleUrls: ['./document-tags.component.scss']
})
export class DocumentTagsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  public documentTagsData$: Observable<IDocumentTags[]>;
  dropDownFilterValue:string;
  @ViewChild('TagGrid') TagGrid: IgxGridComponent;

   @ViewChild('editor') editor: DocumentTagsEditorComponent;

   constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public documentTagService: DocumentTagsService,) {
                titleService.setTitle(
                  `${'Document Tags'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDocumentTagsData());
    this.store.dispatch(new ProcessingDocumentTags());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorDocumentTags));
    this.documentTagsData$ = this.store.pipe(select(getDocumentTags));
    this.isProcessing$=this.store.pipe(select(isProcessingDocumentTags));
  }

  getRowDocumentTagsData$(rowId: number): Observable<IDocumentTags> {
    console.log('data row', rowId);
    return this.documentTagsData$.pipe(
      map(d => d.filter(v => v.tag_id === rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowDocumentTagsData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorDocumentTags());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDocumentTags({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorDocumentTags());
  }


  onAdd(){
    this.documentTagService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.documentTagService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.TagGrid) {
      if (filterValue) {
        this.TagGrid.clearFilter();
        this.TagGrid.filteringLogic = FilteringLogic.Or;
        this.TagGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.TagGrid.clearFilter();
        this.TagGrid.filteringLogic = FilteringLogic.Or;
        this.TagGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
