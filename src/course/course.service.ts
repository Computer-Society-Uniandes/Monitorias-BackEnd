import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseComplexity } from './entities/course.entity';

@Injectable()
export class CourseService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName;

  constructor() {
    this.firestore = admin.firestore();
    this.collectionName = this.firestore.collection('course');
  }

  private mapDocumentToCourse(doc: FirebaseFirestore.DocumentSnapshot): Course {
    const data = doc.data();

    if (!data) {
      throw new Error(`Data for document ${doc.id} is missing.`);
    }

    return {
      id: doc.id,
      name: data.name,
      complexity: data.complexity || CourseComplexity,
      base_price: data.base_price,
      code: data.code,
      tutors: data.tutors,
      topics: data.topics,
      group_tutoring_sessions: data.group_tutoring_sessions,
    };
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const courseRef = this.collectionName.doc();

    const courseData: Course = {
      id: courseRef.id,
      name: createCourseDto.name,
      complexity: createCourseDto.complexity,
      base_price: createCourseDto.base_price,
      code: createCourseDto.code,
      tutors: createCourseDto.tutor_ids || [],
      topics: [],
      group_tutoring_sessions: [],
    };

    await courseRef.set(courseData);

    return courseData;
  }

  async findAll(): Promise<Course[]> {
    const snapshot = await this.collectionName.get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Course;
      return { id: doc.id, ...data };
    });
  }

  async findOne(id: string): Promise<Course> {
    const courseDoc = await this.collectionName.doc(id).get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    const course = courseDoc.data() as Course;
    return { id: courseDoc.id, ...course };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseRef = this.collectionName.doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    const updatedCourseData = {
      ...courseDoc.data(),
      ...updateCourseDto,
    };

    if (updateCourseDto.tutor_ids) {
      updatedCourseData.tutor_ids = updateCourseDto.tutor_ids;
    }

    await courseRef.update(updatedCourseData);

    return this.mapDocumentToCourse(await courseRef.get());
  }

  async remove(id: string): Promise<void> {
    const courseRef = this.collectionName.doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await courseRef.delete();
  }
}
