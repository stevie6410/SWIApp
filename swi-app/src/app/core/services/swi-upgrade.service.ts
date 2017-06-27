import { Injectable } from '@angular/core';
import { EnvironmentService } from "app/app/services/environment.service";
import { SWIHeader, SWIStageGroup, SWIFileService } from "app/core";
import * as semver from 'semver';

@Injectable()
export class SwiUpgradeService {

  upgradePaths: UpgradePath[] = [
    { affectedVersions: "0.8.999", versionTo: "0.9.0", upgradeTask: "MigrateStagesToGroups" }
  ];

  constructor(
    private environment: EnvironmentService,
    private swiRepo: SWIFileService
  ) { }

  public upgradeRequired(swi: SWIHeader): boolean {
    let tasks = this.getUpgradePaths(swi);
    return (tasks.length > 0);
  }

  private getUpgradePaths(swi: SWIHeader): UpgradePath[] {
    let currentVersion: SemverVersion = new SemverVersion(swi.appVersion);
    let upgradeTasks = this.upgradePaths.filter(u => (semver.lte(swi.appVersion, u.affectedVersions)));
    return upgradeTasks;
  }

  public async upgrade(swi: SWIHeader): Promise<SWIHeader> {
    let tasks = this.getUpgradePaths(swi);
    console.log("Upgrade Tasks to be performed: ", tasks);
    tasks.forEach(task => {
      switch (task.upgradeTask) {
        case "MigrateStagesToGroups":
          swi = this.migrateStagesToGroups(swi);
          swi.appVersion = task.versionTo;
          break;
        default:
          break;
      }
    });
    await this.swiRepo.update(swi);
    return swi;
  }

  private migrateStagesToGroups(swi: SWIHeader): SWIHeader {
    console.log("Migrating Stages to Group");
    let newGroup = new SWIStageGroup("Default Group");
    newGroup.stages = JSON.parse(JSON.stringify(swi.swiStages));
    newGroup.tools = JSON.parse(JSON.stringify(swi.swiTools));
    if (!swi.stageGroups) swi.stageGroups = [];
    swi.stageGroups.push(newGroup);
    return swi;
  }
}

export class UpgradePath {
  affectedVersions: string;
  versionTo: string;
  upgradeTask: string;
}

export class SemverVersion {
  version: string;
  major: number;
  minor: number;
  patch: number;

  constructor(v: string) {
    this.version = semver.clean(v);
    this.major = semver.major(this.version);
    this.minor = semver.minor(this.version);
    this.patch = semver.patch(this.version);
  }
}
