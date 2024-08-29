/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { TracerModule } from '@libs/tracer/tracer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TracerModule,
    ConfigModule.forRoot(),
  ],
  providers: [AppSettingsService],
  exports: [AppSettingsService]
})
export class AppSettingsModule {

  constructor(
    private settings: AppSettingsService,
  ) {
    this.addSecrets();
  }
  static getStaticSettings(): AppSettingsService {
    return new AppSettingsService();
  }
  private addSecrets(): void {
    const appSettingsPropertyForNames: string = 'azureKeyVaultSecretNames';
    const appSettingsPropertyForValues: string = 'azureKeyVaultSecretValues';
    if (this.settings[appSettingsPropertyForNames]) {
      this.settings[appSettingsPropertyForValues] = {};
      for(let keyWord in this.settings[appSettingsPropertyForNames]) {
        this.settings[appSettingsPropertyForValues][keyWord] = process.env[keyWord]
      }
    }
  }
}