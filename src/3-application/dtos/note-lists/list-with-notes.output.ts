import { SimplifiedNoteOutput } from "../notes/simplified-note.output";

export type ListWithNotesOutput = {
  id: string;
  name: string;
  state: number;
  notes: SimplifiedNoteOutput[];
}