import { Observable } from "rxjs";
import { Empty, RequestId } from "./generics";

interface RequestIds { IdNote: string, NoteListId: string; }
interface AddNoteList { Name: string; }
interface ModifiedNoteList { Id: string, Name: string; }
interface NoteList { Id: string; Name: string; State: number; Creator: string; CreationDate: string; Updater: string; LastUpdateDate: string; }
interface SimplifiedNoteLists { SimplifiedNoteLists: SimplifiedNoteList[]; }
interface SimplifiedNoteList { Id: string; Name: string; State: number; }
interface NoteListsGrpcInterfaces {
  Save (message: AddNoteList): Observable<NoteList>;
  GetAll (message: Empty): Observable<SimplifiedNoteLists>;
  GetOne (message: RequestId): Observable<NoteList>;
  Delete (message: RequestId): Observable<Empty>;
  DeleteChecked (message: Empty): Observable<Empty>;
  Update (message: ModifiedNoteList): Observable<NoteList>;
  AddNote (message: RequestIds): Observable<Empty>;
  RemoveNote (message: RequestIds): Observable<Empty>;
  Check (message: Empty): Observable<Empty>;
}
export {
  RequestIds,
  AddNoteList,
  ModifiedNoteList,
  NoteList,
  SimplifiedNoteLists,
  SimplifiedNoteList,
  NoteListsGrpcInterfaces,
}