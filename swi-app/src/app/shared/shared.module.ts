//Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

//3rd Party Modules
import { ProgressBarModule } from "primeng/primeng";

//Modules
import { CameraModule } from "../camera/camera.module";

//Components
import { PageComponent } from './components/page/page.component';
import { SwiCardComponent } from './components/swi-card/swi-card.component';
import { SwiImageComponent } from './components/swi-image/swi-image.component';
import { SwiCategoryPickerComponent } from './components/swi-category-picker/swi-category-picker.component';

//Pipes
import { OrderBy } from "./pipes/order-by.pipe";

//Directives
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { UpdateAppCatalogDirective } from './directives/update-app-catalog.directive';
import { ImportDropZoneDirective } from "./directives/import-dnd.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule,
    CameraModule
  ],
  exports: [
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent,
    ToggleFullscreenDirective,
    SwiImageComponent,
    ImportDropZoneDirective
  ],
  declarations: [
    ImportDropZoneDirective,
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent,
    ToggleFullscreenDirective,
    SwiImageComponent,
    UpdateAppCatalogDirective
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
