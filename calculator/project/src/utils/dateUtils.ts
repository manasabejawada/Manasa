import { Company, Communication } from '../types';

export const getNextCommunicationDate = (
  company: Company,
  communications: Communication[]
): Date => {
  const lastComm = communications
    .filter((comm) => comm.companyId === company.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!lastComm) return new Date();

  const nextDate = new Date(lastComm.date);
  nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);
  return nextDate;
};

export const isOverdue = (date: Date): boolean => {
  return date < new Date();
};

export const isDueToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};