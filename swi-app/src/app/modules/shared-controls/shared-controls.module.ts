import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { SwiCardComponent } from './swi-card/swi-card.component';
import { FormsModule } from "@angular/forms";
import { OrderBy } from "./order-by-pipe/order-by.pipe";
import { SwiCategoryPickerComponent } from './swi-category-picker/swi-category-picker.component';
import { CameraModule } from "../../modules/camera/camera.module";

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
    SwiCategoryPickerComponent
  ],
  declarations: [
    PageComponent,
    SwiCardComponent,
    OrderBy,
    SwiCategoryPickerComponent
  ],
  entryComponents: [
  ]
})
export class SharedControlsModule { }
