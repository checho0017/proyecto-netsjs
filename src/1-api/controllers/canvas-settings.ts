import { Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CanvasSettingsUseCases } from '@application/abstractions/use-cases/canvas-settings';

@ApiTags('Canvas')
@Controller()
export class CanvasSettingsController {
  constructor(private canvasSettings: CanvasSettingsUseCases) {}

  @Version(['1.0'])
  @Post('canvas/main/completed-items-deletions')
  deleteCompleted(): void {     
    return this.canvasSettings.deleteCompletedNotesAndLists();
  }

  @Version(['1.0'])
  @Post('canvas/main/all-items-deletions')
  deleteAll(): void {
    return this.canvasSettings.deleteAllNotesAndLists();
  }
  
  @Version(['1.0'])
  @Post('canvas/main/with-list-initializations')
  initializeWithList(): void {
    return this.canvasSettings.initializeCanvasWithList();
  }
}