import { GenericItem } from './shared.const';

type FakeData = GenericItem<string>;

export const statusData: FakeData[] = [
  { value: 'Waiting for approval' },
  { value: 'Approved' },
  { value: 'Rejected' },
  { value: 'Cancelled' },
  { value: 'Waiting for cancel' },
  { value: 'Approve cancelled' },
  { value: 'Reject cancelled' },
];

export const employeeData: FakeData[] = [
  { value: 'Le Anh Duy' },
  { value: 'Le Van B' },
  { value: 'Nguyen Van A' },
  { value: 'Employee 4' },
  { value: 'Employee 5' },
];

export const userStatusData: FakeData[] = [
  { value: 'Active' },
  { value: 'Inactive' },
  { value: 'All' },
];
