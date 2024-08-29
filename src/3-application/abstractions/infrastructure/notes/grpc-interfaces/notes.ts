import { Observable } from "rxjs";
import { Empty, RequestId } from "./generics";

interface AddNote { Title: string; }
interface NoteState { Id: string; State: number; }
interface ModifiedNote { Id: string; Title: string; State: number; }
interface Note { Id: string; Title: string; State: number; NoteListId: string; Creator: string; CreationDate: string; Updater: string; LastUpdateDate: string; }
interface SimplifiedNotes { SimplifiedNotes: SimplifiedNote[] };
interface SimplifiedNote { Id: string; Title: string; State: number; NoteListId: string; }
interface NotesGrpcInterfaces {
  Save(message: AddNote): Observable<Note>;
  GetAll(message: Empty): Observable<SimplifiedNotes>;
  GetOne(message: RequestId): Observable<Note>;
  Delete(message: RequestId): Observable<Empty>;
  DeleteChecked(message: Empty): Observable<Empty>;
  ChangeState(message: NoteState): Observable<Note>;
  Update(message: ModifiedNote): Observable<Note>;
}
export {
  AddNote,
  NoteState,
  ModifiedNote,
  Note,
  SimplifiedNotes,
  SimplifiedNote,
  NotesGrpcInterfaces,
}