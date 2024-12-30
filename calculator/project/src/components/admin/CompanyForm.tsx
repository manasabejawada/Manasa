import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyFormProps {
  onSubmit: (company: Company) => void;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    emails: [],
    phoneNumbers: [],
  });
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompany.name) {
      onSubmit({
        id: crypto.randomUUID(),
        name: newCompany.name,
        location: newCompany.location || '',
        linkedinProfile: newCompany.linkedinProfile || '',
        emails: newCompany.emails || [],
        phoneNumbers: newCompany.phoneNumbers || [],
        comments: newCompany.comments || '',
        communicationPeriodicity: Number(newCompany.communicationPeriodicity) || 14,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Company);
      setNewCompany({ emails: [], phoneNumbers: [] });
      setNewEmail('');
      setNewPhone('');
    }
  };

  const addEmail = () => {
    if (newEmail && !newCompany.emails?.includes(newEmail)) {
      setNewCompany({
        ...newCompany,
        emails: [...(newCompany.emails || []), newEmail],
      });
      setNewEmail('');
    }
  };

  const removeEmail = (email: string) => {
    setNewCompany({
      ...newCompany,
      emails: newCompany.emails?.filter((e) => e !== email) || [],
    });
  };

  const addPhone = () => {
    if (newPhone && !newCompany.phoneNumbers?.includes(newPhone)) {
      setNewCompany({
        ...newCompany,
        phoneNumbers: [...(newCompany.phoneNumbers || []), newPhone],
      });
      setNewPhone('');
    }
  };

  const removePhone = (phone: string) => {
    setNewCompany({
      ...newCompany,
      phoneNumbers: newCompany.phoneNumbers?.filter((p) => p !== phone) || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={newCompany.name || ''}
          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={newCompany.location || ''}
          onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          value={newCompany.linkedinProfile || ''}
          onChange={(e) => setNewCompany({ ...newCompany, linkedinProfile: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
        <div className="mt-1 flex space-x-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addEmail}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {newCompany.emails?.map((email) => (
            <span
              key={email}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {email}
              <button
                type="button"
                onClick={() => removeEmail(email)}
                className="ml-1.5 inline-flex items-center"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        <div className="mt-1 flex space-x-2">
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addPhone}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {newCompany.phoneNumbers?.map((phone) => (
            <span
              key={phone}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800"
            >
              {phone}
              <button
                type="button"
                onClick={() => removePhone(phone)}
                className="ml-1.5 inline-flex items-center"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          id="comments"
          rows={3}
          value={newCompany.comments || ''}
          onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          id="periodicity"
          min="1"
          value={newCompany.communicationPeriodicity || ''}
          onChange={(e) => setNewCompany({ ...newCompany, communicationPeriodicity: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Company
        </button>
      </div>
    </form>
  );
}