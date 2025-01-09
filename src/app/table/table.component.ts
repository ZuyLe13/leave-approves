import {
  AfterViewInit,
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import moment from 'moment';
import { RouterModule } from '@angular/router';
import { Column } from '../shared/table-column';
import { SelectedValue } from '../shared/shared.const';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MobileListComponent } from '../mobile-list/mobile-list.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { typeLeaveColors, statusColors } from '../shared/color';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatIconModule,
    MobileListComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements AfterViewInit, OnInit {
  @Input() tableColumns: Column[] = [];
  @Input() tableData: T[] = [];
  @Input() fromDate!: Date | null;
  @Input() toDate!: Date | null;
  @Input() selectedValues: SelectedValue[] = [];
  @Output() filteredDataForMobile = new EventEmitter<T[]>();

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  filteredWithDateData: T[] = [];
  noData: boolean = false;
  showFirstLastButtons: boolean = true;
  selection = new SelectionModel<T>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    this.applyCombinedFilter();
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

    this.filteredWithDateData = this.tableData.filter((item: any) => {
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
              item.employee?.toLowerCase().includes(value)
            );
          case 'type':
            return filterValues.some((value) =>
              item.type?.toLowerCase().includes(value)
            );
          case 'status':
            return filterValues.some((value) =>
              item.status?.toLowerCase().includes(value)
            );
          default:
            return true;
        }
      });

      return dateCondition && selectedCondition;
    });

    this.noData = this.filteredWithDateData.length === 0;

    this.filteredDataForMobile.emit(this.filteredWithDateData);

    this.dataSource.data = this.filteredWithDateData;
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

  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  getTypeLeaveColor(type: string): string {
    return typeLeaveColors[type] || 'bg-[#e0e0e0]';
  }

  getStatusConfig(status: string): { icon: string; color: string } {
    return (
      statusColors[status] || { icon: 'error_outline', color: 'text-gray-600' }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'select',
      ...this.tableColumns.map((c) => c.columnDef),
    ];
    this.applyCombinedFilter();
  }
}
