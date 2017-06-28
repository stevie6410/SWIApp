import { Injectable } from '@angular/core';
import { EnvironmentService } from "app/app/services/environment.service";
import { SWIHeader, SWIStageGroup, SWIFileService, GUID } from "app/core";
import * as semver from 'semver';

@Injectable()
export class SwiUpgradeService {

  upgradePaths: UpgradePath[] = [
    { affectedVersionsTo: "0.8.9", versionTo: "0.9.0", upgradeTask: "MigrateStagesToGroups", upgradeFunction: this.migrateStagesToGroups },
    { affectedVersionsTo: "0.8.9", versionTo: "0.9.1", upgradeTask: "FixInvalidAppVersion", upgradeFunction: this.fixInvalidAppVersion },
    { affectedVersionsTo: "0.9.0", versionTo: "0.9.1", upgradeTask: "AddMissingUpgradeTasksArray", upgradeFunction: this.addMissingUpgradeTasksArray },
    { affectedVersionsTo: "0.9.0", versionTo: "0.9.1", upgradeTask: "AddIdsToStages", upgradeFunction: this.addIdsToStages },
  ];

  constructor(
    private environment: EnvironmentService,
    private swiRepo: SWIFileService
  ) { }

  public upgradeRequired(swi: SWIHeader): boolean {
    let tasks = this.getUpgradePaths(swi);
    return (tasks.length > 0);
  }

  public async upgrade(swi: SWIHeader): Promise<SWIHeader> {
    this.getUpgradePaths(swi).forEach(task => {
      swi = task.upgradeFunction(swi);
      this.taskComplete(swi, task);
    });
    return await this.swiRepo.update(swi);
  }

  private taskComplete(swi: SWIHeader, upgrade: UpgradePath): SWIHeader {
    //If the upgrade version is greater than the current version then bump version    
    if (semver.gt(upgrade.versionTo, swi.appVersion)) swi.appVersion = upgrade.versionTo;
    //Add the task to the swi upgrade history
    swi.upgradeTasks.push(upgrade.upgradeTask);
    return swi;
  }

  private getUpgradePaths(swi: SWIHeader): UpgradePath[] {
    if (!swi.appVersion) swi.appVersion = "0.0.1";
    if (!swi.upgradeTasks) swi.upgradeTasks = [];
    return this.upgradePaths
      .filter(u => semver.lte(swi.appVersion, u.affectedVersionsTo))      //Get tasks which apply to our version
      .filter(u => !swi.upgradeTasks.includes(u.upgradeTask))             //Remove any tasks already applied
      .sort((a, b) => (semver.lte(a.versionTo, b.versionTo)) ? -1 : 1);   //Sort in order of version
  }

  // #############################################################
  // #############          Upgrade Functions       ##############
  // #############################################################

  private migrateStagesToGroups(swi: SWIHeader): SWIHeader {
    console.log("Migrating Stages to Group");
    let newGroup = new SWIStageGroup("Default Group");
    newGroup.stages = JSON.parse(JSON.stringify(swi.swiStages));
    newGroup.tools = JSON.parse(JSON.stringify(swi.swiTools));
    if (!swi.stageGroups) swi.stageGroups = [];
    swi.stageGroups.push(newGroup);
    swi.swiStages = null;
    return swi;
  }

  private addIdsToStages(swi: SWIHeader): SWIHeader {
    console.log("Upgrade Task: Addidng Ids to Stages");
    swi.stageGroups.forEach(group => {
      group.stages.forEach(stage => {
        if (!stage.id) stage.id = new GUID().value;
      });
    });
    return swi;
  }

  private addMissingUpgradeTasksArray(swi: SWIHeader): SWIHeader {
    console.log("Upgrade Task: Add Missing Upgrade Tasks Array");
    if (!swi.upgradeTasks) swi.upgradeTasks = [];
    return swi;
  }

  private fixInvalidAppVersion(swi: SWIHeader): SWIHeader {
    console.log("Upgrade Task: Add Missing App Version");
    if (!semver.valid(swi.appVersion)) swi.appVersion = "0.0.1";
    return swi;
  }
}

export class UpgradePath {
  affectedVersionsTo: string;
  versionTo: string;
  upgradeTask: string;
  upgradeFunction: (swi: SWIHeader) => SWIHeader;
}

