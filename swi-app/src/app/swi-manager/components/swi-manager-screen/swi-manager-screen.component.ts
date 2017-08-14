import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { EnvironmentService } from "app/app/services/environment.service";
import {
  SWIMaster,
  SWIHeader,
  SWIRevision,
  SWIFileService,
  ImageStoreService,
  RepoDocsService,
  SyncRepoService,
  SwiUpgradeService,
  AuthService
} from "app/core";

@Component({
  selector: "swi-swi-manager-screen",
  templateUrl: "./swi-manager-screen.component.html",
  styleUrls: ["./swi-manager-screen.component.scss"]
})
export class SwiManagerScreenComponent implements OnInit {

  swi: SWIHeader;
  swiMaster: SWIMaster;
  loadingRepo = true;
  loadingRepoError: string;
  isSyncing: boolean;
  pageLoading = false;
  loadingMessage = "Loading";
  activeRevision: SWIRevision;
  isOutOfSync: boolean;
  syncLatest: string;
  clientTimestamp: number;
  repoTimestamp: number;
  clientHash: string;
  repoHash: string;
  requiresUpgrade = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public swiFileService: SWIFileService,
    public imageStore: ImageStoreService,
    private repoDocs: RepoDocsService,
    private syncRepoService: SyncRepoService,
    private upgradeService: SwiUpgradeService,
    private environment: EnvironmentService,
    private authService: AuthService
  ) {
    this.swi = this.route.snapshot.data["swi"];
    this.requiresUpgrade = this.upgradeService.upgradeRequired(this.swi);
    this.updateRepoData();
    this.route.params.subscribe((params) => {
      // Detected a change to the params so reload the swiData
      if (params.id != this.swi.id) {
        this.swi = this.route.snapshot.data["swi"];
        this.requiresUpgrade = this.upgradeService.upgradeRequired(this.swi);
        this.updateRepoData();
      }
    });
  }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  updateDocumentSyncStatus() {
    this.clientHash = this.swi.clientHash;
    this.repoHash = this.activeRevision.document.clientHash;
    this.clientTimestamp = new Date(this.swi.updatedOn).getTime();
    this.repoTimestamp = new Date(this.activeRevision.document.timestamp).getTime();
    this.isOutOfSync = (this.clientHash != this.repoHash);
    if (this.isOutOfSync) {
      // Check to see if the repo or client is ahead
      this.syncLatest = (this.clientTimestamp > this.repoTimestamp) ? "Client" : "Repository";
      console.log(`Out of sync and ${this.syncLatest} is ahead`);
    }
  }

  async updateRepoData() {
    this.loadingRepo = true;
    // Reset Repo flags
    this.swiMaster = null;
    this.loadingRepoError = null;

    if (!this.swi.swiMaster) {
      console.log("No SWI Master linked");
      this.loadingRepo = false;
      this.loadingRepoError = "No SWI Master linked";
      return;
    }
    try {
      // Get the data SWIMaster from the repository (retry up to 3 times)
      this.swiMaster = await this.repoDocs.getMaster(this.swi.swiMaster.id).toPromise();
      console.log("Fetched new SWI Master", this.swiMaster);
      console.log("SWI", this.swi);
      this.activeRevision = this.swiMaster.swiRevisions.filter(rev => rev.isLatest == true)[0];
      this.updateDocumentSyncStatus();
    } catch (error) {
      this.loadingRepoError = "Could not connect to the repository";
      console.log("Could not connect to repository");
    }
    this.loadingRepo = false;
  }

  navBack() {
    this.router.navigate(["browser"]);
  }

  editSWI() {
    // First set the revison we are editing.
    if (this.swiMaster) {
      this.swi.swiRevisionId = this.swiMaster.swiRevisions.filter(r => r.released == false)[0].id;
      console.log(this.swi.swiRevisionId);
    }
    this.router.navigate(["builder", this.swi.id]);
  }

  viewSWI() {
    this.router.navigate(["viewer", this.swi.id]);
  }

  exportingStatus(exporting: boolean) {
    this.loadingMessage = exporting ? "Exporting SWI" : "Loading";
    this.pageLoading = exporting;
  }

  duplicatingStatus(duplicating: boolean) {
    this.loadingMessage = duplicating ? "Duplicating SWI" : "Loading";
    this.pageLoading = duplicating;
  }

  upgradeComplete() {
    this.requiresUpgrade = this.upgradeService.upgradeRequired(this.swi);
  }

  recalculateClientHash() {
    console.log(this.swiFileService.getFileHash(this.swi));
  }

  async syncRepo() {
    this.isSyncing = true;
    const activeRevId = (this.activeRevision) ? this.activeRevision.id : null;
    try {
      this.swi = await this.syncRepoService.syncSWI(this.swi, activeRevId);
    } catch (error) {
      console.log("Error while syncing", error);
      this.loadingRepoError = error;
    }
    console.log("SWI after sync", this.swi);
    this.isSyncing = false;
    this.updateRepoData();
  }
}
