import {
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  EnvelopeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
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

export const dashboardSections: DashboardSection[] = [
  {
    id: 'overview',
    title: 'Áttekintés',
    description: 'Összefoglaló a közelgő és folyamatban lévő eseményekről, résztvevői regisztrációkról.',
    icon: ChartBarIcon,
    stats: [
      { label: 'Aktív Események', value: '12' },
      { label: 'Mai Résztvevők', value: '234' },
      { label: 'Következő 7 nap', value: '8' },
      { label: 'Függő Jóváhagyások', value: '15' }
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
      { label: 'Tervezett', value: '8' },
      { label: 'Folyamatban', value: '4' }
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
      { label: 'Aktív Pontok', value: '6' },
      { label: 'Mai Belépések', value: '189' }
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
      { label: 'Kiküldött', value: '520' },
      { label: 'Visszaigazolt', value: '342' }
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
      { label: 'Aktív Kiállítások', value: '3' },
      { label: 'Szabad Standok', value: '12' }
    ],
    actions: [
      { label: 'Stand Foglalás', onClick: () => { }, primary: true },
      { label: 'Térkép Nézet', onClick: () => { } }
    ]
  },
  {
    id: 'staff-assignment',
    title: 'Személyzet Hozzárendelés',
    description: 'Személyzet hozzárendelése kiállításokhoz és ellenőrző pontokhoz.',
    icon: UserIcon,
    stats: [
      { label: 'Aktív Személyzet', value: '24' },
      { label: 'Mai Műszakok', value: '8' }
    ],
    actions: [
      { label: 'Műszak Beosztás', onClick: () => { }, primary: true },
      { label: 'Személyzet Lista', onClick: () => { } }
    ]
  },
  {
    id: 'check-in-monitoring',
    title: 'Bejelentkezés Figyelés',
    description: 'Valós idejű bejelentkezési statisztikák és résztvevői áramlás követése.',
    icon: UserGroupIcon,
    stats: [
      { label: 'Mai Belépések', value: '234' },
      { label: 'Aktív Résztvevők', value: '156' }
    ],
    actions: [
      { label: 'Élő Monitor', onClick: () => { }, primary: true },
      { label: 'Jelentések', onClick: () => { } }
    ]
  },
  {
    id: 'communication-center',
    title: 'Kommunikációs Központ',
    description: 'EmailTemplate eszközök kezelése és tömeges kommunikáció.',
    icon: ChatBubbleLeftRightIcon,
    stats: [
      { label: 'Mai Üzenetek', value: '45' },
      { label: 'Sablonok', value: '12' }
    ],
    actions: [
      { label: 'Új Üzenet', onClick: () => { }, primary: true },
      { label: 'Sablonok Kezelése', onClick: () => { } }
    ]
  }
];