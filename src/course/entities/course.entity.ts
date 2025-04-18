export enum CourseComplexity {
  INTRODUCTORY = 'BASIC',
  FOUNDATIONAL = 'INTERMEDIATE',
  CHALLENGING = 'ADVANCED',
}

export class Course {
  id: string;
  name: string;
  complexity: CourseComplexity;
  base_price: number;
  code: string;
  tutors: string[]; // Usamos IDs de los tutores
  topics: string[]; // IDs de los topics
  group_tutoring_sessions: string[]; // IDs de las sesiones de grupo
}
