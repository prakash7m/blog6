import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasLoginCookie = this.authenticationService.hasLoginCookie();
    if (hasLoginCookie) {
      this.router.navigateByUrl('/admin');
      return false;
    } else {
      return true;    
    }
  }
}
