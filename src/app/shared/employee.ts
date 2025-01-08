export enum Status {
  WaitingForApproval = 'Waiting for approval',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  WaitingForCancel = 'Waiting for cancel',
  ApproveCancelled = 'Approve cancelled',
  RejectCancelled = 'Reject cancelled',
}

export interface EmployeeRecord {
  employee: string;
  type: string;
  day: string;
  gapTime: string;
  reason: string;
  approvedBy: string;
  approvedTime: string;
  status: Status;
}

export const FAKE_DATA: EmployeeRecord[] = [
  {
    employee: 'Le Anh Duy',
    type: 'Internship Leave',
    day: '2024-12-29',
    gapTime: '4h',
    reason: 'Bệnh',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-29',
    status: Status.Rejected,
  },
  {
    employee: 'Le Van B',
    type: 'WFH',
    day: '2024-12-25',
    gapTime: 'Full day',
    reason: 'Off',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-22',
    status: Status.WaitingForApproval,
  },
  {
    employee: 'Nguyen Van A',
    type: 'Internship Leave',
    day: '2024-12-23',
    gapTime: '1h',
    reason: 'Tới trường',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-23',
    status: Status.Approved,
  },
  {
    employee: 'Le Anh Duy',
    type: 'Internship Leave',
    day: '2024-12-23',
    gapTime: '4h',
    reason: 'em xin off vì có lịch học ở trường ',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-22',
    status: Status.Approved,
  },
  {
    employee: 'Le Van B',
    type: 'WFH',
    day: '2024-12-29',
    gapTime: 'Full day',
    reason: 'WFH',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-22',
    status: Status.Cancelled,
  },
  {
    employee: 'Le Van B',
    type: 'WFH',
    day: '2024-12-23',
    gapTime: 'Full day',
    reason: 'WFH',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-22',
    status: Status.WaitingForApproval,
  },
  {
    employee: 'Le Van B',
    type: 'WFH',
    day: '2024-12-23',
    gapTime: 'Full day',
    reason: 'Off',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-22',
    status: Status.Rejected,
  },
  {
    employee: 'Nguyen Van A',
    type: 'Internship Leave',
    day: '2024-12-23',
    gapTime: '1h',
    reason: 'Tới trường',
    approvedBy: 'Phuoc Dang',
    approvedTime: '2024-12-23',
    status: Status.Approved,
  },
];
