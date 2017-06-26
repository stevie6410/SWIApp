import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { SWIFileService, generateHash, SWIHeader, SWIStageGroup, hasChanges } from "app/core";

@Component({
  selector: 'swi-builder-screen',
  templateUrl: './swi-builder-screen.component.html',
  styleUrls: ['./swi-builder-screen.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiBuilderScreenComponent implements OnInit {

  swi: SWIHeader;
  pageTitle: string = "SWI Builder";
  initalSWIState: number;

  constructor(
    public swiService: SWIFileService,
    private toast: ToastsManager,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("Route data SWI Builder screen", route.snapshot.data);
    this.swi = this.route.snapshot.data['swi'];
    this.initalSWIState = generateHash(JSON.stringify(this.swi));
    this.validateStageOrder();
    this.pageTitle = `SWI Builder - ${this.swi.title}`;
  }

  ngOnInit() {
  }

  onBackButton() {
    this.saveFile(true);
  }

  addStageGroup() {
    if (!this.swi.stageGroups) this.swi.stageGroups = [];
    let newGroupName: string = "New Group " + (this.swi.stageGroups.length + 1).toString();
    let newGroup: SWIStageGroup = new SWIStageGroup(newGroupName);
    this.swi.stageGroups.push(newGroup);
    this.saveFile(false);
  }

  validateStageOrder() {
    let i = 1;
    this.swi.swiStages.forEach(stage => {
      if (stage.sequence != i) stage.sequence = i;
      i++;
    });
  }

  saveFile(navBack: boolean) {
    if (!hasChanges(this.swi, this.initalSWIState)) {
      if (navBack) this.naviagetBackToManager();
      this.toast.success(`File Saved!`, null, { toastLife: 1000, positionClass: "toast-bottom-center" });
      console.log("There were no changes");
    } else {
      console.log("Saving as there were changes");
      this.swiService.update(this.swi)
        .then((result) => {
          if (navBack) {
            this.naviagetBackToManager();
          } else {
            this.toast.success(`File Saved!`, null, { toastLife: 1000, positionClass: "toast-bottom-center" });
          }
        })
        .catch((err) => {
          console.log("Error saving file: ", err);
          this.toast.error(`File could not be created`, "Error saving file!");
        })
    }
  }

  naviagetBackToManager() {
    this.router.navigate(['manager', this.swi.id]);
  }

  selectedGroup(group: SWIStageGroup) {
    console.log("Selected Group: ", group);
  }

}
