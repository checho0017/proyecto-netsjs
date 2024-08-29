import { ClientSecretCredential, DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { AppSettingsModule } from './app-settings.module';
import { AppSettingsService } from './app-settings.service';

export const KeyVaultProvider = {
  getSecrets: async (): Promise<void> => {
    const settings: AppSettingsService = AppSettingsModule.getStaticSettings();
    const appSettingsProperty: string = 'azureKeyVaultSecretNames';
    let secretClient: SecretClient;

    if (process.env['ENVIRONMENT'] == 'LOCAL') {
        secretClient = new SecretClient(
          settings.azureKeyVaultConfig.keyVault, 
          new ClientSecretCredential(
            settings.azureKeyVaultConfig.tenantId,
            settings.azureKeyVaultConfig.appId, 
            settings.azureKeyVaultConfig.appSecret,
      ))
    } else {
      secretClient = new SecretClient(settings.azureKeyVaultUrl, new DefaultAzureCredential());
    }
      
    if (settings[appSettingsProperty]) {
      for (let secretNameKeyWord of settings[appSettingsProperty]) {
        process.env[secretNameKeyWord] = (await secretClient.getSecret(secretNameKeyWord)).value;
      }
    }
  }
}