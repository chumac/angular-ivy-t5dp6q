import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ITemplateImport } from '@nutela/models/platform/data-upload';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IDataUploadState } from '../../store/root';
import { LoadTemplateData, LoadingUpload, getTemplate, isLoadingUpload, showViewerUpload, HideViewerUpload, ShowViewerUpload } from '../../store/upload';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { templateService } from './template.service';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { map, take } from 'rxjs/operators';
import { TemplateViewerComponent } from './template-viewer/template-viewer.component';

@Component({
  selector: 'x365-fm-plf-dataupload-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  providers: [templateService]
})
export class TemplateComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  template$: Observable<ITemplateImport[]>;


  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("template") template: IgxGridComponent;
  @ViewChild('viewer') viewer: TemplateViewerComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private utilService: UtilService,
  public templateImportService: templateService,
  private store: Store<IDataUploadState>
) {
  titleService.setTitle(
    `${'Template'}${this.partialDocumentTitle}`
  );
}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.store.dispatch(new LoadingUpload());
  this.store.dispatch(new LoadTemplateData);
  }

  storeSelects() {
    this.template$=this.store.pipe(select(getTemplate));
    this.showViewer$=this.store.pipe(select(showViewerUpload));
    this.isLoading$=this.store.pipe(select(isLoadingUpload));
  }

  getTemplateData$(rowId: number): Observable<ITemplateImport> {
    return this.template$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId){
    this.viewer.data = null;
    this.getTemplateData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if(result){
          this.viewer.data = result;
          if(result.upload_template){
            this.viewer.temp = result.upload_template;
          }
        }
        this.viewer.formatUploadTemplate();
        this.store.dispatch(new ShowViewerUpload());
        }
      );
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerUpload());
  }

  onRefresh(){
   this.store.dispatch(new LoadTemplateData);
   this.store.dispatch(new ShowToast({title: null, message: `Template data was Refreshed Successfully.`, type: ToastTypes.SUCCESS}),)
  }

  search() {
    let filterBy: string = '';
    let searchString:string='';
    if(this.searchInput){
     searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.template) {
      this.templateImportService.search(this.template, searchString, filterBy);
    }
  }
}


