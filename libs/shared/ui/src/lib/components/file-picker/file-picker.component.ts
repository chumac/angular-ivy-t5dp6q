import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectMaxDocSize } from '@nutela/store/modules/foundation';
import { IDocMaxSize } from '@nutela/models/core-data';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'x365-shared-ui-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit {
  @ViewChild('file') file: ElementRef;

  fileToUpload: any[] = [];
  fileExtensions: any[] = [];
  docMaxSize$: Observable<IDocMaxSize>;

  private errorMsgs: string[] = [];
  public isBlobImage: boolean = false;

  @Output() fileSelected = new EventEmitter<any>();
  @Output() fileRemoved = new EventEmitter<IFileData>();

  @Input() public showText: boolean = true;
  @Input() public showUploadDetails: boolean = true;
  @Input() public disableButton: boolean = false;
  @Input() public fileBlob: any;
  @Input() public fileBlobObject: any;

  constructor(
    private store: Store<IAppState>,
    public domSanitizationService: DomSanitizer
  ) {}

  ngOnInit() {
    this.fileExtensions = Object.values(FILE_EXTENSIONS);
    this.docMaxSize$ = this.store.pipe(select(selectMaxDocSize));
    this.fileBlob = this.fileBlobObject && this.fileBlobObject.content;
  }

  isFormValid(docSize: number) {
    this.errorMsgs = [];

    if (docSize > 4 * 1024) {
      // use lookup service to get max filesize
      this.errorMsgs.push(
        'Document size should not be larger than ' + 4000 + 'Kb.'
      ); // Use lookup service to get max file size
    }

    return this.errorMsgs.length <= 0;
  }

  onFilesAdded(e) {
    this.fileToUpload = this.file.nativeElement.files;
    if (this.fileToUpload.length === 1) {
      const modRef = this;

      const reader: FileReader = new FileReader();

      reader.onload = () => {
        if (modRef.fileToUpload && modRef.fileToUpload.length === 1) {
          const value = {
            name: modRef.fileToUpload[0].name,
            content:
              modRef.getDataURLWithoutMimeType(<string>reader.result) || '',
            mimeType: modRef.fileToUpload[0].type || '',
            size: modRef.fileToUpload[0].size || 0,
            extension:
              modRef.getFileExtension(modRef.fileToUpload[0].name) || '',
            lastModifiedDate: modRef.fileToUpload[0].lastModifiedDate
          };

          if (this.validateExtension(value.extension)) {
            modRef.fileSelected.emit(value);
            this.fileBlob = value.content;
          } else {
            this.removeFile();
            modRef.fileSelected.emit(null);
          }
        }
      };

      reader.readAsDataURL(this.fileToUpload[0]);
    }
  }

  validateExtension(extension): boolean {
    switch (extension) {
      case FILE_EXTENSIONS[extension]:
        return true;
        break;

      default:
        return false;
        break;
    }
  }

  getFileExtension(fileName: string) {
    let index = 0;

    const indices = this.findAllOccurencesOfString(
      this.convertStringToArray(fileName),
      '.'
    );
    if (indices.length > 0) {
      index = indices[indices.length - 1];

      if (index === 0) {
        return 'UNKNOWN';
      } else {
        return fileName.substring(index + 1);
      }
    }
  }

  convertStringToArray(value: string): string[] {
    const arr = [];

    for (let i = 0; i <= value.length; i++) {
      arr[i] = value.charAt(i);
    }

    return arr;
  }

  findAllOccurencesOfString(valueArr: string[], searchText: string) {
    const indices = [];
    let idx = valueArr.indexOf(searchText);
    while (idx !== -1) {
      indices.push(idx);
      idx = valueArr.indexOf(searchText, idx + 1);
    }

    return indices;
  }

  previewBinary(blob) {
    let preview = null;

    if (this.blobIsImage(blob)) {
      preview = `data:image/jpeg;base64,${blob}`;
      // preview = `<img class="img-thumbnail" src="${this.domSanitizationService.bypassSecurityTrustUrl(preview)}"/>`;
    } else if (blob) {
      preview = `${this.fileBlobObject?this.fileBlobObject.name:''}`;
    } else {
      preview = ``;
    }
    return preview;
  }

  blobIsImage(blob) {
    if (blob) {
      const acceptedImageTypes = ['/', 'i', 'R'];
      const index = blob.charAt(0);
      return acceptedImageTypes.includes(index);
    }
    return false;
  }

  openBlob(fileBlobObject) {
    if(fileBlobObject) {
 
    }
  }

  public removeFile() {
    this.fileToUpload = [];
    this.fileBlob = null;

    const value: IFileData = {
      name: '',
      content: null,
      mimeType: '',
      size: 0,
      extension: '',
      lastModifiedDate: null
    };

    this.file.nativeElement.value = '';
    this.fileRemoved.emit(value);
  }

  private getDataURLWithoutMimeType(value: string): any {
    const index = value.indexOf(',');
    return value.slice(index + 1);
  }
}

export interface IFileData {
  name: string;
  content: null;
  mimeType: string;
  size: number;
  extension: string;
  lastModifiedDate: Date;
}
