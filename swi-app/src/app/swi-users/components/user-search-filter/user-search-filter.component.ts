import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserSearchFilter } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-user-search-filter',
  templateUrl: './user-search-filter.component.html',
  styleUrls: ['./user-search-filter.component.scss']
})
export class UserSearchFilterComponent implements OnInit {

  @Input() filter: UserSearchFilter;
  @Input() companyOptions: SelectItem[];
  @Output() onSearch = new EventEmitter<UserSearchFilter>();

  constructor() {
    this.resetFilter();
  }

  ngOnInit() {
  }

  resetFilter() {
    this.filter = new UserSearchFilter();
    this.filter.appid = "SWIAPP";
  }

  search() {
    this.onSearch.emit(this.filter);
  }

}
