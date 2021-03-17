import { Component, OnInit, Input } from '@angular/core';

import { SpinnerTypes } from '../../enumerations';

@Component({
  selector: 'x365-shared-ui-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() type: SpinnerTypes;
  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }

  get isFiveBarSpinner() {
    if (this.type === SpinnerTypes.FIVE_BARS && this.show) {
      return true;
    } else {
      return false;
    }
  }
}

