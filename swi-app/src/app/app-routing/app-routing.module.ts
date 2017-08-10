// Angualr Core Modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Component Imports For Routing
import { HomeComponent } from "../app/components/home/home.component";
import { SwiBuilderScreenComponent } from "../swi-builder/components/swi-builder-screen/swi-builder-screen.component";
import { SwiStageEditComponent } from "../swi-builder/components/swi-stage-edit/swi-stage-edit.component";
import { SwiBrowserScreenComponent } from "../swi-browser/components/swi-browser-screen/swi-browser-screen.component";
import { SwiNewComponent } from "../swi-builder/components/swi-new/swi-new.component";
import { SwiHsPickerComponent } from "../swi-builder/components/swi-hs-picker/swi-hs-picker.component";
import { SwiToolEditComponent } from "../swi-builder/components/swi-tool-edit/swi-tool-edit.component";
import { SwiImporterScreenComponent } from "../swi-importer/components/swi-importer-screen/swi-importer-screen.component";
import { SwiViewerScreenComponent } from "../swi-viewer/components/swi-viewer-screen/swi-viewer-screen.component";
import { SwiManagerScreenComponent } from "../swi-manager/components/swi-manager-screen/swi-manager-screen.component";
import { StagesGalleryScreenComponent } from "../swi-viewer/components/stages-gallery-screen/stages-gallery-screen.component";
import { RepoSearchComponent } from "../swi-repo/components/repo-search/repo-search.component";
import {
  StdToolingSearchComponent,
  StdToolingFormComponent,
  SWIStandardToolResolver
} from "app/swi-standard-tooling";

// Resolvers
import { SWIsResolver, SWIResolver, HSItemsResolver, AuthGuard, PermissionGuard } from "app/core";
import { LoginComponent } from "app/shared";
import { SwiSettingsScreenComponent, SwiSettingsFeaturesComponent, SwiSettingsStorageComponent } from "app/swi-settings";
import { UserSearchScreenComponent } from "app/swi-users";

const appRoutes: Routes = [
  {
    path: "", component: HomeComponent, canActivateChild: [PermissionGuard], children: [
      {
        path: "browser",
        component: SwiBrowserScreenComponent,
        resolve: { swis: SWIsResolver }
      },
      {
        path: "viewer",
        children: [
          { path: ":id", component: SwiViewerScreenComponent, resolve: { swi: SWIResolver } },
          { path: ":id/stagesgallery", component: StagesGalleryScreenComponent, resolve: { swi: SWIResolver } },
        ]
      },
      {
        path: "manager/:id",
        component: SwiManagerScreenComponent,
        resolve: { swi: SWIResolver }
      },
      {
        path: "builder", children: [
          { path: "create", component: SwiNewComponent },
          { path: ":id", component: SwiBuilderScreenComponent, resolve: { swi: SWIResolver } },
          { path: ":id/stagegroup/:groupid/stages/:stageid", component: SwiStageEditComponent, resolve: { swi: SWIResolver } },
          { path: ":id/stagegroup/:groupid/tools/:toolid", component: SwiToolEditComponent, resolve: { swi: SWIResolver } },
          { path: ":id/hsitems", component: SwiHsPickerComponent, resolve: { hsitems: HSItemsResolver, swi: SWIResolver } },
          { path: ":id/tools/:toolid", component: SwiToolEditComponent, resolve: { swi: SWIResolver } },
        ],
      },
      { path: "importer", component: SwiImporterScreenComponent },
      {
        path: "repo", canActivateChild: [AuthGuard], children: [
          { path: "search", component: RepoSearchComponent },
          { path: "tooling/search", component: StdToolingSearchComponent },
          { path: "tooling/edit/:id", component: StdToolingFormComponent, resolve: { stdTool: SWIStandardToolResolver } },
          { path: "tooling/new", component: StdToolingFormComponent },
        ]
      },
      {
        path: "settings", component: SwiSettingsScreenComponent, children: [
          {
            path: "local", children: [
              { path: "features", component: SwiSettingsFeaturesComponent },
              { path: "storage", component: SwiSettingsStorageComponent }
            ]
          },
          {
            path: "repo", canActivateChild: [AuthGuard], children: [
              { path: "users", component: UserSearchScreenComponent }
            ]
          },
          {
            path: "security", canActivateChild: [AuthGuard], children: [
              { path: "users", component: UserSearchScreenComponent }
            ]
          }
        ]
      }
    ]
  },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }



