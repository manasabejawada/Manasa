export type Company = {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number; // in days
  createdAt: string;
  updatedAt: string;
};

export type CommunicationMethod = {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
};

export type Communication = {
  id: string;
  companyId: string;
  methodId: string;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationType = 'overdue' | 'today';