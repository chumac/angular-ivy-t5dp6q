import { Component, OnInit, Input } from '@angular/core';
import { IProgressDefinition, IProgressTransaction } from '@nutela/models/talent/performance';
import { DialogBoxService } from '@nutela/shared/ui';
import { Store, ActionsSubject  } from '@ngrx/store';
import { IPerformanceState } from '../../store';
import { ProgressChartService } from './progress-chart.service';
import { Subscription, from } from 'rxjs';
import {MatDialog} from '@angular/material';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'x365-fm-talent-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss'],
  providers: [ProgressChartService],
}
)
export class ProgressChartComponent implements OnInit {
  @Input() data: IProgressDefinition;
  @Input() objectiveId: number;
  progressTransactionInfo: IProgressTransaction[];
  errorMessage = [];
  subsc = new Subscription();

  public chartType = 'bar';

  public chartDatasets: Array<any> = [
    { data: [10, 20, 30, 40, 50, 60, 50, 40, 30, 20, 30, 40], label: 'Percentage Complete' }
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  chartData: any = {
    chartType: this.chartType,
    chartDatasets: this.chartDatasets,
    chartLabels: this.chartLabels,
    chartColors: this.chartColors,
    chartOptions: this.chartOptions,
  }


  constructor(private store: Store<IPerformanceState>, public dialog: MatDialog, private actionsSubject: ActionsSubject, private progressChartService: ProgressChartService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.subsc = this.progressChartService.getTransaction(this.data?this.data.id:null).pipe(take(1))
    .subscribe((data)=>{
      if(data.Success){
        this.progressTransactionInfo = <IProgressTransaction[]>data.Results;
        this.formatChartData(this.progressTransactionInfo);
      } else {
        this.errorMessage.push('Error Loading Transaction');
      }
    }, 
    (error)=>{
      this.errorMessage.push('Error Loading Transaction');
    });
  }

  storeSelects() {}

  formatChartData (data: IProgressTransaction[]) {
    // let datesArray : {month: number, percentage: number}[] = [];
    // let chartData = [];
    // data.forEach((result) => {
    //   datesArray.push({ month: new Date(result.actual_complete_date).getMonth(), percentage: result.perc_complete });  
    // });
    // for(let i = 0; i < 12; i++) {
    //   const percentage = 0;
    //   datesArray.forEach((res) => {
    //     if(res.month === i){
    //       console.log('month copied !!', res.percentage);
    //     }
    //   });
    // }
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { } 

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  

}
