import { Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Empty, RequestId } from "@application/abstractions/infrastructure/notes/grpc-interfaces/generics";
import { NotesAndListsAdapter } from "@application/abstractions/infrastructure/notes/notes-and-lists.adapter";
import { AddNote, ModifiedNote, Note, NoteState, NotesGrpcInterfaces, SimplifiedNotes } from "@application/abstractions/infrastructure/notes/grpc-interfaces/notes";
import { AddNoteList, ModifiedNoteList, NoteList, NoteListsGrpcInterfaces, RequestIds, SimplifiedNoteLists } from "@application/abstractions/infrastructure/notes/grpc-interfaces/note-lists";
import { SettingsGrpcInterfaces } from "@application/abstractions/infrastructure/notes/grpc-interfaces/settings";

@Injectable()
export class ScBmsNotesService implements NotesAndListsAdapter {
  constructor(
    @Inject('NOTES_SERVICE') private notes: NotesGrpcInterfaces,
    @Inject('NOTE_LISTS_SERVICE') private lists: NoteListsGrpcInterfaces,
    @Inject('SETTINGS_SERVICE') private settings: SettingsGrpcInterfaces,
  ) {}
  // NotesService
  createNote (message: AddNote): Observable<Note>
  {
    return this.notes.Save(message);
  }
  getAllNotes (message: Empty): Observable<SimplifiedNotes>
  {
    return this.notes.GetAll(message);
  }
  getOneNote (message: RequestId): Observable<Note>
  {
    return this.notes.GetOne(message);
  }
  deleteNote (message: RequestId): Observable<Empty>
  {
    return this.notes.Delete(message);
  }
  deleteCheckedNotes (message: Empty): Observable<Empty>
  {
    return this.notes.DeleteChecked(message);
  }
  changeStateFromNote (message: NoteState): Observable<Note>
  {
    return this.notes.ChangeState(message);
  }
  updateNote (message: ModifiedNote): Observable<Note>
  {
    return this.notes.Update(message);
  }
  // NoteListsService
  createNoteList(message: AddNoteList): Observable<NoteList> {
    return this.lists.Save(message);
  }
  getAllNoteLists(message: Empty): Observable<SimplifiedNoteLists> {
    return this.lists.GetAll(message);
  }
  getOneNoteList(message: RequestId): Observable<NoteList> {
    return this.lists.GetOne(message);
  }
  deleteNoteList(message: RequestId): Observable<Empty> {
    return this.lists.Delete(message);
  }
  deleteCheckedNoteLists(message: Empty): Observable<Empty> {
    return this.lists.DeleteChecked(message);
  }
  updateNoteList(message: ModifiedNoteList): Observable<NoteList> {
    return this.lists.Update(message);
  }
  addNoteToList(message: RequestIds): Observable<Empty> {
    return this.lists.AddNote(message);
  }
  removeNoteFromList(message: RequestIds): Observable<Empty> {
    return this.lists.RemoveNote(message);
  }
  checkNoteList(message: Empty): Observable<Empty> {
    return this.lists.Check(message);
  }
  // SettingsService
  deleteCompletedItems(message: Empty): Observable<Empty> {
    return this.settings.DeleteCompletedItems(message);
  }
  deleteAllItems(message: Empty): Observable<Empty> {
    return this.settings.DeleteAllItems(message);
  }
  initializeCanvas(message: Empty): Observable<Empty> {
    return this.settings.PostCanvas(message);
  }
}