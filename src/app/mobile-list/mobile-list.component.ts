import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mobile-list',
  imports: [MatIconModule, CommonModule, MatPaginatorModule],
  templateUrl: './mobile-list.component.html',
  styleUrl: './mobile-list.component.scss',
})
export class MobileListComponent<T> {
  @Input() tableData: T[] = [];
  showFirstLastButtons = true;

  paginatedList: any[] = [];
  pageSize = 5;
  currentPage = 0;

  ngOnChanges() {
    this.currentPage = 0;
    this.updatePaginatedList();
  }

  ngOnInit() {
    this.updatePaginatedList();
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedList();
  }

  private updatePaginatedList() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.tableData.slice(startIndex, endIndex);
  }
}
