import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { HandledErrorResponse } from '../response.model';

@Component({
  selector: 'b-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.scss']
})
export class ErrorPanelComponent implements OnInit {
  @Input() errorResponse: Observable<HandledErrorResponse>;
  errorMessage: string;
  constructor() { }

  ngOnInit() {
    if (this.errorResponse) {
      this.errorResponse.subscribe((eRes: HandledErrorResponse) => {
        this.errorMessage = eRes ? eRes.message : null;
      });
    }
  }
}
