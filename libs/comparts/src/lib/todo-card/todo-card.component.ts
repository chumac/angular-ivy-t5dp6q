
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IToDo, IAnniversary } from '@nutela/models/core-data';

@Component({
  selector: 'x365-comparts-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() public viewType: string;
  @Input() public toDos: IToDo[];

  constructor() {}

  ngOnInit() {
  }

}
