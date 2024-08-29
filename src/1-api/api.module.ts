import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { CanvasSettingsController } from './controllers/canvas-settings';
import { NoteListsController } from './controllers/note-lists';
import { NotesController } from './controllers/notes';
import { BugReportsController } from './controllers/bug-reports';
import { UsersController } from './controllers/users';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/helpers/custom-exception.filter';
import { ApplicationModule } from '@application/application.module';
import { TracerModule } from '@libs/tracer/tracer.module';

@Module({
  imports: [
    TracerModule,
    InfrastructureModule,
    ApplicationModule.forRoot(
      InfrastructureModule.imports,
      InfrastructureModule.providers,
    ),
  ],
  controllers: [
    NotesController,
    NoteListsController,
    CanvasSettingsController,
    BugReportsController,
    UsersController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    }
  ]
})
export class ApiModule {}