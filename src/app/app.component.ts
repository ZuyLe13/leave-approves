import { Component } from '@angular/core';
import { Column } from './shared/table-column';
import { TABLE_EMPLOYEE_COLUMNS } from './shared/table-employee';
import { FAKE_DATA, EmployeeRecord } from './shared/employee';
import { SelectedValue } from './shared/shared.const';
import { GroupFilterComponent } from './group-filter/group-filter.component';
import { TableComponent } from './table/table.component';
import { DateRange } from './shared/date';

@Component({
  selector: 'app-root',
  imports: [GroupFilterComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'new-demo';
  fromDate!: Date;
  toDate!: Date;

  selectedValuesFromGroup: SelectedValue[] = [];
  listEmployee: EmployeeRecord[] = FAKE_DATA;
  tableEmployeeColumns: Column[] = TABLE_EMPLOYEE_COLUMNS;

  updateDateRange(dateRange: DateRange) {
    this.fromDate = dateRange.fromDate;
    this.toDate = dateRange.toDate;
  }

  onGroupFilterValuesChange(updatedValues: SelectedValue[]): void {
    this.selectedValuesFromGroup = updatedValues;
  }
}
