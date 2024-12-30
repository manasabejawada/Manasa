import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store';

interface CommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompanyIds: string[];
}

export default function CommunicationModal({
  isOpen,
  onClose,
  selectedCompanyIds,
}: CommunicationModalProps) {
  const { companies, communicationMethods, addCommunication } = useStore();
  const [methodId, setMethodId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectedCompanyIds.forEach((companyId) => {
      addCommunication({
        id: crypto.randomUUID(),
        companyId,
        methodId,
        date,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Log Communication</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Companies
            </label>
            <div className="mt-1 text-sm text-gray-500">
              {selectedCompanyIds.map((id) => (
                <span
                  key={id}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {companies.find((c) => c.id === id)?.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="method"
              className="block text-sm font-medium text-gray-700"
            >
              Communication Method
            </label>
            <select
              id="method"
              value={methodId}
              onChange={(e) => setMethodId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a method</option>
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}