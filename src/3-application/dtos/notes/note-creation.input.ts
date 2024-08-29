import { IsString } from 'class-validator'

export class NoteCreationInput {
  @IsString()
  title: string;
}