import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SwiBuilderModule } from '../swi-builder/swi-builder.module';
import { ElectronService } from '../../services/electron.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import { SwiBuilderScreenComponent } from '../swi-builder/components/swi-builder-screen/swi-builder-screen.component';
import { SwiStageEditComponent } from '../swi-builder/components/swi-stage-edit/swi-stage-edit.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOptions } from './toastr.options';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'swibuilder', component: SwiBuilderScreenComponent },
  { path: 'swibuilder/:filename', component: SwiBuilderScreenComponent },
  { path: 'swibuilder/:filename/stages/:sequence', component: SwiStageEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiBuilderModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    SharedControlsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    ElectronService,
    { provide: ToastOptions, useClass: CustomOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
