import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Role, RolesService, CreateRole } from "app/core";

@Component({
  selector: 'swi-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  @Input() role: Role;
  @Output() saved = new EventEmitter<Role>();
  @Output() deleted = new EventEmitter<void>();
  saving: boolean = false;

  constructor(
    private roleService: RolesService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
  }

  async save() {
    this.saving = true;
    try {
      let newRole: Role = (this.role.id) ? await this.update(this.role) : await this.create(this.role, this.appId);
      this.role = newRole;
      this.saved.emit(newRole);
    } catch (error) {
      console.log(error);
    }
    this.saving = false;
    console.log(this.role);
  }

  async delete(role: Role) {
    this.saving = true;
    try {
      if (this.role.id) await this.roleService.delete(role.id).toPromise();
      this.role = null;
      this.deleted.emit();
    } catch (error) {
      console.log("Could not delete role", error);
    }
    this.saving = false;
  }

  private async update(role: Role) {
    return await this.roleService.update(this.role).toPromise();
  }

  private async create(role: Role, appId: number) {
    let createRole: CreateRole = new CreateRole();
    createRole.applicationId = appId;
    createRole.name = role.name;
    createRole.description = role.description;
    return await this.roleService.create(createRole).toPromise();
  }

  private get appId(): number {
    return this.route.snapshot.params['appId'];
  }
}
