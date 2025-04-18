import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MajorService {
  private db = getFirestore();
  private collection = this.db.collection('major');

  async create(dto: CreateMajorDto): Promise<Major> {
    const id = uuidv4();
    const now = new Date();

    const major: Major = {
      id,
      ...dto,
      created_at: now,
      updated_at: now,
      courses: dto.courses || [],
    };

    await this.collection.doc(id).set(major);
    return major;
  }

  async findAll(): Promise<Major[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as Major);
  }

  async findOne(id: string): Promise<Major> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Major with ID ${id} not found`);
    }
    return doc.data() as Major;
  }

  async update(id: string, dto: UpdateMajorDto): Promise<Major> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Major with ID ${id} not found`);
    }

    const updatedMajor: Major = {
      ...(doc.data() as Major),
      ...dto,
      updated_at: new Date(),
    };

    await this.collection.doc(id).set(updatedMajor);
    return updatedMajor;
  }

  async remove(id: string): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Major with ID ${id} not found`);
    }

    await this.collection.doc(id).delete();
  }
}
