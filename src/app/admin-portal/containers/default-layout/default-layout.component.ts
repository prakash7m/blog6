import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';
import { AuthenticationService } from '../../core/authentication.service';


@Component({
  selector: 'b-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private authenticationService: AuthenticationService, private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  async logout(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      await this.authenticationService.logout();
      this.router.navigateByUrl('/admin/login');
    } catch (err) {
      console.log('error');
    }
  }
}
