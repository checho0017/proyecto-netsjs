import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { NotesAndListsAdapter } from "../abstractions/infrastructure/notes/notes-and-lists.adapter";
import { NotesUseCases } from "../abstractions/use-cases/notes";
import { NoteStatusChangeInput } from "../dtos/notes/note-status-change.input";
import { NoteCreationInput } from "../dtos/notes/note-creation.input";
import { NoteOutput } from "../dtos/notes/note.output";
import { SimplifiedNoteOutput } from "../dtos/notes/simplified-note.output";
import { NoteUpdatingInput } from "../dtos/notes/note-updating.input";
import { Note, SimplifiedNote, SimplifiedNotes } from "@application/abstractions/infrastructure/notes/grpc-interfaces/notes";

@Injectable()
export class NotesService implements NotesUseCases {
  constructor(private notesAdapter: NotesAndListsAdapter) {}

  // Puede utilizar la estrategia de mapeo que desee, por ejemplo automapper
  createNote(data: NoteCreationInput): Observable<NoteOutput> {
    return this.notesAdapter.createNote({Title: data.title}).pipe(
      map((data: Note) => {
        return {
          id: data.Id,
          title: data.Title,
          state: data.State,
          listId: data.NoteListId,
          creator: data.Creator,
          creationDate: data.CreationDate,
          updater: data.Updater,
          lastUpdateDate: data.LastUpdateDate,
        };
      })
    );
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
  getOneNote(id: string): Observable<NoteOutput> {
    return this.notesAdapter.getOneNote({Id: id}).pipe(
      map((data: Note) => {
        return {
          id: data.Id,
          title: data.Title,
          state: data.State,
          listId: data.NoteListId,
          creator: data.Creator,
          creationDate: data.CreationDate,
          updater: data.Updater,
          lastUpdateDate: data.LastUpdateDate,
        };
      })
    );
  }
  deleteNote(id: string): void {
    this.notesAdapter.deleteNote({Id: id}).subscribe();
  }
  deleteCheckedNotes(): void {
    this.notesAdapter.deleteCheckedNotes({}).subscribe(); // FIX: FOR_WHAT?
  }
  changeStateNote(id: string, data: NoteStatusChangeInput): Observable<NoteOutput> {
    return this.notesAdapter.changeStateFromNote({Id: id, State: data.state}).pipe(
      map((data: Note) => {
        return {
          id: data.Id,
          title: data.Title,
          state: data.State,
          listId: data.NoteListId,
          creator: data.Creator,
          creationDate: data.CreationDate,
          updater: data.Updater,
          lastUpdateDate: data.LastUpdateDate,
        };
      })
    );
  }
  updateNote(id: string, data: NoteUpdatingInput): Observable<NoteOutput> {
    return this.notesAdapter.updateNote({Id: id, Title: data.title, State: data.state}).pipe(
      map((data: Note) => {
        return {
          id: data.Id,
          title: data.Title,
          state: data.State,
          listId: data.NoteListId,
          creator: data.Creator,
          creationDate: data.CreationDate,
          updater: data.Updater,
          lastUpdateDate: data.LastUpdateDate,
        };
      })
    );
  }
  getIsolateNotes(): Observable<SimplifiedNoteOutput[]> {
    return this.getAllNotes().pipe(map((notes: SimplifiedNoteOutput[]) => 
      notes.filter((note: SimplifiedNoteOutput) => note.listId == '')
    ));
  }
}