import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotesUseCases } from '@application/abstractions/use-cases/notes';
import { NoteStatusChangeInput } from '@application/dtos/notes/note-status-change.input';
import { NoteCreationInput } from '@application/dtos/notes/note-creation.input';
import { NoteUpdatingInput } from '@application/dtos/notes/note-updating.input';
import { NoteOutput } from '@application/dtos/notes/note.output';
import { SimplifiedNoteOutput } from '@application/dtos/notes/simplified-note.output';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notes')
@Controller()
export class NotesController {
  constructor(
    private notesUseCases: NotesUseCases,
  ) {}

  @Post('notes')
  @Version(['1.0'])
  post(@Body() data: NoteCreationInput): Observable<NoteOutput> {     
    return this.notesUseCases.createNote(data);
  }

  @Get('notes')
  @Version(['1.0'])
  get(): Observable<SimplifiedNoteOutput[]> {
    return this.notesUseCases.getAllNotes();
  }
  
  @Get('notes/:id')
  @Version(['1.0'])
  getOne(@Param('id') id: string): Observable<NoteOutput> {
    
    return this.notesUseCases.getOneNote(id);
  }
 
  @Delete('notes/:id')
  @Version(['1.0'])
  delete(@Param('id') id: string): void {
    return this.notesUseCases.deleteNote(id);
  }
 
  @Delete('checked-notes')
  @Version(['1.0'])
  deleteCheckedNotes(): void {
    return this.notesUseCases.deleteCheckedNotes();
  }

  @Post('notes/:id/states')
  @Version(['1.0'])
  changeStateNote(@Param('id') id: string, @Body() body: NoteStatusChangeInput): Observable<NoteOutput> {
    return this.notesUseCases.changeStateNote(id, body);
  }

  @Patch('notes/:id')
  @Version(['1.0'])
  update(@Param('id') id: string, @Body() body: NoteUpdatingInput): Observable<NoteOutput> {
    return this.notesUseCases.updateNote(id, body);
  }

  @Get('isolate-notes')
  @Version(['1.0'])
  getIsolateNotes(): Observable<SimplifiedNoteOutput[]> {
    return this.notesUseCases.getIsolateNotes();
  }
}