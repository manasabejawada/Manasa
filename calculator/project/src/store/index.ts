import { create } from 'zustand';
import { Company, Communication, CommunicationMethod } from '../types';

interface AppState {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  setCompanies: (companies: Company[]) => void;
  setCommunications: (communications: Communication[]) => void;
  setCommunicationMethods: (methods: CommunicationMethod[]) => void;
  addCompany: (company: Company) => void;
  addCommunication: (communication: Communication) => void;
}

export const useStore = create<AppState>((set) => ({
  companies: [],
  communications: [],
  communicationMethods: [
    {
      id: '1',
      name: 'LinkedIn Post',
      description: 'Post on company LinkedIn page',
      sequence: 1,
      isMandatory: true,
    },
    {
      id: '2',
      name: 'LinkedIn Message',
      description: 'Direct message on LinkedIn',
      sequence: 2,
      isMandatory: true,
    },
    {
      id: '3',
      name: 'Email',
      description: 'Email communication',
      sequence: 3,
      isMandatory: true,
    },
    {
      id: '4',
      name: 'Phone Call',
      description: 'Phone call communication',
      sequence: 4,
      isMandatory: true,
    },
    {
      id: '5',
      name: 'Other',
      description: 'Other forms of communication',
      sequence: 5,
      isMandatory: false,
    },
  ],
  setCompanies: (companies) => set({ companies }),
  setCommunications: (communications) => set({ communications }),
  setCommunicationMethods: (communicationMethods) => set({ communicationMethods }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  addCommunication: (communication) =>
    set((state) => ({
      communications: [...state.communications, communication],
    })),
}));