import { Component, OnInit, Input } from '@angular/core';
import { Column, Row, Action } from './data-grid.model';

@Component({
  selector: 'b-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent<T = any> implements OnInit {
  @Input() public columns: Column[];
  @Input() rows: T[] & Row[] = [];
  @Input() emptyText = 'No Data';
  @Input() errorMessage: string;
  @Input() actions: Action[];
  constructor() { }

  ngOnInit() {
  }

  linkWithId (column, row) {
    return `${column.link}/${row._id}`;
  }

}
