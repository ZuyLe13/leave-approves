import { Column } from './table-column';

const createCell = (key: string) => (element: Record<string, any>) =>
  `${element[key]}`;

export const TABLE_EMPLOYEE_COLUMNS: Column[] = [
  {
    columnDef: 'employee',
    header: 'Employee',
    cell: createCell('employee'),
    sortable: true,
    isSticky: true,
  },
  {
    columnDef: 'type',
    header: 'Type',
    cell: createCell('type'),
    isType: true,
  },
  {
    columnDef: 'day',
    header: 'Day',
    cell: createCell('day'),
  },
  {
    columnDef: 'gapTime',
    header: 'Gap Time',
    cell: createCell('gapTime'),
  },
  {
    columnDef: 'reason',
    header: 'Reason',
    cell: createCell('reason'),
    sortable: true,
  },
  {
    columnDef: 'approvedBy',
    header: 'Approved By',
    cell: createCell('approvedBy'),
    sortable: true,
  },
  {
    columnDef: 'approvedTime',
    header: 'Approved Time',
    cell: createCell('approvedTime'),
    sortable: true,
  },
  {
    columnDef: 'status',
    header: 'Status',
    cell: createCell('status'),
    sortable: true,
    isStickyEnd: true,
    isStatus: true,
  },
];
