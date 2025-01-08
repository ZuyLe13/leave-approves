import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { GenericItem, SelectedValue } from '../shared/shared.const';
import { MatIconModule } from '@angular/material/icon';
import { DropdownSelectComponent } from '../dropdown-select/dropdown-select.component';

type ToggleState<T extends string> = Record<T, boolean>;

type FakeData = GenericItem<string>;

type StateKeys = 'menu' | 'status' | 'employee' | 'userStatus';

@Component({
  selector: 'app-multi-filter',
  imports: [CommonModule, MatIconModule, DropdownSelectComponent],
  templateUrl: './multi-filter.component.html',
  styleUrl: './multi-filter.component.scss',
})
export class MultiFilterComponent {
  fakeStatusData: FakeData[] = [
    { value: 'Waiting for approval' },
    { value: 'Approved' },
    { value: 'Rejected' },
    { value: 'Cancelled' },
    { value: 'Waiting for cancel' },
    { value: 'Approve cancelled' },
    { value: 'Reject cancelled' },
  ];

  fakeEmployeeData: FakeData[] = [
    { value: 'Le Anh Duy' },
    { value: 'Le Van B' },
    { value: 'Nguyen Van A' },
    { value: 'Employee 4' },
    { value: 'Employee 5' },
  ];

  fakeUserStatusData: FakeData[] = [
    { value: 'Active' },
    { value: 'Inactive' },
    { value: 'All' },
  ];

  showState: ToggleState<StateKeys> = {
    menu: false,
    status: false,
    employee: false,
    userStatus: false,
  };

  @Output() selectedValuesChange = new EventEmitter<SelectedValue[]>();

  isDropdownOpen: boolean = false;
  selectedValues: SelectedValue[] = [];

  constructor(private elementRef: ElementRef) {}

  get isShowClose(): boolean {
    return this.selectedValues.length > 0;
  }

  hasStatusItems(type: string): boolean {
    return this.selectedValues.some((item) => item.type === type);
  }

  toggle(event: Event, type: keyof ToggleState<StateKeys>) {
    this.isDropdownOpen = true;
    const target = event.target as HTMLElement;

    if (target.closest('.close-icon') || target.closest('.close-all')) {
      event.stopPropagation();
      return;
    }

    Object.keys(this.showState).forEach((key) => {
      this.showState[key as keyof ToggleState<StateKeys>] =
        key === type
          ? !this.showState[key as keyof ToggleState<StateKeys>]
          : false;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
      Object.keys(this.showState).forEach(
        (key) => (this.showState[key as keyof ToggleState<StateKeys>] = false)
      );
    }
  }

  onSelectChange(selected: { value: string }, type: string): void {
    const selectedValue = selected.value;

    this.selectedValues = [
      ...new Map(
        [...this.selectedValues, { type, value: selectedValue }].map((item) => [
          item.type + item.value,
          item,
        ])
      ).values(),
    ];

    this.selectedValuesChange.emit(this.selectedValues);
  }

  removeSelectedValue(value: string) {
    this.selectedValues = this.selectedValues.filter(
      (item) => item.value !== value
    );

    this.selectedValuesChange.emit(this.selectedValues);
  }

  clearAllSelectedValues() {
    this.selectedValues = [];
    this.selectedValuesChange.emit(this.selectedValues);
  }
}
