import React, { useState } from 'react';
import { useStore } from '../../store';
import { format } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import CommunicationModal from './CommunicationModal';
import { getNextCommunicationDate, isOverdue, isDueToday } from '../../utils/dateUtils';
import type { Company } from '../../types';

export default function CompanyList() {
  const { companies, communications, communicationMethods } = useStore();
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getRowClass = (company: Company) => {
    const nextComm = getNextCommunicationDate(company, communications);
    if (isOverdue(nextComm)) return 'bg-red-50';
    if (isDueToday(nextComm)) return 'bg-yellow-50';
    return '';
  };

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Companies</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={selectedCompanies.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Log Communication
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCompanies(companies.map(c => c.id));
                      } else {
                        setSelectedCompanies([]);
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Five Communications
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className={getRowClass(company)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => toggleCompanySelection(company.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {getLastFiveCommunications(company.id).map((comm) => {
                        const method = communicationMethods.find(m => m.id === comm.methodId);
                        return (
                          <span
                            key={comm.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-help"
                            title={`${method?.name}: ${comm.notes}`}
                          >
                            {format(new Date(comm.date), 'MMM d')}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(getNextCommunicationDate(company, communications), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CommunicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompanies([]);
        }}
        selectedCompanyIds={selectedCompanies}
      />
    </div>
  );
}