import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  private scheduleCollection = admin.firestore().collection('schedules');

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const docRef = await this.scheduleCollection.add({
      ...createScheduleDto,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() } as Schedule;
  }

  async findAll(): Promise<Schedule[]> {
    const snapshot = await this.scheduleCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Schedule[];
  }

  async findOne(id: string): Promise<Schedule> {
    const doc = await this.scheduleCollection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return { id: doc.id, ...doc.data() } as Schedule;
  }

  async findByTutor(tutor_id: string): Promise<Schedule> {
    const snapshot = await this.scheduleCollection
      .where('tutor_id', '==', tutor_id)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new NotFoundException(`Schedule for tutor ${tutor_id} not found`);
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Schedule;
  }

  async findAvailableSlots(params: {
    tutor_id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<Schedule> {
    const schedule = await this.findByTutor(params.tutor_id);

    // Fetch availabilities from 'availabilities' collection
    const availabilitySnapshot = await admin
      .firestore()
      .collection('availabilities')
      .where('schedule_id', '==', schedule.id)
      .where(
        'start_hour',
        '>=',
        admin.firestore.Timestamp.fromDate(params.startDate),
      )
      .where(
        'end_hour',
        '<=',
        admin.firestore.Timestamp.fromDate(params.endDate),
      )
      .where('blackout_date', '==', null)
      .get();

    if (availabilitySnapshot.empty) {
      throw new NotFoundException(
        `No available slots found for tutor ${params.tutor_id} in the specified time range`,
      );
    }

    const availabilities = availabilitySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      ...schedule,
      availabilities,
    } as Schedule;
  }

  async update(id: string, updateDto: UpdateScheduleDto): Promise<Schedule> {
    // Validations
    if (
      updateDto.min_booking_notice !== undefined &&
      updateDto.min_booking_notice < 0
    ) {
      throw new BadRequestException(
        'Minimum booking notice cannot be negative',
      );
    }

    if (
      updateDto.max_sessions_per_day !== undefined &&
      updateDto.max_sessions_per_day < 1
    ) {
      throw new BadRequestException(
        'Maximum sessions per day must be at least 1',
      );
    }

    if (updateDto.buffer_time !== undefined && updateDto.buffer_time < 0) {
      throw new BadRequestException('Buffer time cannot be negative');
    }

    await this.scheduleCollection.doc(id).update({
      ...updateDto,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await this.scheduleCollection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as Schedule;
  }

  async remove(id: string): Promise<void> {
    // Check for active availabilities
    const availabilitiesSnapshot = await admin
      .firestore()
      .collection('availabilities')
      .where('schedule_id', '==', id)
      .limit(1)
      .get();

    if (!availabilitiesSnapshot.empty) {
      throw new BadRequestException(
        'Cannot delete schedule with active availabilities',
      );
    }

    await this.scheduleCollection.doc(id).delete();
  }
}
