import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SwiCardComponent } from './swi-card/swi-card.component';
import { FormsModule } from "@angular/forms";
import { OrderBy } from "./order-by-pipe/order-by.pipe";
import { SwiCategoryPickerComponent } from './swi-category-picker/swi-category-picker.component';
import { CameraModule } from "../../modules/camera/camera.module";
import { ToggleFullscreenDirective } from './toggle-fullscreen/toggle-fullscreen.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CameraModule
  ],
  exports: [
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent,
    ToggleFullscreenDirective
  ],
  declarations: [
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent,
    ToggleFullscreenDirective
  ],
  entryComponents: [
  ]
})
export class SharedControlsModule { }
