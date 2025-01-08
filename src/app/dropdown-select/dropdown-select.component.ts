import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dropdown-select',
  imports: [CommonModule, MatIconModule],
  templateUrl: './dropdown-select.component.html',
  styleUrl: './dropdown-select.component.scss',
})
export class DropdownSelectComponent<T extends { value: string }> {
  @Input() items: T[] = [];
  @Input() selectedItem!: any;
  @Output() selectionChange = new EventEmitter<T>();

  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown-select');
    if (!dropdownElement?.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  onItemSelect(item: T): void {
    this.selectedItem = item.value;
    this.selectionChange.emit(item);
    this.isDropdownOpen = false;
  }
}
