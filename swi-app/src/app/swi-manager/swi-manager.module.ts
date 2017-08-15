import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SwiManagerScreenComponent } from "./components/swi-manager-screen/swi-manager-screen.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { SWIExportButton } from "./directives/swi-export.directive";
import { SWIDuplicateButton } from "./directives/swi-duplicate.directive";
import { SWIDeleteButtonDirective } from "./directives/swi-delete.directive";
import { SWICreateMasterButton } from "./directives/swi-create-master.directive";
import { MomentModule } from "angular2-moment";
import { SWIUpgradeDirective } from "./directives/swi-upgrade.directive";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MomentModule
  ],
  exports: [
    SwiManagerScreenComponent,
    SWIExportButton,
    SWIDuplicateButton,
    SWIDeleteButtonDirective,
    SWICreateMasterButton,
    SWIUpgradeDirective
  ],
  declarations: [
    SwiManagerScreenComponent,
    SWIExportButton,
    SWIDuplicateButton,
    SWIDeleteButtonDirective,
    SWICreateMasterButton,
    SWIUpgradeDirective
  ]
})
export class SwiManagerModule { }
