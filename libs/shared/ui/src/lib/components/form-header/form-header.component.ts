import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() public title = '';
  @Input() public subTitle = '';
  @Input() public loading = true;

  constructor() {}

  ngOnInit() {}

  getStyles(): any {
    if (this.subTitle !== '') {
      return {
        'padding-top': '2.3em'
      };
    } else {
      return {
        'padding-top': '2.5em'
      };
    }
  }
}
