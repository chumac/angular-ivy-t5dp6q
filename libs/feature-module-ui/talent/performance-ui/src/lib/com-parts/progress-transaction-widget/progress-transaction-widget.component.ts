import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ProgressTransactionWidgetService } from './progress-transaction-widget.service';
import { IProgressTransaction, ITransactionComment, IProgressDefinition } from '@nutela/models/talent/performance';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { MatExpansionPanel } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IPerformanceState, getIsLMStatusProgressReport } from '../../store';
import * as constants from '../../constants';
import { take } from 'rxjs/operators';
import { ApiService, UtilService } from '@nutela/core-services';


@Component({
  selector: 'x365-fm-talent-progress-transaction-widget',
  templateUrl: './progress-transaction-widget.component.html',
  styleUrls: ['./progress-transaction-widget.component.scss'],
  providers: [ProgressTransactionWidgetService],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MatExpansionPanel]
})
export class ProgressTransactionWidgetComponent implements OnInit {
  @Input() data: IProgressTransaction[];
  @Input() progressDefinitionData: IProgressDefinition;
  @Input() readOnly: boolean;
  comments: ITransactionComment[]; 
  isLineManager$: Observable<boolean>;
  progressTypeConstants = constants.progressTypeOptions;

  constructor(private store: Store<IPerformanceState>, private apiService: ApiService, private utilService: UtilService, private progressTransactionWidgetService: ProgressTransactionWidgetService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.isLineManager$ = this.store.pipe(select(getIsLMStatusProgressReport)); // state to know if user is a line manager
  }

  loadTransactions(){
    this.progressTransactionWidgetService.getTransaction(this.progressDefinitionData?this.progressDefinitionData.id:null).subscribe((res)=> { this.data = res.Results });
  }

  deleteTransaction(evt) {
    this.dialogBoxService.show(`Are you sure you want to delete this transaction?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        document.getElementById(`transaction${evt.id}`).className = 'strike-through';
        this.progressTransactionWidgetService.deleteTransaction(evt.id).subscribe(()=>this.loadTransactions());
      }
    }); 
  }

  downloadDocument(evt, transaction) {
    evt.stopPropagation();
    evt.preventDefault(); 
    console.log('t', transaction)
    this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.downloadTransCommentDoc}?docGuid=${evt.doc_guid}.${evt.doc_extension}`).pipe(take(1)).subscribe((res)=>{
      this.utilService.openBase64URL(this.utilService.getSafeBase64URL(res.Results?res.Results[0]:null, this.utilService.getMimeType(evt.doc_extension)));
    });
  }

  hasDocument(data) {
    return data.doc_binary?true:false;
  }

}
