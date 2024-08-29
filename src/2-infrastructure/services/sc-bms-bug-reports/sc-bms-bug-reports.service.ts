import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { BugReportsAdapter } from "@application/abstractions/infrastructure/bug-reports/bug-reports.adapter";
import { BugReport, BugReportInstruction, CreationBugReport } from "@application/abstractions/infrastructure/bug-reports/bug-reports.dtos";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { AppSettingsService } from "@libs/config/app-settings.service";

@Injectable()
export class ScBmsBugReportsService implements BugReportsAdapter {
  private baseUrl: string;
    
  constructor(
    private http: HttpService,
    private settings: AppSettingsService,
  ) {
    this.baseUrl = this.settings.apiBugReportsBaseUrl;
  }
  addBugReport(data: CreationBugReport): Observable<AxiosResponse<BugReport>> {
    return this.http.post<BugReport>(`${this.baseUrl}/bug-reports`, data);
  }
  getBugReportInstructions(): Observable<AxiosResponse<BugReportInstruction[]>> {
    return this.http.get<BugReportInstruction[]>(`${this.baseUrl}/bug-report-submission-instructions`);
  }
}