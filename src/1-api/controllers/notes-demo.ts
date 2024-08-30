import { Controller, Get, Version } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller()
export class NotesDemoController {
  constructor() {}
  // @Get('notes')
  @Get('notes-demo')
  @Version(['1.0'])
  get(): any {
    return [
        {
            id: '1',
            title: 'Note 1',
            description: 'Description 1',
            status: 'pending',
            ubicacion: 'Medellin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Note 2',
            description: 'Description 2',
            status: 'pending',
            ubicacion: 'Medellin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ]
  }
  

}