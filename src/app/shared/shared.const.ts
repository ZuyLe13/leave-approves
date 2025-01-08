export interface DateRange {
  fromDate: Date;
  toDate: Date;
}

export interface PeriodType {
  value: string;
}

export interface GenericItem<T> {
  value: T;
}

export interface SelectedValue {
  type: string;
  value: string;
}

export enum PeriodEnum {
  TODAY = 'Today',
  THIS_WEEK = 'This Week',
  THIS_MONTH = 'This Month',
  LAST_MONTH = 'Last Month',
  NEXT_MONTH = 'Next Month',
  THIS_YEAR = 'This Year',
  CUSTOM = 'Custom',
}

export const PeriodTypes: PeriodType[] = [
  { value: 'Today' },
  { value: 'This Week' },
  { value: 'This Month' },
  { value: 'Last Month' },
  { value: 'Next Month' },
  { value: 'This Year' },
  { value: 'Custom' },
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM D, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
