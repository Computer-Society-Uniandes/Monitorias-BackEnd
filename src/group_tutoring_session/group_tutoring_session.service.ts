import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateGroupTutoringSessionDto } from './dto/create-group-tutoring-session.dto';
import { GroupTutoringSession } from './entities/group_tutoring_session.entity';
import { UpdateGroupTutoringSessionDto } from './dto/update-group-tutoring-session.dto';

@Injectable()
export class GroupTutoringSessionService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName = 'group_tutoring_sessions';

  constructor() {
    this.firestore = admin.firestore();
  }

  // Mapeo de documento Firestore a GroupTutoringSession
  private mapDocumentToGroupTutoringSession(
    doc: FirebaseFirestore.DocumentSnapshot,
  ): GroupTutoringSession {
    const data = doc.data();
    if (!data) {
      throw new Error(`Data for document ${doc.id} is missing.`);
    }

    return {
      id: doc.id,
      start_hour: data.start_hour, // Firestore Timestamp
      end_hour: data.end_hour, // Firestore Timestamp
      notes: data.notes,
      status: data.status,
      time_added: data.time_added,
      price: data.price,
      course_id: data.course_id,
      student_ids: data.student_ids || [],
      tutor_ids: data.tutor_ids || [],
    };
  }

  // Crear una nueva sesión
  async create(
    createGroupTutoringSessionDto: CreateGroupTutoringSessionDto,
  ): Promise<GroupTutoringSession> {
    const groupTutoringSessionRef = this.firestore
      .collection(this.collectionName)
      .doc();

    const groupTutoringSessionData = {
      start_hour: admin.firestore.Timestamp.fromDate(
        createGroupTutoringSessionDto.start_hour,
      ),
      end_hour: admin.firestore.Timestamp.fromDate(
        createGroupTutoringSessionDto.end_hour,
      ),
      notes: createGroupTutoringSessionDto.notes,
      status: createGroupTutoringSessionDto.status,
      time_added: createGroupTutoringSessionDto.time_added,
      price: createGroupTutoringSessionDto.price,
      course_id: createGroupTutoringSessionDto.course_id,
      student_ids: createGroupTutoringSessionDto.student_ids || [],
      tutor_ids: createGroupTutoringSessionDto.tutor_ids || [],
      created_at: admin.firestore.FieldValue.serverTimestamp(), // Timestamp
    };

    // Guardar en Firestore
    await groupTutoringSessionRef.set(groupTutoringSessionData);

    return {
      id: groupTutoringSessionRef.id,
      ...groupTutoringSessionData,
    };
  }

  // Obtener todas las sesiones de tutoría grupales
  async findAll(): Promise<GroupTutoringSession[]> {
    const snapshot = await this.firestore.collection(this.collectionName).get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) =>
      this.mapDocumentToGroupTutoringSession(doc),
    );
  }

  // Obtener una sesión de tutoría grupal por ID
  async findOne(id: string): Promise<GroupTutoringSession> {
    const doc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    return this.mapDocumentToGroupTutoringSession(doc);
  }

  // Actualizar una sesión de tutoría grupal
  async update(
    id: string,
    updateGroupTutoringSessionDto: UpdateGroupTutoringSessionDto,
  ): Promise<GroupTutoringSession> {
    const groupTutoringSessionRef = this.firestore
      .collection(this.collectionName)
      .doc(id);
    const doc = await groupTutoringSessionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    const updated_ata = {
      ...updateGroupTutoringSessionDto,
      start_hour: admin.firestore.Timestamp.fromDate(
        updateGroupTutoringSessionDto.start_hour,
      ),
      end_hour: admin.firestore.Timestamp.fromDate(
        updateGroupTutoringSessionDto.end_hour,
      ),
      student_ids: updateGroupTutoringSessionDto.student_ids || [],
      tutor_ids: updateGroupTutoringSessionDto.tutor_ids || [],
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await groupTutoringSessionRef.update(updated_ata);

    const updatedDoc = await groupTutoringSessionRef.get();
    return this.mapDocumentToGroupTutoringSession(updatedDoc);
  }

  // Eliminar una sesión de tutoría grupal
  async remove(id: string): Promise<void> {
    const groupTutoringSessionRef = this.firestore
      .collection(this.collectionName)
      .doc(id);
    const doc = await groupTutoringSessionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    await groupTutoringSessionRef.delete();
  }
}
