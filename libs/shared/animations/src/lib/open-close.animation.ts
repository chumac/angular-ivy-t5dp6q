import {
  trigger,
  animate,
  style,
  transition,
  state
} from '@angular/animations';

export const openCloseAnimation = trigger('openCloseAnimation', [
  state(
    'open',
    style({
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.3s .15s ease-out')]),
  transition('closed => open', [animate('0.3s .15s ease-out')])
]);
