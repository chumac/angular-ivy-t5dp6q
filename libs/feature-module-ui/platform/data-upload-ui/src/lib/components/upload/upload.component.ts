import { Component, OnInit, OnDestroy, Inject, ViewChild, Input, Output, EventEmitter, SimpleChanges, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/internal/Observable';
import { ISubscriptions } from '@nutela/models/common';
import { Router } from '@angular/router';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { UploadService } from './upload.service';
import { Store, select } from '@ngrx/store';
import { IDataUploadState } from '../../store/root';
import { isProcessingUpload, isLoadingUpload, getDestination, LoadDestination, ProcessingUpload, SaveUpload } from '../../store/upload';
import * as constants from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import * as XLSX from 'xlsx';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { DxComponent, DxLookupComponent } from 'devextreme-angular';

@Component({
  selector: 'x365-fm-plf-dataupload-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadService]
})

export class UploadComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Output() cancelClick = new EventEmitter<any>();
  @ViewChild('dest') dest: DxLookupComponent;

  isLoading$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  destination$: Observable<ISelectOption[]>;
  destination=[];
  fileArray=[];
  fileDetails:string;
  fileName:string;

  private subscriptions: ISubscriptions = {};
  delimeter=constants.Delimeter;


  constructor(@Inject('partialDocumentTitle')
    private partialDocumentTitle: string,
    private titleService: Title,
    private router: Router,
    public uploadService:UploadService,
    public utilService: UtilService,
    private store: Store<IDataUploadState>
  ) {
    super();
    titleService.setTitle(
      `${'Data Upload'}${this.partialDocumentTitle}`
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.uploadService.init(this.data);
    }
    if(this.show===false){
      this.uploadService.form=this.uploadService.buildForm();
      this.uploadService.destine=null;
      this.fileName=null;
      this.dest.value=null;
    }
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  resetDestination(){

  }

  storeDispatches() {
    this.store.dispatch(new LoadDestination());
  }

  storeSelects() {
    this.isProcessing$=this.store.pipe(select(isProcessingUpload));
    this.isLoading$=this.store.pipe(select(isLoadingUpload));
    this.destination$=this.store.pipe(select(getDestination));
    // this.destination$.subscribe(result => {
    //   this.destination=this.utilService.transformToSelectDataList(result,"id","description");
    // })
  }

  onValueChanged(data) {
    console.log('da',data.value)
    if(data && data.value){
    if(data.value.description){
      this.uploadService.destine=data.value.description;
    }
    this.uploadService.patch({
      destination:data.value.id,
      is_reversible:data.value.is_reversible,
    });
  }
}

  onFileSelected(data: any) {
    if (data) {
      // this.filePicker.nativeElement
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  getFileExtension(fileName: string): boolean {
    var fileTypes = ['csv'];
    var extension = fileName.split('.').pop().toLowerCase();
    var isSuccess = fileTypes.indexOf(extension) > -1;
    if(isSuccess){
      return true;
    }
    else{
      return false;
    }

  }

  onFileChange(evt: any) {
    this.uploadService.show=true;
    const target = (evt.target); // const target: DataTransfer = <DataTransfer>(evt.target);
    this.uploadService.fileLength = target.files.length
    this.fileName = target.files[0].name;
      if (this.getFileExtension(this.fileName)){
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = <any>(XLSX.utils.sheet_to_txt(ws));
        this.fileArray=data;
        this.fileDetails=bstr;
        this.uploadService.show=false;
      };
      // reader.readAsBinaryString(target.files[0]);
      reader.readAsText(target.files[0]);
    }
    else{
      this.store.dispatch(new ShowToast({title: null, message: `Only CSV File Extensions Please .`, type: ToastTypes.ERROR}));
      this.uploadService.show=false;
      this.fileName=null;
    }
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if(this.uploadService.valid){

      // console.log('file', this.fileDetails);
      this.store.dispatch(new ProcessingUpload());
      this.uploadService.patch({
        file_details:this.fileDetails,
        filename:this.fileName,
      });
      console.log('val sub', this.uploadService.value);
      this.store.dispatch(new SaveUpload({data: this.uploadService.value, statusId:0}));
    }
    else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.uploadService.f, this.uploadService.validationMessages));
  }

  onViewIconClicked(val){

  }

  reset() {
    this.uploadService.f.reset();
    this.uploadService.init(this.data);
  }

  onCancel() {
    // this.store.dispatch(new NotProcessingBusinessType());
    this.data = null;
    // this.reset();
    this.cancelClick.emit();
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}








