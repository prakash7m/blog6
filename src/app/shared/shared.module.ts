import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WINDOW_PROVIDERS } from './window.service';
import { OkCancelDialogComponent } from './ok-cancel-dialog/ok-cancel-dialog.component';
import { GrowlComponent } from './growl/growl.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OkCancelDialogComponent, GrowlComponent],
  exports: [OkCancelDialogComponent],
  providers: [ WINDOW_PROVIDERS ]
})
export class SharedModule { }
