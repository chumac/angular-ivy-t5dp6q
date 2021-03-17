import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'x365-cui-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  items = [
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    },
    {
      subject: 'Your Performance self review is awaiting your action.',
      dueOn: '3/12/2016',
      priority: 'normal'
    }
  ];

  constructor() {}

  ngOnInit() {}

  onEventSelection($event: any) {
    // console.log($event);
  }
}
