import { Injectable } from "@nestjs/common";
import { BugReportsUseCases } from "../abstractions/use-cases/bug-reports";
import { BugReportsAdapter } from "../abstractions/infrastructure/bug-reports/bug-reports.adapter";
import { ReportCreationInput } from "../dtos/bug-reports/report-creation.input";
import { ReportSubmissionInstructionOutput } from "../dtos/bug-reports/report-submission-instruction.output";
import { ReportOutput } from "../dtos/bug-reports/report.output";
import { Observable, map } from "rxjs";
import { AxiosResponse } from "axios";
import { BugReport, BugReportInstruction } from "../abstractions/infrastructure/bug-reports/bug-reports.dtos";

@Injectable()
export class BugReportsService implements BugReportsUseCases {
  constructor(
    private bugReportsAdapter: BugReportsAdapter,
  ) {}
  addBugReport(data: ReportCreationInput): Observable<ReportOutput> {
    return this.bugReportsAdapter.addBugReport(data).pipe(map((response: AxiosResponse<BugReport>) => {
      return response.data;
    }));
  }
  getBugReportInstructions(): Observable<ReportSubmissionInstructionOutput[]> {
    return this.bugReportsAdapter.getBugReportInstructions().pipe(map((response: AxiosResponse<BugReportInstruction[]>) => {
      return response.data;
    }));
  }
}