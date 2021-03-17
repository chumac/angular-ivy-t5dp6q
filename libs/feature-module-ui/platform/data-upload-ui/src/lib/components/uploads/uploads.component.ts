import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpload } from '@nutela/models/platform/data-upload';
import { ISelectOption } from '@nutela/models/core-data';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { IDataUploadState } from '../../store/root';
import { Store, select } from '@ngrx/store';
import { LoadStatus, LoadingUpload, getUpload, isProcessingUpload, isLoadingUpload, getStatus, LoadUploadData, showEditorUpload, HideEditorUpload, ShowEditorUpload, showViewerUpload, HideViewerUpload, ShowViewerUpload, ReverseUpload, DeleteUpload, getCurrentStatus, LoadCurrentStatusSuccess } from '../../store/upload';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { UploadsViewerComponent } from './uploads-viewer/uploads-viewer.component';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-plf-dataupload-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  upload$: Observable<IUpload[]>;
  status$: Observable<ISelectOption[]>;
  currentStatus$: Observable<any>;
  selectedValue:number;

  @ViewChild('viewer') viewer: UploadsViewerComponent;


  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private utilService: UtilService,
  private dialogBoxService: DialogBoxService,
  private router: Router,
  private store: Store<IDataUploadState>
) {
  titleService.setTitle(
    `${'Uploads'}${this.partialDocumentTitle}`
  );
}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.selectedValue=this.selectedValue?this.selectedValue:0;
  this.store.dispatch(new LoadStatus());
  this.store.dispatch(new LoadingUpload());
  this.store.dispatch(new LoadUploadData({statusId:this.selectedValue}));
  this.store.dispatch(new LoadCurrentStatusSuccess(null));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorUpload));
    this.showViewer$ = this.store.pipe(select(showViewerUpload));
    this.upload$=this.store.pipe(select(getUpload));
    this.isProcessing$=this.store.pipe(select(isProcessingUpload));
    this.isLoading$=this.store.pipe(select(isLoadingUpload));
    this.status$=this.store.pipe(select(getStatus));
    this.currentStatus$=this.store.pipe(select(getCurrentStatus));
    this.currentStatus$.subscribe(result =>{
      if(result){
      this.selectedValue=result;
      }
    })
    // this.status$.subscribe(result => {
    //   this.status=this.utilService.transformToSelectDataList(result,"id","description",true,{value:"0",label:"Logged/Not Run"});
    // });
  }

  getUploadData$(rowId: number): Observable<IUpload> {
    return this.upload$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAdd(){
    this.store.dispatch(new ShowEditorUpload());
  }

  onTemplate(){
    this.router.navigate([`${STANDARD_ROUTES.templateImport}`]);
  }


  onRefresh(){
    this.store.dispatch(new LoadUploadData({statusId:this.selectedValue}));
    this.store.dispatch(new ShowToast({title: null, message: `Uploads data was Refreshed successfully.`, type: ToastTypes.SUCCESS}),)
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorUpload());
  }

  onStatus(event){
    this.selectedValue=event.value;
    this.store.dispatch(new LoadingUpload());
    this.store.dispatch(new LoadUploadData({statusId:event.value}));
  }

  isLogged():boolean{
    if(this.selectedValue === 0){
      return true;
    }
    return false;
  }

  isReversable(rowId: number):boolean{
    let status=false;
    this.getUploadData$(rowId).pipe(take(1))
    .subscribe(result=>{
      if(result.is_reversible === true){
        status=true;
      }
      else{
        status=false;
      }
    })
    return status;
  }

  onViewIconClicked(rowId){
    this.router.navigate([`${STANDARD_ROUTES.uploadStatus}/${rowId}`]);
    this.store.dispatch(new LoadCurrentStatusSuccess(this.selectedValue));
  }

  onViewClicked(rowId){
    this.viewer.data = null;
    this.getUploadData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if(result){
          this.viewer.data = result;
        }
        this.store.dispatch(new ShowViewerUpload());
        }
      );
  }

  onReverseIconClicked(rowId){
    this.dialogBoxService.show(`Are you sure you want to Reverse this Record?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ReverseUpload({recordId:rowId, statusId:this.selectedValue}));      }
    });
  }

  onDeleteIconClicked(rowId){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteUpload({recordId: rowId, statusId:this.selectedValue}));
      }
    });
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerUpload());
  }
}
