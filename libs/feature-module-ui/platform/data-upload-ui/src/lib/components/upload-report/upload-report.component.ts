import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUploadStatus } from '@nutela/models/platform/data-upload';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { IDataUploadState } from '../../store/root';
import { Store, select } from '@ngrx/store';
import { LoadingUpload, LoadUploadStatus, getUploadStatus, isLoadingUpload } from '../../store/upload';
import { map } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { uploadStatusService } from './upload-report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'x365-fm-plf-dataupload-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.scss'],
  providers: [uploadStatusService]
})
export class UploadReportComponent implements OnInit {
  isLoading$: Observable<boolean>;
  uploadStatus$: Observable<IUploadStatus[]>;


  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("status") status: IgxGridComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private utilService: UtilService,
  public uploadStatus: uploadStatusService,
  private router: Router,
  private route: ActivatedRoute,
  private store: Store<IDataUploadState>
) {
  titleService.setTitle(
    `${'Upload Status'}${this.partialDocumentTitle}`
  );
}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.uploadStatus.Id=this.route.snapshot.params.id;
  this.store.dispatch(new LoadingUpload());
  this.store.dispatch(new LoadUploadStatus({Id:this.uploadStatus.Id}));
  }

  storeSelects() {
    this.uploadStatus$=this.store.pipe(select(getUploadStatus));
    this.isLoading$=this.store.pipe(select(isLoadingUpload));
  }

  getUploadStatus$(rowId: number): Observable<IUploadStatus> {
    return this.uploadStatus$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  goBack(){
    this.router.navigate([`${STANDARD_ROUTES.uploads}`])
  }

  onRefresh(){
    this.storeDispatches();
   this.store.dispatch(new ShowToast({title: null, message: `Upload Statusdata was Refreshed Successfully.`, type: ToastTypes.SUCCESS}),)
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

    if (this.status) {
      this.uploadStatus.search(this.status, searchString, filterBy);
    }
  }
}

