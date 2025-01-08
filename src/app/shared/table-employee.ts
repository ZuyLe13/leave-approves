import { Column } from './column';

const createCell = (key: string) => (element: Record<string, any>) =>
  `${element[key]}`;

export const TABLE_EMPLOYEE_COLUMNS: Column[] = [
  {
    columnDef: 'employee',
    header: 'Employee',
    cell: createCell('employee'),
    isSorting: true,
    isSticky: true,
  },
  {
    columnDef: 'type',
    header: 'Type',
    cell: createCell('type'),
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
    isSorting: true,
  },
  {
    columnDef: 'approvedBy',
    header: 'Approved By',
    cell: createCell('approvedBy'),
    isSorting: true,
  },
  {
    columnDef: 'approvedTime',
    header: 'Approved Time',
    cell: createCell('approvedTime'),
    isSorting: true,
  },
  {
    columnDef: 'status',
    header: 'Status',
    cell: createCell('status'),
    isSorting: true,
    isStickyEnd: true,
  },
];
