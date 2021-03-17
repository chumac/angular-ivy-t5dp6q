import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'x365-cui-event-calendar-card',
  templateUrl: './event-calendar-card.component.html',
  styleUrls: ['./event-calendar-card.component.scss']
})
export class EventCalendarCardComponent implements OnInit {
  items = [
    { type: 'Birthday', description: 'Miranda Popinz' },
    { type: 'Birthday', description: 'Mike Shafarenko' },
    { type: 'Corporate', description: 'Company Birthday' },
    { type: 'Wedding Aniversaries', description: 'Adeola Oyebukola' },
    { type: 'Work Event', description: 'Annual Picnic' },
    { type: 'Birthday', description: 'Stella M. Adebayo' },
    { type: 'Birthday', description: 'Mary K. Délano' },
    { type: 'Birthday', description: 'Peter Straus' },
    { type: 'Birthday', description: 'Tevin Chamberlain' }
  ];

  constructor() {}

  ngOnInit() {}

  onEventSelection($event: any) {
    // console.log($event);
  }
}
