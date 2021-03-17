import {
  sequence,
  trigger,
  animate,
  style,
  group,
  query as q,
  transition,
  animateChild,
  stagger
} from '@angular/animations';
import { query } from './constants/query.constant';

export const slideStaggerAnimation = trigger('slideStaggerAnimation', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
    query(':enter', style({ transform: 'translateX(100%)' })),
    sequence([
      query(':leave', animateChild()),
      group([
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: 1 }),
          animate(
            '600ms cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            style({ transform: 'translateX(-100%)', opacity: 0 })
          )
        ]),
        query(':enter', stagger(400, [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate(
            '600ms cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            style({ transform: 'translateX(0%)', opacity: 1 })
          )
        ]))
      ]),
      query(':enter', animateChild())
    ])
  ])
]);
