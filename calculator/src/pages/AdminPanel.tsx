import React from 'react';
import { useStore } from '../store';
import CompanyForm from '../components/admin/CompanyForm';
import MethodsTable from '../components/admin/MethodsTable';

function AdminPanel() {
  const { communicationMethods, addCompany } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add New Company
          </h3>
          <CompanyForm onSubmit={addCompany} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Communication Methods
          </h3>
          <MethodsTable methods={communicationMethods} />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;