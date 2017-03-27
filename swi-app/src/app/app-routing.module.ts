import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwiBuilderComponent } from './modules/swi-builder/swi-builder.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: 'builder', component: SwiBuilderComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
