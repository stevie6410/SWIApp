import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiBuilderScreenComponent } from './components/swi-builder-screen/swi-builder-screen.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
// import { SWIFileService } from '../../services/swi-file.service';
import { ImageService } from '../../services/image.service';
import { ImageStoreService } from '../../services/image-store.service';
import { SwiHeaderComponent } from './components/swi-header/swi-header.component';
import { SwiStagesListComponent } from './components/swi-stages-list/swi-stages-list.component';
import { SwiStageEditComponent } from './components/swi-stage-edit/swi-stage-edit.component';
import { SwiNewComponent } from './components/swi-new/swi-new.component';
import { SwiHsListComponent } from './components/swi-hs-list/swi-hs-list.component';
import { SWIHSItemService } from "./services/swi-hs.service";
import { SwiHsPickerComponent } from './components/swi-hs-picker/swi-hs-picker.component';
import { SwiToolsListComponent } from './components/swi-tools-list/swi-tools-list.component';
import { SwiToolEditComponent } from './components/swi-tool-edit/swi-tool-edit.component';
import { SwiErpPartsComponent } from './components/swi-erp-parts/swi-erp-parts.component';
import { DragulaModule } from "ng2-dragula";
import { SaveChangesDirective } from './directives/save-changes.directive';
import { DiscardChangesDirective } from './directives/discard-changes.directive';
import { Ng2PicaModule } from "ng2-pica";
import { DuplicateStageDirective } from "./directives/duplicate-stage.directive";
import { SortablejsModule } from "angular-sortablejs";
import { SwiGroupComponent } from './components/swi-group/swi-group.component';

@NgModule({
  imports: [
    CommonModule,
    SharedControlsModule,
    FormsModule,
    DragulaModule,
    Ng2PicaModule,
    SortablejsModule
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
    SwiHsPickerComponent,
    SwiToolsListComponent,
    SwiToolEditComponent,
    SwiErpPartsComponent,
    SaveChangesDirective,
    DiscardChangesDirective,
    DuplicateStageDirective,
    SwiGroupComponent
  ],
  providers: [
    // SWIFileService,
    SWIHSItemService,
    ImageService,
    ImageStoreService
  ]
})
export class SwiBuilderModule { }
