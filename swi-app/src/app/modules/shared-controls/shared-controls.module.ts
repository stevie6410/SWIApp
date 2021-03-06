import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { CameraModule } from "../../modules/camera/camera.module";

import { OrderBy } from "./components/order-by-pipe/order-by.pipe";
import { PageComponent } from './components/page/page.component';
import { SwiCardComponent } from './components/swi-card/swi-card.component';
import { SwiCategoryPickerComponent } from './components/swi-category-picker/swi-category-picker.component';
import { ToggleFullscreenDirective } from './components/toggle-fullscreen/toggle-fullscreen.directive';
import { SwiImageComponent } from './components/swi-image/swi-image.component';

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
    ToggleFullscreenDirective,
    SwiImageComponent
  ],
  declarations: [
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent,
    ToggleFullscreenDirective,
    SwiImageComponent
  ],
  entryComponents: [
  ]
})
export class SharedControlsModule { }
