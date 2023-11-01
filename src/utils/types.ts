export type TJobs = {
  id?: string;
  title: string;
  company: string;
  applicationDate?: Date;
  hasResponse: boolean;
  isClosed: boolean;
  recruiterLinkedIn: string;
  techLeadLinkedIn: string;
  jobDetailsURL: string;
};

export type TJobsData = {
  data: TJobs[];
};
