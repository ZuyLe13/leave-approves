import { Component } from '@angular/core';
import { Column } from './shared/column';
import { TABLE_EMPLOYEE_COLUMNS } from './shared/table-employee';
import { FAKE_DATA, EmployeeRecord } from './shared/Employee';
import { SelectedValue } from './shared/shared.const';
import { GroupFilterComponent } from './group-filter/group-filter.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableComponent } from './table/table.component';

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

  updateDateRange(dateRange: { fromDate: Date; toDate: Date }) {
    this.fromDate = dateRange.fromDate;
    this.toDate = dateRange.toDate;
  }

  onGroupFilterValuesChange(updatedValues: SelectedValue[]): void {
    this.selectedValuesFromGroup = updatedValues;
  }
}
