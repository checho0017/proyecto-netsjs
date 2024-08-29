import { Provider } from '@nestjs/common/interfaces';
import { ScBmsBugReportsService } from './sc-bms-bug-reports.service';
import { BugReportsAdapter } from '@application/abstractions/infrastructure/bug-reports/bug-reports.adapter';

export const scBmsBugReportsProviders: Provider[] = [
  ScBmsBugReportsService,
  {provide: BugReportsAdapter, useExisting: ScBmsBugReportsService},
];