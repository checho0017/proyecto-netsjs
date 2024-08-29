import { NoteListsGrpcInterfaces } from '@application/abstractions/infrastructure/notes/grpc-interfaces/note-lists';
import { NotesGrpcInterfaces } from '@application/abstractions/infrastructure/notes/grpc-interfaces/notes';
import { SettingsGrpcInterfaces } from '@application/abstractions/infrastructure/notes/grpc-interfaces/settings';
import { Provider } from '@nestjs/common/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { ScBmsNotesService } from './sc-bms-notes.service';
import { NotesAndListsAdapter } from '@application/abstractions/infrastructure/notes/notes-and-lists.adapter';

export const scBmsNotesProviders: Provider[] = [
  ScBmsNotesService,
  {provide: NotesAndListsAdapter, useExisting: ScBmsNotesService},
  {
    provide: 'NOTES_SERVICE',
    useFactory: (client: ClientGrpc) => {
      return client.getService<NotesGrpcInterfaces>('NotesService');
    },
    inject: ['NOTES_GRPC_CLIENT_CONFIG'],
  },
  {
    provide: 'NOTE_LISTS_SERVICE',
    useFactory: (client: ClientGrpc) => {
      return client.getService<NoteListsGrpcInterfaces>('NoteListsService');
    },
    inject: ['NOTE_LISTS_GRPC_CLIENT_CONFIG'],
  },
  {
    provide: 'SETTINGS_SERVICE',
    useFactory: (client: ClientGrpc) => {
      return client.getService<SettingsGrpcInterfaces>('SettingsService');
    },
    inject: ['SETTINGS_GRPC_CLIENT_CONFIG'],
  },
];