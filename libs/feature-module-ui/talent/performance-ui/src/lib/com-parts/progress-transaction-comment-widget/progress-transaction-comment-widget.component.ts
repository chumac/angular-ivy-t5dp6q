import { Component, OnInit, Input, ViewEncapsulation, HostListener, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef,  AfterViewInit } from '@angular/core';
import { ProgressTransactionCommentWidgetService } from './progress-transaction-comment-widget.service';
import { IProgressTransaction, ITransactionComment } from '@nutela/models/talent/performance';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { MatExpansionPanel } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { DownloadDocument } from 'libs/feature-module-ui/platform/documents-ui/src/lib/store';
import { IAppState } from '@nutela/store/app-state';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { Observable } from 'rxjs';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { take, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { getIsLMStatusProgressReport, getSelectedEmployeeObjectiveMasterData } from '../../store';


@Component({
  selector: 'x365-fm-talent-progress-transaction-comment-widget',
  templateUrl: './progress-transaction-comment-widget.component.html',
  styleUrls: ['./progress-transaction-comment-widget.component.scss'],
  providers: [ProgressTransactionCommentWidgetService],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MatExpansionPanel]
})
export class ProgressTransactionCommentWidgetComponent implements OnInit, AfterViewInit {

  @Input() data: IProgressTransaction;
  @Input() readOnly: boolean;
  @ViewChild('comment') comment:ElementRef;
  @ViewChild('fileInput') fileInput:ElementRef;
  @ViewChild('selectedEmployee') selectedEmployee:ElementRef;
  employeeInfo$: Observable<IComprehensiveData>;
  employeeId: number;
  selectedEmployeeId$: Observable<number>;// gets the selected employee Id from the lineManager state to toggle btw line manager and employee
  isLineManager$: Observable<boolean>;// gets the selected employee Id from the lineManager state to toggle btw line manager and employee
  comments: ITransactionComment[]; 
  isSending: boolean = false;

  constructor(
    private progressTransactionCommentWidgetService: ProgressTransactionCommentWidgetService, 
    private dialogBoxService: DialogBoxService, 
    private fb: FormBuilder, 
    private store: Store<IAppState>,
    private utilService: UtilService,
    private cd: ChangeDetectorRef) { }
    form = this.fb.group({
      progress_trans_id: [null, Validators.required],
      comment: [null, Validators.required],
      doc_binary: [null],
      doc_extension: [null],
      doc_mime: [null]
    });

  ngOnInit() {
    this.employeeInfo$ = this.store.pipe(select(getComprehensiveData));
    this.employeeInfo$.pipe(take(1)).subscribe(data=>{ this.employeeId = data.employee_id});
    
  }
  ngAfterViewInit(){
    this.loadComments();

  }

  loadComments(){
    this.selectedEmployeeId$ = this.store.pipe(select(getSelectedEmployeeObjectiveMasterData));
    this.isLineManager$ = this.store.pipe(select(getIsLMStatusProgressReport));

    combineLatest(this.selectedEmployeeId$, this.isLineManager$).subscribe(
      ([selectedEmp, isLineMan]) => {
        if(isLineMan){
          this.progressTransactionCommentWidgetService.getComments(this.data?this.data.id:null, selectedEmp).subscribe((res)=> {this.comments = res.Results; this.isSending = false; });
        } else {
          this.progressTransactionCommentWidgetService.getComments(this.data?this.data.id:null, this.employeeId).subscribe((res)=> {this.comments = res.Results; console.log('comment', res); this.isSending = false; });
        }

      });

  }

  addComment(id: number, employeeId: number) {
    this.form.get('progress_trans_id').setValue(id);
    let comment: string = this.form.get('comment').value;
    comment = comment.replace(/\u21b5/g, '');
    this.form.get('comment').setValue(comment);
    if((this.form.valid) && (this.form.get('comment').value != '↵') && (this.form.get('comment').value !== '')){
      this.fileInput.nativeElement.value = '';
      this.comment.nativeElement.value = '';
      this.isSending = true;
      this.progressTransactionCommentWidgetService.addComment(this.form.value, employeeId).subscribe(()=> {this.loadComments();this.form.reset()});
    }
  }

  deleteComment(evt, employee_id){
    this.dialogBoxService.show(`Are you sure you want to delete this comment?`)
    .pipe(take(1)).subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.progressTransactionCommentWidgetService.deleteComment(evt.id, employee_id).subscribe(()=>this.loadComments());
      }
    }); 
  }

  mouseHover(evt: MouseEvent) { 
    let element = evt.target as HTMLElement;
    if(evt.type === 'mouseenter'){
      element.children[0].classList.add('control-panel-show');
    } else {
      element.children[0].classList.remove('control-panel-show');
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    const extension = this.getDataURLExtension(event.target?event.target.files[0].name:null);
    const mime = event.target.files[0].type; 

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.form.patchValue({
          doc_binary: this.getDataURLWithoutMimeType(reader.result.toString()),
          doc_extension: extension,
          doc_mime: mime
       });
          this.cd.markForCheck();
      };
    }
  }

  downloadFile(evt) {
    this.progressTransactionCommentWidgetService.downloadDoc({ docGuId: evt.doc_guid, docExt: evt.doc_extension}).pipe(take(1)).subscribe((res)=>{
      this.utilService.openBase64URL(this.utilService.getSafeBase64URL(res.Results[0], this.utilService.getMimeType(evt.doc_extension)));
    });
  }

  private getDataURLWithoutMimeType(value: string): any {
    const index = value.indexOf(',');
    return value.slice(index + 1);
  }

  private getDataURLExtension(value: string): any {
    const index = value.indexOf('.');
    return value.slice(index + 1);
  }

}
