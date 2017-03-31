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

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent },
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
    ToastModule.forRoot()
  ],
  providers: [
    ElectronKioskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
