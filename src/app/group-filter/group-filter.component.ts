import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  PeriodType,
  DateRange,
  PeriodEnum,
  MY_FORMATS,
  SelectedValue,
  PeriodTypes,
} from '../shared/shared.const';
import * as _moment from 'moment';
import { CommonModule } from '@angular/common';
import { default as _rollupMoment } from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MultiFilterComponent } from '../multi-filter/multi-filter.component';
import { DropdownSelectComponent } from '../dropdown-select/dropdown-select.component';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-group-filter',
  providers: [provideNativeDateAdapter(), provideMomentDateAdapter(MY_FORMATS)],
  imports: [
    DropdownSelectComponent,
    MultiFilterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group-filter.component.html',
  styleUrl: './group-filter.component.scss',
})
export class GroupFilterComponent implements OnInit {
  periodTypes = PeriodTypes;

  fromDate!: Date | null;
  toDate!: Date | null;
  isCustom: boolean = false;
  readonly date = new FormControl(moment());

  selectedValuesFromChild: SelectedValue[] = [];

  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() selectedValuesChange = new EventEmitter<SelectedValue[]>();

  onPeriodChange(selected: PeriodType): void {
    const today = moment();
    this.isCustom = false;

    switch (selected.value) {
      case PeriodEnum.TODAY:
        this.fromDate = this.toDate = today.toDate();
        break;

      case PeriodEnum.THIS_WEEK:
        this.fromDate = today.startOf('week').toDate();
        this.toDate = today.endOf('week').toDate();
        break;

      case PeriodEnum.THIS_MONTH:
        this.fromDate = today.startOf('month').toDate();
        this.toDate = today.endOf('month').toDate();
        break;

      case PeriodEnum.LAST_MONTH:
        this.fromDate = today.subtract(1, 'month').startOf('month').toDate();
        this.toDate = today.endOf('month').toDate();
        break;

      case PeriodEnum.NEXT_MONTH:
        this.fromDate = today.add(1, 'month').startOf('month').toDate();
        this.toDate = today.endOf('month').toDate();
        break;

      case PeriodEnum.THIS_YEAR:
        this.fromDate = today.startOf('year').toDate();
        this.toDate = today.endOf('year').toDate();
        break;

      default:
        this.isCustom = true;
        this.fromDate = null;
        this.toDate = null;
        break;
    }

    this.dateRangeChange.emit({
      fromDate: this.fromDate!,
      toDate: this.toDate!,
    });
  }

  onDateChange() {
    this.dateRangeChange.emit({
      fromDate: this.fromDate!,
      toDate: this.toDate!,
    });
  }

  onSelectedValuesChange(updatedValues: SelectedValue[]): void {
    this.selectedValuesFromChild = updatedValues;
    this.selectedValuesChange.emit(this.selectedValuesFromChild);
  }

  ngOnInit(): void {
    this.fromDate = this.toDate = moment().toDate();
  }
}
