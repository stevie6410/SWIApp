import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Role, RolesService, CreateRole, Application } from "app/core";

@Component({
  selector: 'swi-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrls: ['./role-edit-dialog.component.scss']
})
export class RoleEditDialogComponent implements OnInit {

  @Input() role: Role;
  @Input() app: Application;
  @Output() onSaved = new EventEmitter<void>();
  visible = false;

  constructor(
    private roleService: RolesService
  ) { }

  ngOnInit() {
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  async save() {
    const create: CreateRole = new CreateRole();
    create.name = this.role.name;
    create.description = this.role.description;
    create.applicationId = this.app.id;
    await this.roleService.create(create).toPromise();
    this.onSaved.emit();
    this.hide();
  }

  delete() {

  }
}
