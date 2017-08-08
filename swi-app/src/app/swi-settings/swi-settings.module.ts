import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SwiSettingsScreenComponent } from './screens/swi-settings-screen/swi-settings-screen.component';
import { SwiSettingsMenuComponent } from './components/swi-settings-menu/swi-settings-menu.component';
import { SwiSettingsFeaturesComponent } from './components/swi-settings-features/swi-settings-features.component';
import { SharedModule } from "app/shared";
import { SwiSettingsStorageComponent } from './components/swi-settings-storage/swi-settings-storage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    SwiSettingsScreenComponent,
    SwiSettingsMenuComponent,
    SwiSettingsFeaturesComponent,
    SwiSettingsStorageComponent
  ]
})
export class SwiSettingsModule { }
