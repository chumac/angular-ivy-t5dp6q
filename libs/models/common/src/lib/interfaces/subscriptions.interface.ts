import { Subscription } from "rxjs/internal/Subscription";

export interface ISubscriptions {
  [key: string]: Subscription;
}
