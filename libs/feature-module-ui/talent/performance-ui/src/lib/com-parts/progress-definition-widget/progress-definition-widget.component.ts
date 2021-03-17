import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ProgressDefinitionWidgetService } from './progress-definition-widget.service';
import { IProgressDefinition, IProgressTransaction } from '@nutela/models/talent/performance';
import * as constants from '../../constants';
import { Observable } from 'rxjs';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IPerformanceState, getIsLMStatusProgressReport } from '../../store';


@Component({
  selector: 'x365-fm-talent-progress-definition-widget',
  templateUrl: './progress-definition-widget.component.html',
  styleUrls: ['./progress-definition-widget.component.scss'],
  providers: [ProgressDefinitionWidgetService],
  encapsulation: ViewEncapsulation.None
})
export class ProgressDefinitionWidgetComponent implements OnInit {
  @Input() data: IProgressDefinition;
  @Input() definitionMasters: IProgressDefinition;
  @Output() showTransactionEditor = new EventEmitter<string>();
  transactions: IProgressTransaction[];
  progressTypeConstants = constants.progressTypeOptions;
  willDelete: boolean = false;
  isLineManager$: Observable<boolean>;

  constructor(private progressDefinitionWidgetService: ProgressDefinitionWidgetService, private store: Store<IPerformanceState>, private actionsSubject: ActionsSubject, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.isLineManager$ = this.store.pipe(select(getIsLMStatusProgressReport)); // state to know if user is a line manager
    this.loadTransactions();
    this.actionsSubject.subscribe(data => { 
      if(data.type === '[PERFORMANCE PROGRESS REPORT] Save Progress Transaction Success') {
        this.loadTransactions();
      }
  });
  }

  showTransaction(evt) {
    this.showTransactionEditor.emit(evt); 
  }

  loadTransactions(){
    this.progressDefinitionWidgetService.getTransaction(this.data?this.data.id:null).subscribe((res)=> { console.log('trans', res); this.transactions = res.Results });
  }

  canEdit():boolean {
    return (this.definitionMasters.ObjectiveMasterInfo.approval_status == 2) && (this.definitionMasters.ObjectiveMasterInfo.status == 2);
  }

}
