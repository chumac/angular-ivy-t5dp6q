import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'x365-fm-workforce-absence-leave-card',
  templateUrl: './leave-card.component.html',
  styleUrls: ['./leave-card.component.scss']
})
export class LeaveCardComponent implements OnInit {
  items = [
    {
      employee: 'Chikwe Henry Uche',
      type: 'Vacation and annual leave',
      period: '26.09 - 29.09',
      days: '3'
    },
    {
      employee: 'Mich Teddy',
      type: 'Vacation and annual leave',
      period: '14.06 - 20.06',
      days: '5'
    },
    {
      employee: 'Adebukola M. Odunlakin',
      type: 'Maternity leave',
      period: '02.06 - 10.06',
      days: '8'
    },
    {
      employee: 'Michael C. Okpara',
      type: 'Study leave',
      period: '10.08 - 25.08',
      days: '15'
    },
    {
      employee: 'Chikwe Henry Uche',
      type: 'Vacation and annual leave',
      period: '26.09 - 29.09',
      days: '3'
    },
    {
      employee: 'Mich Teddy',
      type: 'Vacation and annual leave',
      period: '14.06 - 20.06',
      days: '5'
    },
    {
      employee: 'Adebukola M. Odunlakin',
      type: 'Maternity leave',
      period: '02.06 - 10.06',
      days: '8'
    },
    {
      employee: 'Michael C. Okpara',
      type: 'Study leave',
      period: '10.08 - 25.08',
      days: '15'
    }
  ];

  constructor() {}

  ngOnInit() {}

  onEventSelection($event: any) {
    // console.log($event);
  }
}
