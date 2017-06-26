import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/Rx";

@Injectable()
export class EnvironmentService {

    private env: any;

    constructor(
        private http: Http
    ) { }

    private getEnvFile(): Observable<any> {
        console.log("Fetching the environment file from disk");
        return this.http.request('./environment.json').map(res => res.json());
    }

    getEnvironmentProp(propName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (this.env != undefined) {
                resolve(this.env[propName]);
            } else {
                this.getEnvFile().subscribe((env => {
                    this.env = env;
                    resolve(this.env[propName]);
                }));
            }
        });
    }

    getVersionTag(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (this.env != undefined) {
                resolve(this.compileVersionTag(this.env));
            } else {
                this.getEnvFile().subscribe((env => {
                    this.env = env;
                    resolve(this.compileVersionTag(this.env));
                }));
            }
        });
    }

    async getAppVersion(): Promise<string> {
        if (!this.env) this.env = await this.getEnvFile().toPromise();
        return this.env.version;
    }

    async getRepoURL(): Promise<string> {
        if (!this.env) this.env = await this.getEnvFile().toPromise();
        if (!this.env.repositoryURL) return null;
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