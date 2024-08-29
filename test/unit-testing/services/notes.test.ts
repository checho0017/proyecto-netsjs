import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { NotesAndListsAdapter } from '@application/abstractions/infrastructure/notes/notes-and-lists.adapter';
import { NotesService } from '@application/services/notes';
import { NoteOutput } from '@application/dtos/notes/note.output';
import { Note } from '@application/abstractions/infrastructure/notes/grpc-interfaces/notes';

describe('NotesService', () => {
  let service: NotesService;
  let adapter: NotesAndListsAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NotesAndListsAdapter,
          useValue: {
            createNote: jest.fn(),
            getAllNotes: jest.fn(),
            getOneNote: jest.fn(),
            deleteNote: jest.fn(),
            deleteCheckedNotes: jest.fn(),
            changeStateFromNote: jest.fn(),
            updateNote: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<NotesService>(NotesService);
    adapter = module.get<NotesAndListsAdapter>(NotesAndListsAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNote', () => {
    it('should create a note', async () => {
      const input = { title: 'Nota 1' };
      const note = {
        Id: 'c96f8bab-08e5-42f2-848c-379ae0793a5e', 
        Title: 'Nota 1',
        State: 0,
        NoteListId: 'lista1111',
        Creator: 'FPonce',
        CreationDate: '1680400087',
        Updater: 'FPonce',
        LastUpdateDate: '1680400087'
      };

      jest.spyOn(adapter, 'createNote').mockReturnValueOnce(of(note));
      const result = await service.createNote(input).toPromise();
      expect(adapter.createNote).toHaveBeenCalledWith({ Title: input.title });
      expect(result).toEqual({
        id: 'c96f8bab-08e5-42f2-848c-379ae0793a5e',
        title: 'Nota 1',
        state: 0,
        listId: 'lista1111',
        creator: 'FPonce',
        creationDate: '1680400087',
        updater: 'FPonce',
        lastUpdateDate: '1680400087',
      });
    });
  });

  describe('getAllNotes', () => {
    it('should return an array of SimplifiedNoteOutput', () => {
      const mockedData = {
        SimplifiedNotes: [{
          Id: '1',
          Title: 'Note 1',
          State: 1,
          NoteListId: '',
        },
        {
          Id: '2',
          Title: 'Note 2',
          State: 1,
          NoteListId: '',
        },
        ],
      };
      jest.spyOn(adapter, 'getAllNotes').mockReturnValue(of(mockedData));

      service.getAllNotes().subscribe((result) => {
        expect(result).toEqual([
          {
            id: '1',
            title: 'Note 1',
            state: 1,
            listId: '',
          },
          {
            id: '2',
            title: 'Note 2',
            state: 1,
            listId: '',
          },
        ]);
      });
    });
  });

  describe('getOneNote', () => {
    it('should return a NoteOutput object', () => {
      const note: Note = { 
        Id: '1', 
        Title: 'Test note', 
        State: 1, 
        NoteListId: '', 
        Creator: 'FPonce', 
        CreationDate:  '1680400087',
        Updater: 'FPonce', 
        LastUpdateDate:  '1680400087',
      }; 

      jest.spyOn(adapter, 'getOneNote').mockReturnValue(of(note));
      const result: Observable<NoteOutput> = service.getOneNote('1');

      result.subscribe((data: NoteOutput) => {
        expect(data).toEqual({
          id: '1',
          title: 'Test note',
          state: 1,
          listId: '',
          creator: 'FPonce',
          creationDate: note.CreationDate,
          updater: 'FPonce',
          lastUpdateDate: note.LastUpdateDate,
        });
      });
    });
  });

  describe('deleteNote', () => {
    it('should call notesAdapter.deleteNote', () => {
      jest.spyOn(adapter, 'deleteNote').mockReturnValue(of(null));
      service.deleteNote('1');
      expect(adapter.deleteNote).toHaveBeenCalledWith({ Id: '1' });
    });
  });

  describe('deleteCheckedNotes', () => {
    it('should call adapter.deleteCheckedNotes', () => {
      jest.spyOn(adapter, 'deleteCheckedNotes').mockReturnValue(of(null));
      service.deleteCheckedNotes();
      expect(adapter.deleteCheckedNotes).toHaveBeenCalledWith({});
    });
  });

  describe('changeStateNote', () => {
    it('should return a NoteOutput object', () => {
      const note: Note = { 
        Id: '1', 
        Title: 'Test note', 
        State: 1, 
        NoteListId: '', 
        Creator: 'FPonce', 
        CreationDate: '1680400087', 
        Updater: 'FPonce', 
        LastUpdateDate: '1680400087', 
      }; 
      jest.spyOn(adapter, 'changeStateFromNote').mockReturnValue(of(note)); 
      jest.spyOn(adapter, 'changeStateFromNote').mockReturnValue(of(note)); 
      const data = { state: 1 };
      const result: Observable<NoteOutput> = service.changeStateNote('1', data);

      result.subscribe((data: NoteOutput) => {
        expect(data).toEqual({
          id: '1',
          title: 'Test note',
          state: 1,
          listId: '',
          creator: 'FPonce',
          creationDate: note.CreationDate,
          updater: 'FPonce',
          lastUpdateDate: note.LastUpdateDate,
        });
      });
    });
  });
});