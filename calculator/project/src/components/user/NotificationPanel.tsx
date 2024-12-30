import React from 'react';
import { useStore } from '../../store';
import { format } from 'date-fns';
import { AlertCircle, Clock } from 'lucide-react';
import { getNextCommunicationDate, isOverdue, isDueToday } from '../../utils/dateUtils';

export default function NotificationPanel() {
  const { companies, communications } = useStore();

  const overdueCompanies = companies.filter((company) =>
    isOverdue(getNextCommunicationDate(company, communications))
  );

  const todayCompanies = companies.filter((company) =>
    isDueToday(getNextCommunicationDate(company, communications))
  );

  return (
    <div className="space-y-6">
      {/* Rest of the component remains the same */}
    </div>
  );
}