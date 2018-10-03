import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'b-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
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
