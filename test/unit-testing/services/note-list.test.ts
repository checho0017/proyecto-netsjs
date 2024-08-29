/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { NotesAndListsAdapter } from '@application/abstractions/infrastructure/notes/notes-and-lists.adapter';
import { NoteListsService } from '@application/services/note-lists';

describe('NoteListsService', () => {
    let service: NoteListsService; 
    let adapter: NotesAndListsAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NoteListsService,
                {
                    provide: NotesAndListsAdapter,
                    useValue: {
                        createNoteList: jest.fn(),
                        getAllNoteLists: jest.fn(),
                        getOneNoteList: jest.fn(),
                        deleteNoteList: jest.fn(),
                        deleteCheckedNoteLists: jest.fn(),
                        updateNoteList: jest.fn(),
                        addNoteToList: jest.fn(),
                        removeNoteFromList: jest.fn(),
                        checkNoteList: jest.fn(),
                        getAllNotes: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get<NoteListsService>(NoteListsService);
        adapter = module.get<NotesAndListsAdapter>(NotesAndListsAdapter);
    });

    it('should be defined', () => { expect(service).toBeDefined(); });
    describe('createNoteList', () => {
        it('should create a note list', async () => {
            const data = { name: 'List A' };
            const noteList = {
                Id: 'lista1111',
                Name: 'List A',
                State: 0,
                Creator: 'FPonce',
                CreationDate: '1680400087',
                Updater: 'FPonce',
                LastUpdateDate: '1680400087'
            };

            jest.spyOn(adapter, 'createNoteList').mockReturnValueOnce(of(noteList));
            const result = await service.createNoteList(data).toPromise();
            expect(adapter.createNoteList).toHaveBeenCalledWith({ Name: data.name });
            expect(result).toEqual({
                id: noteList.Id,
                name: noteList.Name,
                state: noteList.State,
                creator: noteList.Creator,
                creationDate: noteList.CreationDate,
                updater: noteList.Updater,
                lastUpdateDate: noteList.LastUpdateDate,
            });
        });
    });

    describe('getAllNoteLists', () => {
        it('should get all note lists', async () => {
            const noteLists = {
                SimplifiedNoteLists: [
                    {
                        Id: '123',
                        Name: 'Test List 1',
                        State: 1,
                    },
                    {
                        Id: '456',
                        Name: 'Test List 2',
                        State: 0,
                    },
                ],
            };
            jest.spyOn(adapter, 'getAllNoteLists').mockReturnValueOnce(of(noteLists));
            const result = await service.getAllNoteLists().toPromise();
            expect(adapter.getAllNoteLists).toHaveBeenCalledWith({});
            expect(result).toEqual([
                {
                    id: '123',
                    name: 'Test List 1',
                    state: 1,
                },
                {
                    id: '456',
                    name: 'Test List 2',
                    state: 0,
                },
            ]);
        });
    });

    describe('getOneNoteList', () => {
        it('should get a single note list', async () => {
            const id = '123';
            const noteList = {
                Id: 'lista1111',
                Name: 'List A',
                State: 0,
                Creator: 'FPonce',
                CreationDate: '1680400087',
                Updater: 'FPonce',
                LastUpdateDate: '1680400087'
            };
            jest.spyOn(adapter, 'getOneNoteList').mockReturnValueOnce(of(noteList));
            const result = await service.getOneNoteList(id).toPromise();
            expect(adapter.getOneNoteList).toHaveBeenCalledWith({ Id: id });
            expect(result).toEqual({
                id: noteList.Id,
                name: noteList.Name,
                state: noteList.State,
                creator: noteList.Creator,
                creationDate: noteList.CreationDate,
                updater: noteList.Updater,
                lastUpdateDate: noteList.LastUpdateDate,
            });
        });
    });

    describe('deleteNoteList', () => {
        it('should delete a note list', () => {
            const id = 'lista1111';
            jest.spyOn(adapter, 'deleteNoteList').mockReturnValueOnce(of(undefined));
            service.deleteNoteList(id);
            expect(adapter.deleteNoteList).toHaveBeenCalledWith({ Id: id });
        });
    });

    describe('deleteCheckedNoteLists', () => {
        it('should delete checked note lists', () => {
            jest.spyOn(adapter, 'deleteCheckedNoteLists').mockReturnValueOnce(of(undefined));
            service.deleteCheckedNoteLists();
            expect(adapter.deleteCheckedNoteLists).toHaveBeenCalledWith({});
        });
    });

    describe('updateNoteList', () => {
        it('should update a note list', async () => {
            const id = 'lista1111';
            const data = { name: 'Test List' };
            const noteList = {
                Id: 'lista1111',
                Name: 'Test List',
                State: 1,
                Creator: 'FPonce',
                CreationDate: '1680400087',
                Updater: 'FPonce',
                LastUpdateDate: '1680400087',
            };
            jest.spyOn(adapter, 'updateNoteList').mockReturnValueOnce(of(noteList));
            const result = await service.updateNoteList(id, data).toPromise();
            expect(adapter.updateNoteList).toHaveBeenCalledWith({ Id: id, Name: data.name });
            expect(result).toEqual({
                id: noteList.Id,
                name: noteList.Name,
                state: noteList.State,
                creator: noteList.Creator,
                creationDate: noteList.CreationDate,
                updater: noteList.Updater,
                lastUpdateDate: noteList.LastUpdateDate,
            });
        });
    });

    describe('addNoteToList', () => {
        it('should add a note to a list', () => {
            const idList = 'lista1111'; 
            const data = { idNote: 'c96f8bab-08e5-42f2-848c-379ae0793a5e' }; 
            jest.spyOn(adapter, 'addNoteToList').mockReturnValueOnce(of(undefined));
            service.addNoteToList(idList, data);
            expect(adapter.addNoteToList).toHaveBeenCalledWith({ NoteListId: idList, IdNote: data.idNote });
        });
    });

    describe('removeNoteFromList', () => {
        it('should remove a note from a list', () => {
            const idList = 'lista1111'; 
            const idNote = 'c96f8bab-08e5-42f2-848c-379ae0793a5e'; 
            jest.spyOn(adapter, 'removeNoteFromList').mockReturnValueOnce(of(undefined));
            service.removeNoteFromList(idList, idNote);
            expect(adapter.removeNoteFromList).toHaveBeenCalledWith({ NoteListId: idList, IdNote: idNote });
        });
    });

    describe('checkNoteList', () => {
        it('should check a note list', () => {
            const id = 'lista1111'; 
            jest.spyOn(adapter, 'checkNoteList').mockReturnValueOnce(of(undefined));
            service.checkNoteList(id);
            expect(adapter.checkNoteList).toHaveBeenCalledWith({ Id: id });
        });
    });


    describe('getAllNotes', () => {
        it('should return an array of SimplifiedNoteOutput', async () => {
            const mockedSimplifiedNotes = { 
                SimplifiedNotes: [
                    { Id: '1',
                      Title: 'Note 1',
                      State: 1, 
                      NoteListId: '1', 
                    }, 
                    { 
                        Id: '2', 
                        Title: 'Note 2', 
                        State: 0, 
                        NoteListId: '1', },
                    ],
                 }; 
                 
            jest.spyOn(adapter, 'getAllNotes').mockReturnValue(of(mockedSimplifiedNotes));
            const result = await service.getAllNotes().toPromise();
            expect(result).toEqual([
                {
                    id: '1',
                    title: 'Note 1',
                    state: 1,
                    listId: '1',
                },
                {
                    id: '2',
                    title: 'Note 2',
                    state: 0,
                    listId: '1',
                },
            ]);
        });
    });

    describe('getListsWithNotes', () => { 
        it('should return a list of note lists with their notes', async () => { 
            const noteLists = {
                SimplifiedNoteLists: [
                    {
                        Id: '123',
                        Name: 'Test List 1',
                        State: 1,
                    },
                    {
                        Id: '456',
                        Name: 'Test List 2',
                        State: 0,
                    },
                ],
            };

            const mockedSimplifiedNotes = { 
                SimplifiedNotes: [
                    { Id: '1',
                    Title: 'Note 1',
                    State: 1, 
                    NoteListId: '1', 
                    }, 
                    { 
                        Id: '2', 
                        Title: 'Note 2', 
                        State: 0, 
                        NoteListId: '1', },
                    ],
                }; 
            jest.spyOn(adapter, 'getAllNoteLists').mockReturnValueOnce(of(noteLists));
            jest.spyOn(adapter, 'getAllNotes').mockReturnValue(of(mockedSimplifiedNotes));
            const result = await service.getListsWithNotes();
  
    expect(result).toEqual([
      {
        id: '123',
        name: 'Test List 1',
        state: 1,
        notes: [],
      },
      {
        id: '456',
        name: 'Test List 2',
        state: 0,
        notes: [],
      },
    ]);
  });
  });
});