import { query as q } from '@angular/animations';

export function query(s, a, o = { optional: true }) {
  return q(s, a, o);
}

// export const query = (s, a, o = { optional: true }) => q(s, a, o);
