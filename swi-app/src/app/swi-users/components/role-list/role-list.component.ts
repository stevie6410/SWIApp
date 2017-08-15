import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { ConfirmationService } from "primeng/primeng";

import { Role, CreateRole, RolesService, Application, UsersService, User } from "app/core";
import { RoleEditDialogComponent, RolePickerComponent } from "app/swi-users";

export enum RoleListMode {
  ApplicationMode,
  UserMode
}

@Component({
  selector: 'swi-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  @Input() roles: Role[];
  @Input() user: User;
  @Input() selectedRole: Role;
  @Input() app: Application;
  @Input() mode: RoleListMode;
  @Output() selected = new EventEmitter<Role>();
  @Output() onRefreshRequest = new EventEmitter<void>();
  @ViewChild("rolePicker") rolePicker: RolePickerComponent;
  @ViewChild("roleEditDialog") roleEditDialog: RoleEditDialogComponent;
  newRole: CreateRole;
  pickRoleDialog: boolean = false;
  deleteRoleDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private roleService: RolesService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  onRowClick(role: Role) {
    // console.log("Clicked role: ", role);
    this.roleSelected(role);
  }

  onRowDblClick(role: Role) {
    console.log("Dbl clicked on role: ", role);
  }

  roleSelected(role: Role) {
    this.selectedRole = role;
    this.selected.emit(role);
  }

  addRoleSelector() {
    if (this.mode == RoleListMode.UserMode) {
      //Open the UserRole dialog
      this.rolePicker.show();
    } else if (this.mode == RoleListMode.ApplicationMode) {
      //Open the Role edit dialog
      this.roleEditDialog.show();
      this.roleEditDialog.role = new Role();
    } else {
      console.log("RoleListMode has not been set");
    }
  }

  removeRoleSelector() {
    if (this.mode == RoleListMode.UserMode) {
      this.removeUserRole(this.user, this.selectedRole);
    } else if (this.mode == RoleListMode.ApplicationMode) {
      this.removeRole(this.selectedRole);
    } else {
      console.log("RoleListMode has not been set");
    }
  }

  async addUserRole(user: User, roleId: number) {
    //Create a new UserRole
    if (user && roleId) {
      await this.userService.addRole(user.username, roleId).toPromise();
      this.rolePicker.hide();
      this.onRefreshRequest.emit();
    } else {
      console.log("Could not request add");
      console.log("this.user", user);
      console.log("roleId", roleId);
    }
  }

  async removeUserRole(user: User, role: Role) {
    if (user && role) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to remove this role?',
        key: 'roleListDialog',
        accept: async () => {
          await this.userService.removeRole(user.username, role.id).toPromise();
          this.onRefreshRequest.emit();
        }
      });
    } else {
      console.log("Could not remove role");
    }
  }

  async removeRole(role: Role) {
    console.log("Removing ", role);
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this role?',
      key: 'roleListDialog',
      accept: async () => {
        await this.roleService.delete(role.id).toPromise();
        this.onRefreshRequest.emit();
      }
    });
  }

}
