import { Body, Controller, Get, Post, Version } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { BugReportsUseCases } from "@application/abstractions/use-cases/bug-reports";
import { ReportCreationInput } from "@application/dtos/bug-reports/report-creation.input";
import { ReportSubmissionInstructionOutput } from "@application/dtos/bug-reports/report-submission-instruction.output";
import { ReportOutput } from "@application/dtos/bug-reports/report.output";

@ApiTags('BugReports')
@Controller()
export class BugReportsController {
  constructor(
    private bugReportsUseCases: BugReportsUseCases
  ) {}

  @Version(['1.0'])
  @Post('bug-reports')
  post(@Body() data: ReportCreationInput): Observable<ReportOutput> {
    return this.bugReportsUseCases.addBugReport(data);
  };

  @Version(['1.0'])
  @Get('bug-report-submission-instructions')
  get(): Observable<ReportSubmissionInstructionOutput[]> {
    return this.bugReportsUseCases.getBugReportInstructions();
  }
}