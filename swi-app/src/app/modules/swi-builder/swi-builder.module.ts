import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiBuilderScreenComponent } from './components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SWIFileService } from '../../services/swi-file.service';
import { SwiHeaderComponent } from './components/swi-header/swi-header.component';
import { SwiStagesListComponent } from './components/swi-stages-list/swi-stages-list.component';
import { SwiStageEditComponent } from './components/swi-stage-edit/swi-stage-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SwiNewComponent } from './components/swi-new/swi-new.component';
import { SwiHsListComponent } from './components/swi-hs-list/swi-hs-list.component';
import { SWIHSItemService } from "./services/swi-hs.service";
import { SwiHsPickerComponent } from './components/swi-hs-picker/swi-hs-picker.component';


@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    SwiBuilderScreenComponent,
    SwiNewComponent
  ],
  declarations: [
    SwiBuilderScreenComponent,
    SwiHeaderComponent,
    SwiStagesListComponent,
    SwiStageEditComponent,
    SwiNewComponent,
    SwiHsListComponent,
    SwiHsPickerComponent
  ],
  providers: [
    SWIFileService,
    SWIHSItemService
  ]
})
export class SwiBuilderModule { }
