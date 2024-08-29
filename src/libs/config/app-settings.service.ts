import { Injectable } from "@nestjs/common";
import * as Fs from 'fs';
import * as Path from 'path';

@Injectable()
export class AppSettingsService {
  apiBugReportsBaseUrl: string;
  bmsNotes: {hostAndPort: string, packageName: string};
  azureKeyVaultUrl: string;
  azureKeyVaultSecretNames: string[];
  azureKeyVaultSecretValues: object;
  azureKeyVaultConfig: {
    tenantId: string;
    keyVault: string;
    appId: string;
    appSecret: string;
  };

  constructor() {
    const appsettingsObj: any = JSON.parse(Fs.readFileSync(Path.join(__dirname, 'settings/appsettings.json'), 'utf8'));
    for (let prop in appsettingsObj) this[prop] = appsettingsObj[prop];
  }
}