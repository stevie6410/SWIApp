import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from "@angular/forms";
import { AppCatalogservice } from "../../../../services/app-catalog.service";

@Component({
  selector: 'swi-category-picker',
  template: `
    <label for="catPicker">Category</label>
    <select id="catPicker" class="form-control" [(ngModel)]="value">
      <option *ngFor="let cat of categories" [ngValue]="cat">{{cat}}</option>
    </select>
  `,
  styleUrls: ['./swi-category-picker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SwiCategoryPickerComponent, multi: true }
  ]
})
export class SwiCategoryPickerComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() control: FormControl;

  categories: string[] = [];
  private _selectedValue: string;

  constructor(
    private appCatalog: AppCatalogservice
  ) { }

  ngOnInit() {
    this.updateCategories();
  }

  private async updateCategories() {
    let catalog = await this.appCatalog.getCatalog();
    this.categories = catalog.categories.map(c => c.name);
  }

  get value(): string {
    return this._selectedValue;
  };

  set value(v: string) {
    if (v !== this._selectedValue) {
      this._selectedValue = v;
      this.onChange(v);
    }
  }

  // write the value to the input
  writeValue(value: string) {
    if (value != undefined) {
      this._selectedValue = value;
      this.onChange(value);
    }
  }

  onChange = (_) => { };
  onTouched = (_) => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  hasError() {
    return this.control.errors;
  }
  isErrorVisible(error: string) {
    return this.control.errors && this.control.errors[error];
  }
}
