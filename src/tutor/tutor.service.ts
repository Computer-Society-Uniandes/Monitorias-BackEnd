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
  private collectionName = this.firestore.collection('tutor');
  private availabilities = this.firestore.collection('availabilities');

  private mapDocToTutor(doc: FirebaseFirestore.DocumentSnapshot): Tutor {
    const data = doc.data();
    if (!data) throw new Error(`No data for tutor ${doc.id}`);
    return { id: doc.id, ...data } as Tutor;
  }

  async create(dto: CreateTutorDto): Promise<Tutor> {
    if (!dto.school_email.endsWith('.edu.co')) {
      throw new BadRequestException('School email must end with .edu.co');
    }
    const existing = await this.collectionName
      .where('school_email', '==', dto.school_email)
      .limit(1)
      .get();
    if (!existing.empty) {
      throw new BadRequestException('Tutor with this email already exists');
    }

    const ref = this.collectionName.doc();
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

  async findAll(params?: {
    search?: string;
    course_id?: string;
    minRating?: number;
    minExperience?: number;
  }): Promise<Tutor[]> {
    let query: FirebaseFirestore.Query = this.collectionName;

    if (params?.course_id) {
      query = query.where('course_ids', 'array-contains', params.course_id);
    }
    if (params?.minExperience !== undefined) {
      query = query.where('experience', '>=', params.minExperience);
    }

    const snap = await query.get();
    let collectionName = snap.docs.map((d) => this.mapDocToTutor(d));

    if (params?.search) {
      const q = params.search.toLowerCase();
      collectionName = collectionName.filter(
        (t) =>
          t.first_name.toLowerCase().includes(q) ||
          t.last_name.toLowerCase().includes(q),
      );
    }
    if (params?.minRating !== undefined) {
      collectionName = collectionName.filter(
        (t) => (t as any).avgRating >= params.minRating,
      );
    }

    return collectionName;
  }

  async findOne(id: string): Promise<Tutor> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutor with ID ${id} not found`);
    }
    return this.mapDocToTutor(doc);
  }

  async findByEmail(email: string): Promise<Tutor> {
    const snap = await this.collectionName
      .where('school_email', '==', email)
      .limit(1)
      .get();
    if (snap.empty) {
      throw new NotFoundException(`Tutor with email ${email} not found`);
    }
    return this.mapDocToTutor(snap.docs[0]);
  }

  async findByCourse(course_id: string): Promise<Tutor[]> {
    const snap = await this.collectionName
      .where('course_ids', 'array-contains', course_id)
      .get();
    return snap.docs.map((d) => this.mapDocToTutor(d));
  }

  async update(id: string, dto: UpdateTutorDto): Promise<Tutor> {
    if (dto.school_email && !dto.school_email.endsWith('.edu.co')) {
      throw new BadRequestException('School email must end with .edu.co');
    }
    if (dto.school_email) {
      const dup = await this.collectionName
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

    await this.collectionName.doc(id).update(updated_ata);
    const updated = await this.collectionName.doc(id).get();
    return this.mapDocToTutor(updated);
  }

  async remove(id: string): Promise<void> {
    await this.collectionName.doc(id).delete();
  }

  async updateRating(id: string, newRating: number): Promise<Tutor> {
    if (newRating < 0 || newRating > 5) {
      throw new BadRequestException('Rating must be between 0 and 5');
    }
    await this.collectionName.doc(id).update({ avgRating: newRating });
    const doc = await this.collectionName.doc(id).get();
    return this.mapDocToTutor(doc);
  }

  async findByFilters(filters: {
    name?: string;
    major?: string;
    course_ids?: string[];
    minExperience?: number;
    maxCredits?: number;
    hasAvailability?: boolean;
  }): Promise<Tutor[]> {
    let query: FirebaseFirestore.Query = this.collectionName;

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
    let collectionName = snap.docs.map((d) => this.mapDocToTutor(d));

    if (filters.name) {
      const q = filters.name.toLowerCase();
      collectionName = collectionName.filter(
        (t) =>
          t.first_name.toLowerCase().includes(q) ||
          t.last_name.toLowerCase().includes(q),
      );
    }
    if (filters.major) {
      collectionName = collectionName.filter(
        (t) => (t as any).major === filters.major,
      );
    }
    if (filters.hasAvailability) {
      collectionName = collectionName.filter(
        (t) => (t.availability_ids ?? []).length > 0,
      );
    }

    return collectionName;
  }

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
    query = query.where('blackout_date', '==', null);

    const availSnap = await query.get();
    const tutor_ids = Array.from(
      new Set(availSnap.docs.map((d) => d.data().tutor_id)),
    );
    if (!tutor_ids.length)
      throw new NotFoundException('No collectionName found');

    const collectionNameSnap = await this.collectionName
      .where('id', 'in', tutor_ids)
      .get();
    return collectionNameSnap.docs.map((d) => this.mapDocToTutor(d));
  }

  async findByTutorCriteria(criteria: {
    experience?: number;
    credits?: number;
    major?: string;
    course_ids?: string[];
    minRating?: number;
  }): Promise<Tutor[]> {
    let collectionName = await this.findByFilters(criteria);
    if (criteria.minRating !== undefined) {
      collectionName = collectionName.filter(
        (t) => (t as any).avgRating >= criteria.minRating,
      );
    }
    return collectionName;
  }
}
