import { Abstract } from '@/types/abstract';

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
    status: "in_review",
    submittedAt: "2024-01-16T14:20:00Z",
    submitterId: 2,
    occasionId: 1
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
  }
];