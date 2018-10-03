import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() footer: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
