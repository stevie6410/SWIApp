import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Role, RolesService, Application } from "app/core";
import { SelectItem } from "primeng/primeng";

@Component({
  selector: 'swi-role-picker',
  templateUrl: './role-picker.component.html',
  styleUrls: ['./role-picker.component.scss']
})
export class RolePickerComponent implements OnInit, AfterViewInit {

  roles: Role[];
  options: SelectItem[] = [];
  selectedRole: number;
  @Output() onSelected = new EventEmitter<number>();
  @Input() app: Application;
  @Input() visible = false;

  constructor(
    private roleService: RolesService
  ) { }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.roles = await this.roleService.getAll().toPromise();
    await this.updateOptions();
  }

  confirmed() {
    console.log("selectedRole: ", this.selectedRole);
    this.onSelected.emit(this.selectedRole);
    console.log("selectedRole: ", this.selectedRole);
  }

  show() {
    this.visible = true;
    this.updateOptions();
    this.selectedRole = null;
  }

  hide() {
    this.visible = false;
    this.updateOptions();
    this.selectedRole = null;
  }

  async updateOptions() {
    console.log("Updating dd options");
    this.options = [];
    let r: Role[] = [];
    Object.assign(r, this.roles);

    if (this.app) r = r.filter(r => r.application.id == this.app.id);
    this.options = r.map(x => { return { label: x.name, value: x.id } });
  }
}
