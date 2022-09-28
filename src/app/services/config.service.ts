import {Injectable, InjectionToken} from '@angular/core';
import {Config} from "../models/config";
import {environment} from "../../environments/environment";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function ConfigFactory(
  configService: ConfigService,
  file: string,
  property: string
) {
  return configService.loadJSON(file)[property];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config: Config = {};

  constructor() {

    if (environment.production) {
      this.config = this.loadJSON(`assets/config.json?v=${new Date().getTime()}`);
    } else {
      this.config = this.loadJSON(`assets/configDebug.json?v=${new Date().getTime()}`);
    }

  }

  loadJSON(filePath: any) {
    const json = this.loadTextFileAjaxSync(filePath, 'application/json');
    return JSON.parse(<string>json);
  }

  loadTextFileAjaxSync(filePath: any, mimeType: any) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      return xmlhttp.responseText;
    } else {
      return null;
    }
  }
}
