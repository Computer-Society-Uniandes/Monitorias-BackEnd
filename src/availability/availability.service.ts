import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import {
  Availability,
  Recurrence,
  Weekday,
} from './entities/availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName = 'availabilities';

  constructor() {
    this.firestore = admin.firestore();
  }

  private mapDocumentToAvailability(
    doc: FirebaseFirestore.DocumentSnapshot,
  ): Availability {
    const data = doc.data();

    if (!data) {
      throw new Error(`Data for document ${doc.id} is missing.`);
    }

    return {
      id: doc.id,
      start_hour: data.start_hour.toDate(),
      end_hour: data.end_hour.toDate(),
      blackout_date: data.blackout_date?.toDate() || null,
      recurrence: data.recurrence || Recurrence.NEVER,
      weekday: data.weekday || Weekday.SUNDAY,
      tutor_id: data.tutor_id,
      schedule_id: data.schedule_id,
    };
  }

  async create(
    createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    const { tutor_id, schedule_id } = createAvailabilityDto;

    // Validar existencia del tutor
    const tutorDoc = await this.firestore
      .collection('tutors')
      .doc(tutor_id)
      .get();
    if (!tutorDoc.exists) {
      throw new NotFoundException(`Tutor with ID ${tutor_id} not found`);
    }

    // Validar existencia del schedule
    const scheduleDoc = await this.firestore
      .collection('schedules')
      .doc(schedule_id)
      .get();
    if (!scheduleDoc.exists) {
      throw new NotFoundException(`Schedule with ID ${schedule_id} not found`);
    }

    const availabilityRef = this.firestore
      .collection(this.collectionName)
      .doc();

    const availabilityData = {
      start_hour: admin.firestore.Timestamp.fromDate(
        createAvailabilityDto.start_hour,
      ),
      end_hour: admin.firestore.Timestamp.fromDate(
        createAvailabilityDto.end_hour,
      ),
      blackout_date: createAvailabilityDto.blackout_date
        ? admin.firestore.Timestamp.fromDate(
            createAvailabilityDto.blackout_date,
          )
        : null,
      recurrence: createAvailabilityDto.recurrence || Recurrence.NEVER,
      weekday: createAvailabilityDto.weekday || Weekday.SUNDAY,
      tutor_id,
      schedule_id,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await availabilityRef.set(availabilityData);

    return {
      id: availabilityRef.id,
      ...createAvailabilityDto,
    };
  }

  async findAll(): Promise<Availability[]> {
    const snapshot = await this.firestore.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => this.mapDocumentToAvailability(doc));
  }

  async findOne(id: string): Promise<Availability> {
    const doc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return this.mapDocumentToAvailability(doc);
  }

  async update(
    id: string,
    updateAvailabilityDto: UpdateAvailabilityDto,
  ): Promise<Availability> {
    const availabilityRef = this.firestore
      .collection(this.collectionName)
      .doc(id);

    const doc = await availabilityRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    // 🔧 Crear objeto que usaremos para actualizar en Firestore
    const updated_ata: Record<string, any> = {
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (updateAvailabilityDto.start_hour) {
      updated_ata.start_hour = admin.firestore.Timestamp.fromDate(
        updateAvailabilityDto.start_hour,
      );
    }

    if (updateAvailabilityDto.end_hour) {
      updated_ata.end_hour = admin.firestore.Timestamp.fromDate(
        updateAvailabilityDto.end_hour,
      );
    }

    if (updateAvailabilityDto.blackout_date) {
      updated_ata.blackout_date = admin.firestore.Timestamp.fromDate(
        updateAvailabilityDto.blackout_date,
      );
    }

    if (updateAvailabilityDto.recurrence) {
      updated_ata.recurrence = updateAvailabilityDto.recurrence;
    }

    if (updateAvailabilityDto.weekday) {
      updated_ata.weekday = updateAvailabilityDto.weekday;
    }

    if (updateAvailabilityDto.tutor_id) {
      updated_ata.tutor_id = updateAvailabilityDto.tutor_id;
    }

    if (updateAvailabilityDto.schedule_id) {
      updated_ata.schedule_id = updateAvailabilityDto.schedule_id;
    }

    // ✨ Actualizamos
    await availabilityRef.update(updated_ata);

    const updatedDoc = await availabilityRef.get();
    return this.mapDocumentToAvailability(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const doc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();
    if (!doc.exists) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    await this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
