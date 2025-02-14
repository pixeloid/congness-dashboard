import { Abstract } from '@/features/abstract/types/abstract';

export const abstracts: Abstract[] = [
  {
    id: 1,
    title: "Új megközelítések az orvosi képalkotásban",
    description: "A tanulmány innovatív technikákat mutat be az AI-vezérelt orvosi képalkotásban.",
    keywords: ["orvosi képalkotás", "mesterséges intelligencia", "egészségügy"],
    authors: [
      {
        id: 1,
        name: "Dr. Nagy János",
        email: "nagy.janos@example.com",
        affiliation: "Semmelweis University",
        isPresenting: true
      }
    ],
    status: "in_review",
    submittedAt: "2024-01-15T10:30:00Z",
    submitterId: 1,
    occasionId: 1,
    presentationType: "oral"
  },
  {
    id: 2,
    title: "Gépi tanulás a diagnosztikai eljárásokban",
    description: "A gépi tanulás alkalmazásainak áttekintése a modern orvosi diagnosztikában.",
    keywords: ["gépi tanulás", "diagnosztika", "egészségügyi technológia"],
    authors: [
      {
        id: 2,
        name: "Dr. Johnson",
        email: "accepted@example.com",
        affiliation: "Medical Research Institute",
        isPresenting: true
      }
    ],
    status: "accepted",
    submittedAt: "2024-01-16T14:20:00Z",
    submitterId: 2,
    occasionId: 1,
    presentationType: "oral"
  },
  {
    id: 3,
    title: "Mély tanulás az orvosi képelemzésben",
    description: "Mély tanulási architektúrák feltárása orvosi képszegmentáláshoz és osztályozáshoz.",
    keywords: ["mély tanulás", "orvosi képalkotás", "mesterséges intelligencia"],
    authors: [
      {
        id: 3,
        name: "Dr. Smith",
        email: "accepted@example.com",
        affiliation: "Medical Research Institute",
        isPresenting: true
      }
    ],
    status: "submitted",
    submittedAt: "2024-01-17T09:15:00Z",
    submitterId: 2,
    occasionId: 1
  },
  {
    id: 4,
    title: "Klinikai vizsgálati eredmények: Új rákkezelés",
    description: "Egy új rákkezelési megközelítés III. fázisú klinikai vizsgálatának eredményei.",
    keywords: ["klinikai vizsgálat", "rák", "kezelés"],
    authors: [
      {
        id: 4,
        name: "Dr. Kovács Péter",
        email: "kovacs.peter@example.com",
        affiliation: "National Cancer Institute",
        isPresenting: true
      }
    ],
    status: "accepted",
    submittedAt: "2024-01-18T11:30:00Z",
    submitterId: 3,
    occasionId: 1
  },
  {
    id: 5,
    title: "Blockchain alapú IoT biztonság",
    description: "Új megközelítések IoT eszközök biztonságának növelésére blockchain technológiával",
    keywords: ["blockchain", "IoT", "biztonság"],
    authors: [
      {
        id: 5,
        name: "Dr. Szabó Péter",
        email: "szabo.peter@example.com",
        affiliation: "Tech University",
        isPresenting: true
      }
    ],
    status: "in_review",
    submittedAt: "2024-05-15T10:30:00Z",
    submitterId: 5,
    occasionId: 2,
    presentationType: "oral"
  },
  {
    id: 6,
    title: "Kvantumszámítógépek a kriptográfiában",
    description: "A kvantumszámítógépek hatása a modern kriptográfiai módszerekre",
    keywords: ["kvantumszámítógép", "kriptográfia", "biztonság"],
    authors: [
      {
        id: 6,
        name: "Dr. Kiss János",
        email: "kiss.janos@example.com",
        affiliation: "Quantum Research Lab",
        isPresenting: true
      }
    ],
    status: "accepted",
    submittedAt: "2024-05-16T14:20:00Z",
    submitterId: 6,
    occasionId: 2,
    presentationType: "oral"
  }
];