export interface Column {
  columnDef: string;
  header: string;
  cell: (element: Record<string, any>) => string;
  isSorting?: boolean;
  isSticky?: boolean;
  isStickyEnd?: boolean;
}
