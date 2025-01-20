import { Occasion } from '@/features/occasion/types/occasions';
import {
  ChartBarIcon,
  CalendarIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

interface Stat {
  label: string;
  value: string;
}

interface Action {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

interface DashboardSection {
  id: string;
  title: string;
  icon: any;
  stats: Stat[];
  actions: Action[];
  description: string;
}

// Example API or function to fetch occasion-specific data (replace with real logic)
const fetchStatsForOccasion = (occasion: Occasion): Record<string, any> => ({
  activeEvents: 12,
  participantsToday: occasion.numParticipants,
  upcomingEvents: 8,
  pendingApprovals: 15,
  plannedEvents: 8,
  ongoingEvents: 4,
  activeCheckpoints: 6,
  todayCheckins: 189,
  invitationsSent: 520,
  invitationsConfirmed: 342,
  activeExhibitions: 3,
  freeBooths: 12,
  activeStaff: 24,
  todayShifts: 8,
  activeParticipants: 156,
  todayMessages: 45,
  templates: 12,
});

export const getDashboardSections = (occasion: Occasion): DashboardSection[] => {
  const stats = fetchStatsForOccasion(occasion);

  return [
    {
      id: 'overview',
      title: 'Áttekintés',
      description: 'Összefoglaló a közelgő és folyamatban lévő eseményekről, résztvevői regisztrációkról.',
      icon: ChartBarIcon,
      stats: [
        { label: 'Aktív Események', value: stats.activeEvents.toString() },
        { label: 'Mai Résztvevők', value: stats.participantsToday.toString() },
        { label: 'Következő 7 nap', value: stats.upcomingEvents.toString() },
        { label: 'Függő Jóváhagyások', value: stats.pendingApprovals.toString() }
      ],
      actions: [
        { label: 'Részletes Jelentés', onClick: () => { }, primary: true },
        { label: 'Exportálás', onClick: () => { } }
      ]
    },
    {
      id: 'occasion-management',
      title: 'Eseménykezelés',
      description: 'Kongresszusi események létrehozása, frissítése és kezelése.',
      icon: CalendarIcon,
      stats: [
        { label: 'Tervezett', value: stats.plannedEvents.toString() },
        { label: 'Folyamatban', value: stats.ongoingEvents.toString() }
      ],
      actions: [
        { label: 'Új Esemény', onClick: () => { }, primary: true },
        { label: 'Események Kezelése', onClick: () => { } }
      ]
    },
    {
      id: 'checkpoint-management',
      title: 'Ellenőrzőpont Kezelés',
      description: 'Résztvevők nyomon követésére szolgáló ellenőrző pontok kezelése.',
      icon: ClipboardDocumentCheckIcon,
      stats: [
        { label: 'Aktív Pontok', value: stats.activeCheckpoints.toString() },
        { label: 'Mai Belépések', value: stats.todayCheckins.toString() }
      ],
      actions: [
        { label: 'Pont Hozzáadása', onClick: () => { }, primary: true },
        { label: 'Beléptetés Figyelése', onClick: () => { } }
      ]
    },
    {
      id: 'participant-invitations',
      title: 'Résztvevői Meghívók',
      description: 'Meghívók küldése, RSVP-k kezelése és vendégek nyomon követése.',
      icon: EnvelopeIcon,
      stats: [
        { label: 'Kiküldött', value: stats.invitationsSent.toString() },
        { label: 'Visszaigazolt', value: stats.invitationsConfirmed.toString() }
      ],
      actions: [
        { label: 'Új Meghívó', onClick: () => { }, primary: true },
        { label: 'RSVP Kezelés', onClick: () => { } }
      ]
    },
    {
      id: 'exhibition-management',
      title: 'Kiállítás Kezelés',
      description: 'Kiállítások létrehozása, standok kiosztása és események összekapcsolása.',
      icon: BuildingStorefrontIcon,
      stats: [
        { label: 'Aktív Kiállítások', value: stats.activeExhibitions.toString() },
        { label: 'Szabad Standok', value: stats.freeBooths.toString() }
      ],
      actions: [
        { label: 'Stand Foglalás', onClick: () => { }, primary: true },
        { label: 'Térkép Nézet', onClick: () => { } }
      ]
    },
    // Add other sections dynamically as needed
  ];
};
