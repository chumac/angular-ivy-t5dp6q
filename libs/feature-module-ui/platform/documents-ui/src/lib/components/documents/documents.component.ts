import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentsService } from './documents.service';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import {
  LoadDataDocument,
  getDocumentData,
  ProcessingDocument,
  DownloadDocument,
  isProcessingDocument,
  LoadingDocument,
  isLoadingDocument,
  LoadDocumentType,
  getDocumentType
} from '../../store/document';
import { IDocument, IDocumentType } from '@nutela/models/platform/document';
import { map, take } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'x365-fm-plf-docs-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [DocumentsService],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ])
  ],
})
export class DocumentsComponent implements OnInit {
  documentType$: Observable<IDocumentType[]>;
  documentData$: Observable<IDocument[]>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isParentFolder: boolean = true;
  dropDownFilterValue: string;
  term: string;
  @ViewChild('documentsGrid') documentsGrid: IgxGridComponent;

  constructor(
    public service: DocumentsService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDocumentType());
    this.store.dispatch(new LoadingDocument());
  }

  storeSelects() {
    this.documentData$ = this.store.pipe(select(getDocumentData));
    this.documentType$ = this.store.pipe(select(getDocumentType));
    this.isProcessing$ = this.store.pipe(select(isProcessingDocument));
    this.isLoading$ = this.store.pipe(select(isLoadingDocument));
  }

  filter(term: string, filterValue: string) {
    if (this.documentsGrid) {
      if (filterValue) {
        this.documentsGrid.clearFilter();
        this.documentsGrid.filteringLogic = FilteringLogic.Or;
        this.documentsGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.documentsGrid.clearFilter();
        this.documentsGrid.filteringLogic = FilteringLogic.Or;
        this.documentsGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  getRowData$(rowId: number): Observable<IDocument> {
    return this.documentData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  downloadDocument(row: any) {
    this.getRowData$(row).pipe(take(1))
    .subscribe((result) => {
      this.store.dispatch(new ProcessingDocument());
      this.store.dispatch(new DownloadDocument({ docGuId: result.doc_guid, docExt: result.doc_extension}));
      }
    );
  }

  loadSubFolders(id: number) {
    this.isParentFolder = false;
    this.store.dispatch(new LoadDataDocument({recordId: id}));
  }

  loadFolders() {
    this.isParentFolder = true;
    this.store.dispatch(new LoadDocumentType());
  }

}
