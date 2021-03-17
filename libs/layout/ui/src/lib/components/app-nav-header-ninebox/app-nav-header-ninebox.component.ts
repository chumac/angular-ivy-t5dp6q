import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'x365-layout-ui-app-nav-header-ninebox',
  templateUrl: './app-nav-header-ninebox.component.html',
  styleUrls: ['./app-nav-header-ninebox.component.scss']
})
export class AppNavHeaderNineboxComponent implements OnInit {

  @Input() public isAdmin: boolean;

  @Output() nineBoxToggled = new EventEmitter<boolean>();

  isOpen = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    if (this.isAdmin) {
      this.isOpen = !this.isOpen;
      this.nineBoxToggled.emit(this.isOpen);
    }
  }
}
