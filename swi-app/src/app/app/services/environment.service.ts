import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/Rx";
import { EnvironmentConfiguration } from "app/core";
import { Subject } from "rxjs/Subject";
import * as semver from 'semver';

@Injectable()
export class EnvironmentService {

    public env: EnvironmentConfiguration;

    constructor(
        private http: Http
    ) { }

    public load(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.request('./environment.json').map(res => res.json()).catch((error: any) => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((env) => {
                console.log("Loaded the environment", env);
                this.env = env;
                resolve(true);
            });
        });
    }

    isCurrentVersion(version: string): boolean {
        return semver.gte(version, this.env.version);
    }

    getEnvironmentProp(propName: string): string {
        return this.env[propName];
    }

    getVersionTag(): string {
        return this.compileVersionTag(this.env);
    }

    getAppVersion(): string {
        return this.env.version;
    }

    getRepoURL(): string {
        return this.env.repositoryURL;
    }

    private compileVersionTag(env: any): string {
        if (env.environment == "Production") {
            return "v" + env.version;
        } else {
            return env.environment + " v" + env.version;
        }
    }
}

