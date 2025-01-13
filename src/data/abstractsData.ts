import { Abstract } from '@/types/abstract';

export const abstracts: Abstract[] = [
  {
    id: 1,
    title: "Novel Approaches in Medical Imaging",
    description: "This study presents innovative techniques in medical imaging using AI-driven analysis.",
    keywords: ["medical imaging", "AI", "healthcare"],
    authors: [
      {
        id: 1,
        name: "Dr. Nagy János",
        email: "nagy.janos@example.com",
        affiliation: "Semmelweis University",
        isPresenting: true
      }
    ],
    status: "accepted",
    submittedAt: "2024-01-15T10:30:00Z",
    submitterId: 1,
    occasionId: 1,
    presentationType: "oral"
  },
  // From accepted invitation
  {
    id: 2,
    title: "Machine Learning in Diagnostic Procedures",
    description: "An overview of machine learning applications in modern medical diagnostics.",
    keywords: ["machine learning", "diagnostics", "healthcare technology"],
    authors: [
      {
        id: 2,
        name: "Dr. Johnson",
        email: "accepted@example.com", // Matches accepted invitation
        affiliation: "Medical Research Institute",
        isPresenting: true
      }
    ],
    status: "in_review",
    submittedAt: "2024-01-16T14:20:00Z",
    submitterId: 2,
    occasionId: 1
  },
  // Another from accepted invitation
  {
    id: 3,
    title: "Deep Learning for Medical Image Analysis",
    description: "Exploring deep learning architectures for medical image segmentation and classification.",
    keywords: ["deep learning", "medical imaging", "AI"],
    authors: [
      {
        id: 3,
        name: "Dr. Smith",
        email: "accepted@example.com", // Same author, second abstract
        affiliation: "Medical Research Institute",
        isPresenting: true
      }
    ],
    status: "submitted",
    submittedAt: "2024-01-17T09:15:00Z",
    submitterId: 2,
    occasionId: 1
  },
  // Regular submission (no invitation)
  {
    id: 4,
    title: "Clinical Trial Results: New Cancer Treatment",
    description: "Results from a phase III clinical trial of a novel cancer treatment approach.",
    keywords: ["clinical trial", "cancer", "treatment"],
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