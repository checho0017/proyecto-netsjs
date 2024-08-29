import { Observable } from "rxjs";
import { AddNoteToListInput } from "@application/dtos/note-lists/add-note-to-list.input";
import { ListWithNotesOutput } from "@application/dtos/note-lists/list-with-notes.output";
import { NoteListCreationInput } from "@application/dtos/note-lists/note-list-creation.input";
import { NoteListUpdatingInput } from "@application/dtos/note-lists/note-list-updating.input";
import { NoteListOutput } from "@application/dtos/note-lists/note-list.output";
import { SimplifiedNoteListOutput } from "@application/dtos/note-lists/simplified-note-list.output";

export abstract class NoteListsUseCases {
  abstract createNoteList(data: NoteListCreationInput): Observable<NoteListOutput>;
  abstract getAllNoteLists(): Observable<SimplifiedNoteListOutput[]>;
  abstract getOneNoteList(id: string): Observable<NoteListOutput>;
  abstract deleteNoteList(id: string): void;
  abstract deleteCheckedNoteLists(): void;
  abstract updateNoteList(id: string, data: NoteListUpdatingInput): Observable<NoteListOutput>;
  abstract addNoteToList(id: string, data: AddNoteToListInput): void;
  abstract removeNoteFromList(idList: string, idNote): void;
  abstract checkNoteList(id: string): void;
  abstract getListsWithNotes(): Promise<ListWithNotesOutput[]>;
}