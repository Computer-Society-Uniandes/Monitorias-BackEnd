import { Injectable, NotFoundException } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topics.entity';

@Injectable()
export class TopicsService {
  private db: FirebaseFirestore.Firestore;
  private collectionName: FirebaseFirestore.CollectionReference;

  constructor() {
    this.db = new Firestore();
    this.collectionName = this.db.collection('topic');
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const docRef = this.collectionName.doc();
    const topic: Topic = {
      id: docRef.id,
      name: createTopicDto.name,
      description: createTopicDto.description,
      course_id: createTopicDto.course_id,
      tutoring_session_ids: createTopicDto.tutoring_session_ids || [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    await docRef.set(topic);
    return topic;
  }

  async findAll(): Promise<Topic[]> {
    const snapshot = await this.collectionName.get();
    return snapshot.docs.map((doc) => doc.data() as Topic);
  }

  async findOne(id: string): Promise<Topic> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return doc.data() as Topic;
  }

  async findByCourse(course_id: string): Promise<Topic[]> {
    const snapshot = await this.collectionName
      .where('course_id', '==', course_id)
      .get();

    return snapshot.docs.map((doc) => doc.data() as Topic);
  }

  async searchTopics(query: string): Promise<Topic[]> {
    const snapshot = await this.collectionName.get();
    return snapshot.docs
      .map((doc) => doc.data() as Topic)
      .filter(
        (topic) =>
          topic.name.toLowerCase().includes(query.toLowerCase()) ||
          topic.description.toLowerCase().includes(query.toLowerCase()),
      );
  }

  async findTopicSessions(id: string): Promise<Topic> {
    const topic = await this.findOne(id);

    if (
      !topic.tutoring_session_ids ||
      topic.tutoring_session_ids.length === 0
    ) {
      return topic;
    }

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const docRef = this.collectionName.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    const updated: Partial<Topic> = {
      ...updateTopicDto,
      updated_at: new Date(),
    };

    if (updateTopicDto.tutoring_session_ids) {
      updated.tutoring_session_ids = updateTopicDto.tutoring_session_ids;
    }

    await docRef.update(updated);
    const updatedDoc = await docRef.get();
    return updatedDoc.data() as Topic;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.collectionName.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    await docRef.delete();
  }
}
