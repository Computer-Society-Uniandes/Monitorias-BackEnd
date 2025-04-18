import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateGroupTutoringSessionDto } from './dto/create-group-tutoring-session.dto';
import { GroupTutoringSession } from './entities/group_tutoring_session.entity';
import { UpdateGroupTutoringSessionDto } from './dto/update-group-tutoring-session.dto';

@Injectable()
export class GroupTutoringSessionService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName;

  constructor() {
    this.firestore = admin.firestore();
    this.collectionName = this.firestore.collection('group_tutoring_session');
  }

  private mapDocumentToGroupTutoringSession(
    doc: FirebaseFirestore.DocumentSnapshot,
  ): GroupTutoringSession {
    const data = doc.data();
    if (!data) {
      throw new Error(`Data for document ${doc.id} is missing.`);
    }

    return {
      id: doc.id,
      start_hour: data.start_hour,
      end_hour: data.end_hour,
      notes: data.notes,
      status: data.status,
      time_added: data.time_added,
      price: data.price,
      course_id: data.course_id,
      student_ids: data.student_ids || [],
      tutor_ids: data.tutor_ids || [],
    };
  }

  async create(
    createGroupTutoringSessionDto: CreateGroupTutoringSessionDto,
  ): Promise<GroupTutoringSession> {
    const groupTutoringSessionRef = this.collectionName.doc();

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
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await groupTutoringSessionRef.set(groupTutoringSessionData);

    return {
      id: groupTutoringSessionRef.id,
      ...groupTutoringSessionData,
    };
  }

  async findAll(): Promise<GroupTutoringSession[]> {
    const snapshot = await this.collectionName.get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) =>
      this.mapDocumentToGroupTutoringSession(doc),
    );
  }

  async findOne(id: string): Promise<GroupTutoringSession> {
    const doc = await this.collectionName.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    return this.mapDocumentToGroupTutoringSession(doc);
  }

  async update(
    id: string,
    updateGroupTutoringSessionDto: UpdateGroupTutoringSessionDto,
  ): Promise<GroupTutoringSession> {
    const groupTutoringSessionRef = this.collectionName.doc(id);
    const doc = await groupTutoringSessionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    const updatedData = {
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

    await groupTutoringSessionRef.update(updatedData);

    const updatedDoc = await groupTutoringSessionRef.get();
    return this.mapDocumentToGroupTutoringSession(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const groupTutoringSessionRef = this.collectionName.doc(id);
    const doc = await groupTutoringSessionRef.get();

    if (!doc.exists) {
      throw new NotFoundException(
        `Group tutoring session with ID ${id} not found`,
      );
    }

    await groupTutoringSessionRef.delete();
  }
}
