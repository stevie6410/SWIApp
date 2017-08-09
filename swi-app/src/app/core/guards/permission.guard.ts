import { Injectable } from "@angular/core";
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "app/core";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private toast: ToastsManager
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(route);
  }

  validate(route: ActivatedRouteSnapshot): boolean {
    const permissionCheck = this.hasPermission(route);
    console.log(`Permission granted: ${permissionCheck.result} - Reason: ${permissionCheck.reason}`, permissionCheck.requiredPermissions);
    if (!permissionCheck.result) {
      this.toast.error(
        "You do not have the permissions for " + permissionCheck.requiredPermissions.join(', '),
        "Permission Denied",
        { toastLife: 5000 }
      );
    }
    return permissionCheck.result;
  }

  hasPermission(route: ActivatedRouteSnapshot): { result: boolean, reason: string, requiredPermissions: string[] } {
    const user = this.authService.loggedInUser;
    const requiredPermissions: string[] = (route.data) ? route.data.permissions : [];
    // console.log("Route: ", route.data);
    // console.log("RequiredPermissions: ", requiredPermissions);
    // console.log("User: ", user);
    if (requiredPermissions) {
      if (!user) { return { result: false, reason: 'User not logged in', requiredPermissions: requiredPermissions }; }
      requiredPermissions.forEach(p => {
        const hasPermission = user.permissions.find(pp => pp.Name === p);
        if (!hasPermission) {
          return { result: false, reason: 'Does not have permission: ' + p, requiredPermissions: requiredPermissions };
        }
      });
      return { result: true, reason: 'Has all of the required permissions', requiredPermissions: requiredPermissions };
    } else {
      return { result: true, reason: 'No permissions required', requiredPermissions: requiredPermissions };
    }
  }
}
