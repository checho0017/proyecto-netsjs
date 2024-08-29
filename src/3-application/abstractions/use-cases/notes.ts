import { Observable } from "rxjs";
import { NoteStatusChangeInput } from "@application/dtos/notes/note-status-change.input";
import { NoteCreationInput } from "@application/dtos/notes/note-creation.input";
import { NoteOutput } from "@application/dtos/notes/note.output";
import { SimplifiedNoteOutput } from "@application/dtos/notes/simplified-note.output";
import { NoteUpdatingInput } from "@application/dtos/notes/note-updating.input";

export abstract class NotesUseCases {
  // Exposition UseCases
  abstract createNote(data: NoteCreationInput): Observable<NoteOutput>;
  abstract getAllNotes(): Observable<SimplifiedNoteOutput[]>;
  abstract getOneNote(id: string): Observable<NoteOutput>;
  abstract deleteNote(id: string): void;
  abstract deleteCheckedNotes(): void;
  abstract changeStateNote(id: string, data: NoteStatusChangeInput): Observable<NoteOutput>;
  abstract updateNote(id: string, data: NoteUpdatingInput): Observable<NoteOutput>;
  // Filtering UseCases
  abstract getIsolateNotes(): Observable<SimplifiedNoteOutput[]>;
}