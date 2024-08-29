import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";
import { NotesAndListsAdapter } from "../abstractions/infrastructure/notes/notes-and-lists.adapter";
import { NoteListsUseCases } from "../abstractions/use-cases/note-lists";
import { AddNoteToListInput } from "../dtos/note-lists/add-note-to-list.input";
import { NoteListCreationInput } from "../dtos/note-lists/note-list-creation.input";
import { NoteListOutput } from "../dtos/note-lists/note-list.output";
import { SimplifiedNoteListOutput } from "../dtos/note-lists/simplified-note-list.output";
import { NoteList, SimplifiedNoteLists, SimplifiedNoteList } from "../abstractions/infrastructure/notes/grpc-interfaces/note-lists";
import { NoteListUpdatingInput } from "../dtos/note-lists/note-list-updating.input";
import { ListWithNotesOutput } from "../dtos/note-lists/list-with-notes.output";
import { SimplifiedNoteOutput } from "../dtos/notes/simplified-note.output";
import { SimplifiedNote, SimplifiedNotes } from "../abstractions/infrastructure/notes/grpc-interfaces/notes";

@Injectable()
export class NoteListsService implements NoteListsUseCases {
  constructor(private notesAdapter: NotesAndListsAdapter) {}

  // Puede utilizar la estrategia de mapeo que desee
  createNoteList(data: NoteListCreationInput): Observable<NoteListOutput> {
    return this.notesAdapter.createNoteList({Name: data.name}).pipe(map((list: NoteList) => {
      return {
        id: list.Id,
        name: list.Name,
        state: list.State,
        creator: list.Creator,
        creationDate: list.CreationDate,
        updater: list.Updater,
        lastUpdateDate: list.LastUpdateDate,
      };
    }));
  }
  getAllNoteLists(): Observable<SimplifiedNoteListOutput[]> {
    return this.notesAdapter.getAllNoteLists({}).pipe(map((data: SimplifiedNoteLists) => {
      const mappedList: SimplifiedNoteListOutput[] = [];
      if (data.SimplifiedNoteLists) data.SimplifiedNoteLists.forEach((item: SimplifiedNoteList) => mappedList.push({
        id: item.Id,
        name: item.Name,
        state: item.State,
      }));
      return mappedList;
    }));
  }
  getOneNoteList(id: string): Observable<NoteListOutput> {
    return this.notesAdapter.getOneNoteList({Id: id}).pipe(map((list: NoteList) => {
      return {
        id: list.Id,
        name: list.Name,
        state: list.State,
        creator: list.Creator,
        creationDate: list.CreationDate,
        updater: list.Updater,
        lastUpdateDate: list.LastUpdateDate,
      };
    }));
  }
  deleteNoteList(id: string): void {
    this.notesAdapter.deleteNoteList({Id: id}).subscribe();
  }
  deleteCheckedNoteLists(): void {
    this.notesAdapter.deleteCheckedNoteLists({}).subscribe(); //TO_FIX FORWHAT????
  }
  updateNoteList(id: string, data: NoteListUpdatingInput): Observable<NoteListOutput> {
    return this.notesAdapter.updateNoteList({Id: id, Name: data.name}).pipe(map((list: NoteList) => {
      return {
        id: list.Id,
        name: list.Name,
        state: list.State,
        creator: list.Creator,
        creationDate: list.CreationDate,
        updater: list.Updater,
        lastUpdateDate: list.LastUpdateDate,
      };
    }));
  }
  addNoteToList(id: string, data: AddNoteToListInput): void {
    this.notesAdapter.addNoteToList({NoteListId: id, IdNote: data.idNote}).subscribe();
  }
  removeNoteFromList(idList: string, idNote: any): void {
    this.notesAdapter.removeNoteFromList({NoteListId: idList, IdNote: idNote}).subscribe();
  }
  checkNoteList(id: string): void {
    this.notesAdapter.checkNoteList({Id: id}).subscribe(); // TO_FIX FORWHAT????
  }
  async getListsWithNotes(): Promise<ListWithNotesOutput[]> {
    const listsWithNotes: ListWithNotesOutput[] = [];
    const lists: SimplifiedNoteListOutput[] = await firstValueFrom(this.getAllNoteLists());
    const notes: SimplifiedNoteOutput[] = await firstValueFrom(this.getAllNotes());

    lists.forEach((list: SimplifiedNoteListOutput) => listsWithNotes.push({
      id: list.id,
      name: list.name,
      state: list.state,
      notes: notes.filter((note: SimplifiedNoteOutput) => note.listId == list.id),
    }));
    return listsWithNotes;
  }
  getAllNotes(): Observable<SimplifiedNoteOutput[]> {
    return this.notesAdapter.getAllNotes({}).pipe(map((data: SimplifiedNotes) => {
      const mappedList: SimplifiedNoteOutput[] = [];
      if (data.SimplifiedNotes) data.SimplifiedNotes.forEach((item: SimplifiedNote) => mappedList.push({
        id: item.Id,
        title: item.Title,
        state: item.State,
        listId: item.NoteListId,
      }));
      return mappedList;
    }));
  }
}