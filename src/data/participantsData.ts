import { Participant } from '../features/participant/types/participants';

export const participants: Participant[] = [
  {
    id: 1,
    firstName: "Dr. Nagy",
    lastName: "János",
    email: "nagy.janos@example.com",
    title: "PhD",
    organization: "Semmelweis Egyetem",
    role: "speaker",
    status: "confirmed",
    registrationDate: "2024-01-15T10:30:00Z",
    badgeId: "SPK001",
    dietaryRestrictions: ["vegetarian"],
    notes: "Keynote speaker"
  },
  {
    id: 2,
    firstName: "Éva",
    lastName: "Kiss",
    email: "kiss.eva@example.com",
    title: "MSc",
    organization: "Tech Solutions Kft",
    role: "attendee",
    status: "registered",
    registrationDate: "2024-01-16T14:20:00Z",
    badgeId: "ATT045"
  },
  {
    id: 3,
    firstName: "Kovács",
    lastName: "Péter",
    email: "kovacs.peter@example.com",
    organization: "Innovációs Központ",
    role: "organizer",
    status: "confirmed",
    registrationDate: "2024-01-10T08:15:00Z",
    badgeId: "ORG003",
    notes: "Technical coordinator"
  }
];