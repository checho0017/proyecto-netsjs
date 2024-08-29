import { Provider } from '@nestjs/common/interfaces';
import { MsApiGraphService } from './ms-api-graph.service';
import { UsersAdapter } from '@application/abstractions/infrastructure/users/users.adapter';

export const msApiGraphProviders: Provider[] = [
  MsApiGraphService,
  {provide: UsersAdapter, useExisting: MsApiGraphService},
];