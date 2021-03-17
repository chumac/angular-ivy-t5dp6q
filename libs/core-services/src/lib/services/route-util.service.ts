import { Injectable } from "@angular/core";
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RouteUtilService {
  private history = [];
  private currentRoute: string;
  private previousRoute: string;

  constructor(
    private router: Router
  ) {
    this.loadRouting();
  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousRoute = events[0].urlAfterRedirects;
        this.currentRoute = events[1].urlAfterRedirects;
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousRoute(): string {
    return this.previousRoute;
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }
}
