import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewChild
} from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IExitState } from '../../store/root';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';

@Component({
  selector: 'x365-fm-workforce-exit-resignation-viewer',
  templateUrl: './resignation-viewer.component.html',
  styleUrls: ['./resignation-viewer.component.scss']
})
export class ResignationViewerComponent implements OnInit {

  status = LetterStatus;

  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: '50px',
    maxHeight: '480px',
    width: 'auto',
    minWidth: '0',
    showToolbar: false,
    enableToolbar: false,
    translate: 'yes',
    defaultFontName: 'Calibri',
    defaultFontSize: '16px',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    sanitize: true,
  };

  @Input() public show: boolean;
  @Input() public isAdmin: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: any;

  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('editor') editorComponent: CKEditorComponent;

  constructor(
    private dialogRef: MatDialogRef<ResignationViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public utilService: UtilService,
    private store: Store<IExitState>
  ) {}

  ngOnInit() {
  }

  get setHtmlDoc(): string {
    if (this.dialogData.resign_letter) {
      return `<div id='letter-container'>${this.dialogData.resign_letter}</div>`
    } else {
      return '';
    }
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  onDoneClicked() {
    this.cancelClick.emit();
  }

}
