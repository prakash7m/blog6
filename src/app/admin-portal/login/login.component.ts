import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication.service';

import { GlobalErrorHandler } from '../core/global-error-handler';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { DataResponse } from '../core/response.model';
import { UserModel } from '../core/user.model';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string;
  formGroup: FormGroup;
  info: {};
  isProgress: boolean;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private globalErrorHandler: GlobalErrorHandler,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  async onSubmit(): Promise<any> {
    this.errorMessage = '';
    this.isProgress = true;
    try {
      const response = <DataResponse<UserModel>>await this.authenticationService.authenticate({
        username: this.formGroup.get('username').value,
        password: this.formGroup.get('password').value
      });
      if (response.data) {
        const referer = this.route.snapshot.queryParamMap.get('r');
        if (referer) {
          this.router.navigateByUrl(referer);
        } else {
          this.router.navigate(['/admin']);
        }
      } else {
        this.errorMessage = response.message;
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
    this.isProgress = false;
  }
}
