import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { GlobalErrorHandler } from './global-error-handler';
import { DataGridComponent } from './data-grid/data-grid.component';
import { RouterModule } from '@angular/router';
import { MaskDirective } from './mask/mask.directive';
import { ErrorPanelComponent } from './error-panel/error-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [DataGridComponent, MaskDirective, ErrorPanelComponent, ToolbarComponent],
  exports: [DataGridComponent, MaskDirective, ErrorPanelComponent, ToolbarComponent],
  providers: [AuthenticationService, AuthenticationGuard, GlobalErrorHandler]
})
export class CoreModule { }
