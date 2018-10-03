import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HandledErrorResponse } from './response.model';

/**
 * Authentication guard maintains the logged in status. If the local state is not found, it makes api call to get the logged in status.
 * The status is then saved locally in this service so from next time, it will just check the local state and won't make api call.
 * But on refresh, the local state is lost and it again make api call to mainain the state.
 *
 * @export
 * @class AuthenticationGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {

  /**
   * Creates an instance of AuthenticationGuard.
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @memberof AuthenticationGuard
   */
  constructor (private authenticationService: AuthenticationService, private router: Router) { }

  /**
   * If user is logged in only then active the corresponding component. Otherwise redirect to login page.
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Promise<boolean>}
   * @memberof AuthenticationGuard
   */
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      return <boolean>await this.authenticationService.isAuthenticated();
    } catch (err) {
      console.log('error', err);
      return false;
    }
  }
}
