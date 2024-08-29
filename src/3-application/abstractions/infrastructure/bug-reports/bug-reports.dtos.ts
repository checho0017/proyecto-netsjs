type BugReport = {
  id: string;
  summary: string;
  description: string;
  recreation: string;
  creator: string;
  creationDate: string;
  updater: string;
  lastUpdateDate: string;
}

type CreationBugReport = {
  summary: string;
  description: string;
  recreation: string;
}

type BugReportInstruction = {
  id: string;
  order: number;
  title: string;
  description: string;
}

export {
  BugReport,
  CreationBugReport,
  BugReportInstruction,
}