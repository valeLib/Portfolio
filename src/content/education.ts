// Education data

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  description?: string;
  highlights?: string[];
}

export const education: Education[] = [
  {
    id: 'usach',
    institution: 'Universidad de Santiago de Chile (USACH)',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science / Informatics Engineering',
    location: 'Santiago, Chile',
    period: '2016 - 2021',
    description: 'Engineering degree with focus on software development, algorithms, and systems design.',
    highlights: [
      'Software Engineering and Architecture',
      'Data Structures and Algorithms',
      'Database Systems',
      'Web Development',
    ],
  },
];

// Helper function
export const getEducationById = (id: string): Education | undefined => {
  return education.find((edu) => edu.id === id);
};
