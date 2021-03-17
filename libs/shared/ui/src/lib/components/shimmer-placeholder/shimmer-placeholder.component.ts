import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'x365-shared-ui-shimmer-placeholder',
  templateUrl: './shimmer-placeholder.component.html',
  styleUrls: ['./shimmer-placeholder.component.scss']
})
export class ShimmerPlaceholderComponent implements OnInit {

  constructor() { }
  @Input() line: boolean = true;
  @Input() photo: boolean = true;
  @Input() box: boolean = true;

  @Input() noOfLines: number = 1;
  @Input() noOfPhotos: number = 1;
  @Input() noOfBox: number = 1;

  @Input() perColumn: number = 1;
  @Input() height: any = '100%';

  _noOfLines: Array<number>;
  _noOfPhotos: Array<number>;
  _noOfBox: Array<number>;
  _perColumn: Array<number>;
  

  ngOnInit() {
    this._noOfLines = new Array(this.noOfLines).fill(0);
    this._noOfPhotos = new Array(this.noOfPhotos).fill(0);
    this._noOfBox = new Array(this.noOfBox).fill(0);
    this._perColumn = new Array(this.perColumn).fill(0);

  }

}
