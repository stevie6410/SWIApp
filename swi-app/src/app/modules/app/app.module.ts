import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';
import { ElectronKioskService } from '../../services/electron-kiosk.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import { SwiBuilderScreenComponent } from '../swi-builder/components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'swibuilder', component: SwiBuilderScreenComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    SharedControlsModule
  ],
  providers: [
    ElectronKioskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
