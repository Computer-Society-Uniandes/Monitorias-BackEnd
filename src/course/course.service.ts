import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseComplexity } from './entities/course.entity';
@Injectable()
export class CourseService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName = 'courses';
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
      tutors: data.tutors, // Usamos IDs de los tutores
      topics: data.topics, // IDs de los topics
      group_tutoring_sessions: data.group_tutoring_sessions,
    };
  }
  constructor() {
    this.firestore = admin.firestore();
  }

  // Crear un curso
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    // Creamos una nueva referencia en la colección de cursos en Firestore
    const courseRef = this.firestore.collection(this.collectionName).doc();

    // Crear un objeto de curso con los datos del DTO
    const courseData: Course = {
      id: courseRef.id,
      name: createCourseDto.name,
      complexity: createCourseDto.complexity,
      base_price: createCourseDto.base_price,
      code: createCourseDto.code,
      tutors: createCourseDto.tutor_ids || [], // tutor_ids es opcional
      topics: [], // Asumimos que los topics serán añadidos más tarde
      group_tutoring_sessions: [], // Lo mismo para los group_tutoring_sessions
    };

    // Guardar el curso en Firestore
    await courseRef.set(courseData);

    // Devolver el curso con el ID generado por Firestore
    return courseData;
  }

  // Obtener todos los cursos
  async findAll(): Promise<Course[]> {
    const snapshot = await this.firestore.collection(this.collectionName).get();
    if (snapshot.empty) {
      return [];
    }

    // Mapear los documentos a los objetos de curso
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Course;
      return { id: doc.id, ...data };
    });
  }

  // Obtener un curso por ID
  async findOne(id: string): Promise<Course> {
    const courseDoc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Mapear el documento a un objeto de curso
    const course = courseDoc.data() as Course;
    return { id: courseDoc.id, ...course };
  }

  // Actualizar un curso
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseRef = this.firestore.collection(this.collectionName).doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    // Actualizar los campos del curso
    const updatedCourseData = {
      ...courseDoc.data(),
      ...updateCourseDto,
    };

    // Si hay nuevos tutores, los añadimos
    if (updateCourseDto.tutor_ids) {
      updatedCourseData.tutor_ids = updateCourseDto.tutor_ids;
    }

    await courseRef.update(updatedCourseData);

    return this.mapDocumentToCourse(await courseRef.get());
  }

  // Eliminar un curso
  async remove(id: string): Promise<void> {
    const courseRef = this.firestore.collection(this.collectionName).doc(id);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await courseRef.delete();
  }
}
