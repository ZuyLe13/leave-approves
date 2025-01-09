export interface Column {
  columnDef: string;
  header: string;
  cell: any;
  sortable?: boolean;
  isSticky?: boolean;
  isStickyEnd?: boolean;
  customRendering?: boolean;
  isType?: boolean;
  isStatus?: boolean;
}
