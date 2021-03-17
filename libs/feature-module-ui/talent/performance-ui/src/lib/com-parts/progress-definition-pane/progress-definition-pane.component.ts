import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IProgressDefinition } from '@nutela/models/talent/performance';
import * as constants from '../../constants';


@Component({
  selector: 'x365-fm-talent-progress-definition-pane',
  templateUrl: './progress-definition-pane.component.html',
  styleUrls: ['./progress-definition-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressDefinitionPaneComponent implements OnInit {
  @Input() data: IProgressDefinition;
  @Input() chartData: any;
  progressTypeConstants = constants.progressTypeOptions;


  constructor() {}

  ngOnInit() {}

  onDefinitionDeleteIconClicked(data){
    console.log('delete clicked', data);
  }

  onAddTransactionButtonClicked(data){
    console.log('add clicked', data);
  }

  onTransactionDownloadIconClicked(data){
    console.log('download clicked', data);
  }

  onTransactionDeleteIconClicked(data){
    console.log('delete clicked', data);
  }

}
