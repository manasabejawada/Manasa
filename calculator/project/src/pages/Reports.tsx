import React from 'react';
import { useStore } from '../store';
import { BarChart3, PieChart } from 'lucide-react';

function Reports() {
  const { communications, companies, communicationMethods } = useStore();

  const methodStats = communicationMethods.map((method) => ({
    method: method.name,
    count: communications.filter((comm) => comm.methodId === method.id).length,
  }));

  const companyStats = companies.map((company) => ({
    company: company.name,
    count: communications.filter((comm) => comm.companyId === company.id).length,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Communication Method Distribution
          </h3>
          <div className="h-64 flex items-end space-x-4">
            {methodStats.map((stat) => (
              <div
                key={stat.method}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-indigo-500 rounded-t"
                  style={{
                    height: `${(stat.count / communications.length) * 100}%`,
                  }}
                />
                <div className="mt-2 text-sm text-gray-500 transform -rotate-45 origin-top-left">
                  {stat.method}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Company Engagement
          </h3>
          <div className="h-64 flex items-end space-x-4">
            {companyStats.map((stat) => (
              <div
                key={stat.company}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-green-500 rounded-t"
                  style={{
                    height: `${(stat.count / communications.length) * 100}%`,
                  }}
                />
                <div className="mt-2 text-sm text-gray-500 transform -rotate-45 origin-top-left">
                  {stat.company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;