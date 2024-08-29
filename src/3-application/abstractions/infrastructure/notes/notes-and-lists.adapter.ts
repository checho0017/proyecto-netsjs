import { Observable } from "rxjs";
import { Empty, RequestId } from "./grpc-interfaces/generics";
import { AddNoteList, ModifiedNoteList, NoteList, RequestIds, SimplifiedNoteLists } from "./grpc-interfaces/note-lists";
import { AddNote, ModifiedNote, NoteState, Note, SimplifiedNotes } from "./grpc-interfaces/notes";

export abstract class NotesAndListsAdapter {
  abstract createNote            (message: AddNote): Observable<Note>;
  abstract getAllNotes           (message: Empty): Observable<SimplifiedNotes>;
  abstract getOneNote            (message: RequestId): Observable<Note>;
  abstract deleteNote            (message: RequestId): Observable<Empty>;
  abstract deleteCheckedNotes    (message: Empty): Observable<Empty>;
  abstract changeStateFromNote   (message: NoteState): Observable<Note>;
  abstract updateNote            (message: ModifiedNote): Observable<Note>;
  abstract createNoteList        (message: AddNoteList): Observable<NoteList>;
  abstract getAllNoteLists       (message: Empty): Observable<SimplifiedNoteLists>;
  abstract getOneNoteList        (message: RequestId): Observable<NoteList>;
  abstract deleteNoteList        (message: RequestId): Observable<Empty>;
  abstract deleteCheckedNoteLists(message: Empty): Observable<Empty>;
  abstract updateNoteList        (message: ModifiedNoteList): Observable<NoteList>;
  abstract addNoteToList         (message: RequestIds): Observable<Empty>;
  abstract removeNoteFromList    (message: RequestIds): Observable<Empty>;
  abstract checkNoteList         (message: Empty): Observable<Empty>;
  abstract deleteCompletedItems  (message: Empty): Observable<Empty>;
  abstract deleteAllItems        (message: Empty): Observable<Empty>;
  abstract initializeCanvas      (message: Empty): Observable<Empty>;
}