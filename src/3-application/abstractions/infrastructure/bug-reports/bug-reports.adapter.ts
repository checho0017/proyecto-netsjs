import { Observable } from "rxjs";
import { BugReport, BugReportInstruction, CreationBugReport } from "./bug-reports.dtos";
import { AxiosResponse } from "axios";

export abstract class BugReportsAdapter {
  abstract addBugReport (data: CreationBugReport): Observable<AxiosResponse<BugReport>>;
  abstract getBugReportInstructions (): Observable<AxiosResponse<BugReportInstruction[]>>;
}