export class CreateMajorDto {
  name: string;
  code: string;
  department: string;
  duration: number;
  description?: string;
  is_active: boolean;
  courses?: string[];
}
