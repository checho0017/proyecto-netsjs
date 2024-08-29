import { DynamicModule, ForwardReference, Module, Provider, Type } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorInterceptor } from './common/helpers/http-error.interceptor';
import { AppSettingsModule } from 'src/libs/config/app-settings.module';
import { scBmsBugReportsProviders } from './services/sc-bms-bug-reports/sc-bms-bug-reports.providers';
import { scBmsNotesProviders } from './services/sc-bms-notes/sc-bms-notes.providers';
import { msApiGraphProviders } from './services/ms-api-graph/ms-api-graph.providers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Path from 'path';

const settings = AppSettingsModule.getStaticSettings();


const infrastructureModules: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
  HttpModule,
  AppSettingsModule,
  ClientsModule.register(
    [
      {
        name: 'NOTES_GRPC_CLIENT_CONFIG',
        transport: Transport.GRPC,
        options: {
          url: settings.bmsNotes.hostAndPort,
          package: settings.bmsNotes.packageName,
          protoPath: Path.join(__dirname, 'services/sc-bms-notes/protos/notes.proto'),
        },
      },
      {
        name: 'NOTE_LISTS_GRPC_CLIENT_CONFIG',
        transport: Transport.GRPC,
        options: {
          url: settings.bmsNotes.hostAndPort,
          package: settings.bmsNotes.packageName,
          protoPath: Path.join(__dirname, 'services/sc-bms-notes/protos/note-lists.proto'),
        },
      },
      {
        name: 'SETTINGS_GRPC_CLIENT_CONFIG',
        transport: Transport.GRPC,
        options: {
          url: settings.bmsNotes.hostAndPort,
          package: settings.bmsNotes.packageName,
          protoPath: Path.join(__dirname, 'services/sc-bms-notes/protos/settings.proto'),
        },
      },
    ]
  ),
];

const infrastructureProviders: Provider[] = [
  ...scBmsNotesProviders,
  ...scBmsBugReportsProviders,
  ...msApiGraphProviders,
  {
    provide: APP_INTERCEPTOR,
    useClass: HttpErrorInterceptor,
  },
];

@Module({})
export class InfrastructureModule { 
  static readonly imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = infrastructureModules;
  static readonly providers: Provider[] = infrastructureProviders;
}