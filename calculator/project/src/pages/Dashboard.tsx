import React from 'react';
import CompanyList from '../components/user/CompanyList';
import NotificationPanel from '../components/user/NotificationPanel';

function Dashboard() {
  return (
    <div className="space-y-6">
      <NotificationPanel />
      <CompanyList />
    </div>
  );
}

export default Dashboard;