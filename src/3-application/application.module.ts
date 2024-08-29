import { DynamicModule, ForwardReference, Module, Provider, Type } from '@nestjs/common';
import { NotesUseCases } from '@application/abstractions/use-cases/notes';
import { NotesService } from '@application/services/notes';
import { NoteListsService } from '@application/services/note-lists';
import { NoteListsUseCases } from '@application/abstractions/use-cases/note-lists';
import { CanvasSettingsService } from '@application/services/canvas-settings';
import { CanvasSettingsUseCases } from '@application/abstractions/use-cases/canvas-settings';
import { BugReportsUseCases } from '@application/abstractions/use-cases/bug-reports';
import { BugReportsService } from '@application/services/bug-reports';
import { UsersUseCases } from '@application/abstractions/use-cases/users';
import { UsersService } from '@application/services/users';

@Module({
  imports: [
  ],
  providers: [
    // Services
    NotesService,
    NoteListsService,
    CanvasSettingsService,
    BugReportsService,
    UsersService,
    // UseCases
    {provide: NotesUseCases, useExisting: NotesService},
    {provide: NoteListsUseCases, useExisting: NoteListsService},
    {provide: CanvasSettingsUseCases, useExisting: CanvasSettingsService},
    {provide: BugReportsUseCases, useExisting: BugReportsService},
    {provide: UsersUseCases, useExisting: UsersService},
  ],
  exports: [
    NotesUseCases,
    NoteListsUseCases,
    CanvasSettingsUseCases,
    BugReportsUseCases,
    UsersUseCases,
  ],
})
export class ApplicationModule {
  static forRoot(
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = [],
    providers: Provider[] = [],
  ): DynamicModule {
    return {
      module: ApplicationModule,
      imports,
      providers,
    };
  }
}