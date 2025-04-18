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
  tutors: string[];
  topics: string[];
  group_tutoring_sessions: string[];
}
