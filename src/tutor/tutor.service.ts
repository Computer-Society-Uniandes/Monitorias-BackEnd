import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';

@Injectable()
export class TutorService {
  private firestore = admin.firestore();
  private tutors = this.firestore.collection('tutors');
  private availabilities = this.firestore.collection('availabilities');

  private mapDocToTutor(doc: FirebaseFirestore.DocumentSnapshot): Tutor {
    const data = doc.data();
    if (!data) throw new Error(`No data for tutor ${doc.id}`);
    return { id: doc.id, ...data } as Tutor;
  }

  // Crear un tutor
  async create(dto: CreateTutorDto): Promise<Tutor> {
    if (!dto.school_email.endsWith('.edu.co')) {
      throw new BadRequestException('School email must end with .edu.co');
    }
    // Validar unicidad de email
    const existing = await this.tutors
      .where('school_email', '==', dto.school_email)
      .limit(1)
      .get();
    if (!existing.empty) {
      throw new BadRequestException('Tutor with this email already exists');
    }

    const ref = this.tutors.doc();
    const tutor: Tutor = {
      id: ref.id,
      first_name: dto.first_name,
      last_name: dto.last_name,
      school_email: dto.school_email,
      phone_number: dto.phone_number,
      bio: dto.bio || '',
      experience: 0,
      credits: 0,
      experience_description: '',
      course_ids: dto.course_ids || [],
      availability_ids: dto.availability_ids || [],
      schedule_id: null,
      tutoring_session_ids: [],
      group_tutoring_session_id: [],
      review_ids: [],
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await ref.set(tutor);
    return tutor;
  }

  // Obtener todos los tutores con filtros básicos
  async findAll(params?: {
    search?: string;
    course_id?: string;
    minRating?: number;
    minExperience?: number;
  }): Promise<Tutor[]> {
    let query: FirebaseFirestore.Query = this.tutors;

    if (params?.course_id) {
      query = query.where('course_ids', 'array-contains', params.course_id);
    }
    if (params?.minExperience !== undefined) {
      query = query.where('experience', '>=', params.minExperience);
    }

    const snap = await query.get();
    let tutors = snap.docs.map((d) => this.mapDocToTutor(d));

    // Filtrado en memoria para búsquedas por nombre y rating
    if (params?.search) {
      const q = params.search.toLowerCase();
      tutors = tutors.filter(
        (t) =>
          t.first_name.toLowerCase().includes(q) ||
          t.last_name.toLowerCase().includes(q),
      );
    }
    if (params?.minRating !== undefined) {
      // Si guardas avgRating en el doc, úsalo. Aquí asumimos que existe.
      tutors = tutors.filter((t) => (t as any).avgRating >= params.minRating);
    }

    return tutors;
  }

  // Obtener un tutor por ID
  async findOne(id: string): Promise<Tutor> {
    const doc = await this.tutors.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutor with ID ${id} not found`);
    }
    return this.mapDocToTutor(doc);
  }

  // Buscar tutor por email
  async findByEmail(email: string): Promise<Tutor> {
    const snap = await this.tutors
      .where('school_email', '==', email)
      .limit(1)
      .get();
    if (snap.empty) {
      throw new NotFoundException(`Tutor with email ${email} not found`);
    }
    return this.mapDocToTutor(snap.docs[0]);
  }

  // Tutores de un curso específico
  async findByCourse(course_id: string): Promise<Tutor[]> {
    const snap = await this.tutors
      .where('course_ids', 'array-contains', course_id)
      .get();
    return snap.docs.map((d) => this.mapDocToTutor(d));
  }

  // Actualizar tutor
  async update(id: string, dto: UpdateTutorDto): Promise<Tutor> {
    if (dto.school_email && !dto.school_email.endsWith('.edu.co')) {
      throw new BadRequestException('School email must end with .edu.co');
    }
    if (dto.school_email) {
      // Validar unicidad
      const dup = await this.tutors
        .where('school_email', '==', dto.school_email)
        .limit(1)
        .get();
      if (!dup.empty && dup.docs[0].id !== id) {
        throw new BadRequestException('Email already in use by another tutor');
      }
    }

    const updated_ata: Partial<Tutor> = {
      ...dto,
    };
    if (dto.course_ids) updated_ata.course_ids = dto.course_ids;
    if (dto.availability_ids)
      updated_ata.availability_ids = dto.availability_ids;

    await this.tutors.doc(id).update(updated_ata);
    const updated = await this.tutors.doc(id).get();
    return this.mapDocToTutor(updated);
  }

  // Eliminar tutor
  async remove(id: string): Promise<void> {
    // Si quieres prohibir la eliminación con sesiones activas, revisa tutoring_session_ids
    await this.tutors.doc(id).delete();
  }

  // Actualizar rating (si guardas avgRating)
  async updateRating(id: string, newRating: number): Promise<Tutor> {
    if (newRating < 0 || newRating > 5) {
      throw new BadRequestException('Rating must be between 0 and 5');
    }
    await this.tutors.doc(id).update({ avgRating: newRating });
    const doc = await this.tutors.doc(id).get();
    return this.mapDocToTutor(doc);
  }

  // Filtros complejos
  async findByFilters(filters: {
    name?: string;
    major?: string;
    course_ids?: string[];
    minExperience?: number;
    maxCredits?: number;
    hasAvailability?: boolean;
  }): Promise<Tutor[]> {
    let query: FirebaseFirestore.Query = this.tutors;

    if (filters.course_ids?.length) {
      query = query.where(
        'course_ids',
        'array-contains-any',
        filters.course_ids,
      );
    }
    if (filters.minExperience !== undefined) {
      query = query.where('experience', '>=', filters.minExperience);
    }
    if (filters.maxCredits !== undefined) {
      query = query.where('credits', '<=', filters.maxCredits);
    }

    const snap = await query.get();
    let tutors = snap.docs.map((d) => this.mapDocToTutor(d));

    if (filters.name) {
      const q = filters.name.toLowerCase();
      tutors = tutors.filter(
        (t) =>
          t.first_name.toLowerCase().includes(q) ||
          t.last_name.toLowerCase().includes(q),
      );
    }
    if (filters.major) {
      tutors = tutors.filter((t) => (t as any).major === filters.major);
    }
    if (filters.hasAvailability) {
      tutors = tutors.filter((t) => (t.availability_ids ?? []).length > 0);
    }

    return tutors;
  }

  // Buscar tutores con disponibilidad según criterios
  async findByAvailability(filters: {
    weekday?: string;
    start_time?: Date;
    end_time?: Date;
    recurrence?: string;
  }): Promise<Tutor[]> {
    let query = this.availabilities as FirebaseFirestore.Query;

    if (filters.weekday) {
      query = query.where('weekday', '==', filters.weekday);
    }
    if (filters.start_time) {
      query = query.where(
        'start_hour',
        '<=',
        admin.firestore.Timestamp.fromDate(filters.start_time),
      );
    }
    if (filters.end_time) {
      query = query.where(
        'end_hour',
        '>=',
        admin.firestore.Timestamp.fromDate(filters.end_time),
      );
    }
    if (filters.recurrence) {
      query = query.where('recurrence', '==', filters.recurrence);
    }
    // Solo slots activos (sin blackout_date)
    query = query.where('blackout_date', '==', null);

    const availSnap = await query.get();
    const tutor_ids = Array.from(
      new Set(availSnap.docs.map((d) => d.data().tutor_id)),
    );
    if (!tutor_ids.length) throw new NotFoundException('No tutors found');

    // Obtener los tutores correspondientes
    const tutorsSnap = await this.tutors.where('id', 'in', tutor_ids).get();
    return tutorsSnap.docs.map((d) => this.mapDocToTutor(d));
  }

  // Criterios combinados (ejemplo)
  async findByTutorCriteria(criteria: {
    experience?: number;
    credits?: number;
    major?: string;
    course_ids?: string[];
    minRating?: number;
  }): Promise<Tutor[]> {
    // Reutilizamos findByFilters y luego filtramos rating
    let tutors = await this.findByFilters(criteria);
    if (criteria.minRating !== undefined) {
      tutors = tutors.filter((t) => (t as any).avgRating >= criteria.minRating);
    }
    return tutors;
  }
}
