import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { EmployeeRecord, FAKE_DATA } from '../shared/employee';
import { SelectedValue } from '../shared/shared.const';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MobileListComponent } from '../mobile-list/mobile-list.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    CommonModule,
    MatIconModule,
    MobileListComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'select',
    'employee',
    'type',
    'day',
    'gapTime',
    'reason',
    'approvedBy',
    'approvedTime',
    'status',
  ];
  dataSource = new MatTableDataSource<EmployeeRecord>(FAKE_DATA);
  selection = new SelectionModel<EmployeeRecord>(true, []);

  tableData: EmployeeRecord[] = FAKE_DATA;
  filteredWithDateData: EmployeeRecord[] = [];
  noData: boolean = false;
  showFirstLastButtons = true;

  @Input() fromDate!: Date | null;
  @Input() toDate!: Date | null;
  @Input() selectedValues: SelectedValue[] = [];
  @Output() filteredDataForMobile = new EventEmitter<EmployeeRecord[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['tableData'] ||
      changes['fromDate'] ||
      changes['toDate'] ||
      changes['selectedValues']
    ) {
      this.applyCombinedFilter();
    }
  }

  applyCombinedFilter() {
    const fromDateString = moment(this.fromDate).format('YYYY-MM-DD');
    const toDateString = moment(this.toDate).format('YYYY-MM-DD');

    const filtersByType = this.selectedValues.reduce((acc, filter) => {
      if (!acc[filter.type]) {
        acc[filter.type] = [];
      }
      acc[filter.type].push(filter.value.toLowerCase());
      return acc;
    }, {} as { [key: string]: string[] });

    this.filteredWithDateData = this.tableData.filter((item) => {
      // Kiểm tra filter theo ngày
      const itemDateString = moment(item.day).format('YYYY-MM-DD');
      const dateCondition =
        (!fromDateString || itemDateString >= fromDateString) &&
        (!toDateString || itemDateString <= toDateString);

      // Kiểm tra filter theo selectedValues
      const selectedCondition = Object.keys(filtersByType).every((type) => {
        const filterValues = filtersByType[type];
        switch (type) {
          case 'employee':
            return filterValues.some((value) =>
              item.employee.toLowerCase().includes(value)
            );
          case 'type':
            return filterValues.some((value) =>
              item.type.toLowerCase().includes(value)
            );
          case 'status':
            return filterValues.some((value) =>
              item.status.toLowerCase().includes(value)
            );
          default:
            return true;
        }
      });

      return dateCondition && selectedCondition;
    });

    this.noData = this.filteredWithDateData.length === 0;

    this.dataSource.data = [...this.filteredWithDateData];

    this.filteredDataForMobile.emit(this.filteredWithDateData);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: EmployeeRecord): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.employee + 1
    }`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fromDate = this.toDate = moment().toDate();
    this.applyCombinedFilter();
  }
}
