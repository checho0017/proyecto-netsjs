import { Injectable } from "@nestjs/common";
import { NotesAndListsAdapter } from "../abstractions/infrastructure/notes/notes-and-lists.adapter";
import { CanvasSettingsUseCases } from "../abstractions/use-cases/canvas-settings";

@Injectable()
export class CanvasSettingsService implements CanvasSettingsUseCases {
  constructor(private notesAdapter: NotesAndListsAdapter) {}

  deleteCompletedNotesAndLists(): void {
    this.notesAdapter.deleteCompletedItems({}).subscribe();
  }
  deleteAllNotesAndLists(): void {
    this.notesAdapter.deleteAllItems({}).subscribe();
  }
  initializeCanvasWithList(): void {
    this.notesAdapter.initializeCanvas({}).subscribe();
  }
}