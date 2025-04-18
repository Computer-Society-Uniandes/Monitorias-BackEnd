import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Firestore } from '@google-cloud/firestore';
import { UserMajor } from '../user/entities/user.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  private db: FirebaseFirestore.Firestore;
  private collectionName: FirebaseFirestore.CollectionReference;

  constructor() {
    this.db = new Firestore();
    this.collectionName = this.db.collection('student');
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const docRef = this.collectionName.doc();
    const data: Student = {
      id: docRef.id,
      ...createStudentDto,
      created_at: new Date() as any,
      updated_at: new Date() as any,
    };

    await docRef.set(data);
    return data;
  }

  async findAll(): Promise<Student[]> {
    const snapshot = await this.collectionName.get();
    return snapshot.docs.map((doc) => doc.data() as Student);
  }

  async findOne(id: string): Promise<Student> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return doc.data() as Student;
  }

  async findByMajor(major: string): Promise<Student[]> {
    if (!Object.values(UserMajor).includes(major as UserMajor)) {
      throw new BadRequestException(`Major ${major} is invalid`);
    }

    const snapshot = await this.collectionName
      .where('major', '==', major)
      .get();

    return snapshot.docs.map((doc) => doc.data() as Student);
  }

  async findStudentSessions(id: string): Promise<string[]> {
    const student = await this.findOne(id);
    return student.tutoring_session_ids ?? [];
  }

  async findStudentGroupSessions(id: string): Promise<string[]> {
    const student = await this.findOne(id);
    return student.group_tutoring_session_id ?? [];
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.findOne(id);
    const updated: Student = {
      ...student,
      ...updateStudentDto,
      updated_at: new Date() as any,
    };

    await this.collectionName.doc(id).set(updated);
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.collectionName.doc(id).delete();
  }
}
