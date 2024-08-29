import { Observable } from "rxjs";
import { ReportCreationInput } from "@application/dtos/bug-reports/report-creation.input";
import { ReportSubmissionInstructionOutput } from "@application/dtos/bug-reports/report-submission-instruction.output";
import { ReportOutput } from "@application/dtos/bug-reports/report.output";

export abstract class BugReportsUseCases {
  abstract addBugReport(data: ReportCreationInput): Observable<ReportOutput>;
  abstract getBugReportInstructions(): Observable<ReportSubmissionInstructionOutput[]>;
}