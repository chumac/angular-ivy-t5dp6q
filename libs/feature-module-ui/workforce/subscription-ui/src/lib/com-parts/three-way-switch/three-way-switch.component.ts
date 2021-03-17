import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes

} from '@angular/animations';

@Component({
  selector: 'x365-shared-ui-three-way-switch',
  templateUrl: './three-way-switch.component.html',
  styleUrls: ['./three-way-switch.component.scss'],
  animations: [
    trigger('posX',[
      state('APPROVED',style({transform:'translateX(0)'})),
      state('AWAITING',style({transform:'translateX(100px)'})),
      state('PROCESSED',style({transform:'translateX(200px)'})),
      transition('* => APPROVED',animate(200)),
      transition('* => AWAITING',animate(200)),
      transition('* => PROCESSED',animate(200)),
    ])
  ]
})
export class ThreeWaySwitchComponent {
  pos:string='APPROVED';
  pos2:string='AWAITING';
  pos3:string='PROCESSED';
  options=['APPROVED','AWAITING','PROCESSED'];
}

