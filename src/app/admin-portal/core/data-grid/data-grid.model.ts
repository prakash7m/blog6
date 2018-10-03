export interface Column {
  dataIndex: string;
  text: string;
  width?: number;
  link?: string;
}

export interface Row {
  link?: string;
  editable?: boolean;
  deletable?: boolean;
}

export interface Action {
  text: string;
  link?: string;
  handler(event: Event, row: Row);
}
