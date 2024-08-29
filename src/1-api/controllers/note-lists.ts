import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NoteListsUseCases } from '@application/abstractions/use-cases/note-lists';
import { NoteListCreationInput } from '@application/dtos/note-lists/note-list-creation.input';
import { NoteListOutput } from '@application/dtos/note-lists/note-list.output';
import { SimplifiedNoteListOutput } from '@application/dtos/note-lists/simplified-note-list.output';
import { AddNoteToListInput } from '@application/dtos/note-lists/add-note-to-list.input';
import { NoteListUpdatingInput } from '@application/dtos/note-lists/note-list-updating.input';
import { NotesUseCases } from '@application/abstractions/use-cases/notes';
import { ListWithNotesOutput } from '@application/dtos/note-lists/list-with-notes.output';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('NoteLists')
@Controller()
export class NoteListsController {
  constructor(
    private noteListsUseCases: NoteListsUseCases,
    private noteUseCases: NotesUseCases,
  ) {}

  @Version(['1.0'])
  @Post('note-lists')
  post(@Body() data: NoteListCreationInput): Observable<NoteListOutput> {     
    return this.noteListsUseCases.createNoteList(data);
  }
  
  @Version(['1.0'])
  @Get('note-lists')
  get(): Observable<SimplifiedNoteListOutput[]> {
    return this.noteListsUseCases.getAllNoteLists();
  }
  
  @Version(['1.0'])
  @Get('note-lists/:id')
  getOne(@Param('id') id: string): Observable<NoteListOutput> {
    return this.noteListsUseCases.getOneNoteList(id);
  }
 
  @Version(['1.0'])
  @Delete('note-lists/:id')
  delete(@Param('id') id: string): void {
    return this.noteListsUseCases.deleteNoteList(id);
  }
  
  @Version(['1.0'])
  @Delete('checked-note-lists')
  deleteCheckedNoteLists(): void {
    return this.noteListsUseCases.deleteCheckedNoteLists();
  }

  @Version(['1.0'])
  @Patch('note-lists/:id')
  update(@Param('id') id: string, @Body() data: NoteListUpdatingInput): Observable<NoteListOutput> {
    return this.noteListsUseCases.updateNoteList(id, data);
  }

  @Version(['1.0'])
  @Delete('note-lists/:listId/notes/:noteId')
  removeNote(@Param('listId') listId: string, @Param('noteId') noteId: string): void {
    return this.noteListsUseCases.removeNoteFromList(listId, noteId);
  }

  @Version(['1.0'])
  @Post('note-lists/:id/notes')
  addNote(@Param('id') id: string, @Body() data: AddNoteToListInput): void {
    return this.noteListsUseCases.addNoteToList(id, data);
  }

  @Version(['1.0'])
  @Get('lists-with-notes')
  getNoteListWithinNotes(): Promise<ListWithNotesOutput[]> {
    return this.noteListsUseCases.getListsWithNotes();
  }
}