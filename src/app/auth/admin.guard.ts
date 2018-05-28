import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      if (user.type === "admin") {
        return true;
      } else {
        this.router.navigate(["/dashboard"]);
        return false;
      }
    }

    // not logged in so redirect to login page
    this.router.navigate(["/login"]);
    return false;
  }
}
