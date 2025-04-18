import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTutoringSessionDto } from './dto/create_tutoring_session.dto';
import { UpdateTutoringSessionDto } from './dto/update_tutoring_session.dto';
import { TutoringSession } from './entities/tutoring_session.entity';
import { getFirestore } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TutoringSessionService {
  private db = getFirestore();
  private collectionName = this.db.collection('tutoring_session');

  async create(dto: CreateTutoringSessionDto): Promise<TutoringSession> {
    const start_time = new Date(
      typeof dto.start_time === 'string' ? dto.start_time : dto.start_time,
    );
    const end_time = new Date(
      typeof dto.end_time === 'string' ? dto.end_time : dto.end_time,
    );

    if (end_time <= start_time) {
      throw new BadRequestException('End time must be after start time');
    }

    const id = uuidv4();
    const session: TutoringSession = {
      id,
      ...dto,
      start_time: new Date(dto.start_time),
      end_time: new Date(dto.end_time),
      created_at: new Date(),
      updated_at: new Date(),
      tutor: { id: dto.tutor_id } as any,
      student: { id: dto.student_id } as any,
      topic: { id: dto.topicid } as any,
      platform: { id: dto.platformid } as any,
      reviews: [],
    };

    await this.collectionName.doc(id).set(session);
    return session;
  }

  async findAll(): Promise<TutoringSession[]> {
    const snapshot = await this.collectionName.get();
    return snapshot.docs.map((doc) => doc.data() as TutoringSession);
  }

  async findOne(id: string): Promise<TutoringSession> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutoring session with ID ${id} not found`);
    }
    return doc.data() as TutoringSession;
  }

  async findByTutor(tutor_id: string): Promise<TutoringSession[]> {
    const snapshot = await this.collectionName
      .where('tutor.id', '==', tutor_id)
      .get();
    return snapshot.docs.map((doc) => doc.data() as TutoringSession);
  }

  async findByStudent(student_id: string): Promise<TutoringSession[]> {
    const snapshot = await this.collectionName
      .where('student.id', '==', student_id)
      .get();
    return snapshot.docs.map((doc) => doc.data() as TutoringSession);
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<TutoringSession[]> {
    const snapshot = await this.collectionName
      .where('start_time', '>=', startDate)
      .where('start_time', '<=', endDate)
      .get();
    return snapshot.docs.map((doc) => doc.data() as TutoringSession);
  }

  async update(
    id: string,
    dto: UpdateTutoringSessionDto,
  ): Promise<TutoringSession> {
    const session = await this.findOne(id);

    if (dto.start_time || dto.end_time) {
      const start_time = dto.start_time
        ? new Date(dto.start_time)
        : session.start_time;
      const end_time = dto.end_time ? new Date(dto.end_time) : session.end_time;

      if (end_time <= start_time) {
        throw new BadRequestException('End time must be after start time');
      }

      session.start_time = start_time;
      session.end_time = end_time;
    }

    if (dto.tutor_id) session.tutor = { id: dto.tutor_id } as any;
    if (dto.student_id) session.student = { id: dto.student_id } as any;
    if (dto.topicid) session.topic = { id: dto.topicid } as any;
    if (dto.platformid) session.platform = { id: dto.platformid } as any;

    const updatedSession: TutoringSession = {
      ...session,
      ...dto,
      start_time: session.start_time, // <-- aseguramos que son Date
      end_time: session.end_time,
      updated_at: new Date(),
    };

    await this.collectionName.doc(id).set(updatedSession);
    return updatedSession;
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    cancellation_reason?: string,
  ): Promise<TutoringSession> {
    const session = await this.findOne(id);
    session.status = status;
    if (status === 'cancelled' && cancellation_reason) {
      session.cancellation_reason = cancellation_reason;
    }
    session.updated_at = new Date();

    await this.collectionName.doc(id).set(session);
    return session;
  }

  async remove(id: string): Promise<void> {
    await this.collectionName.doc(id).delete();
  }
}
