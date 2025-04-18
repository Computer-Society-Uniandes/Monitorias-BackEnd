import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateTutoringPlatformDto } from './dto/create_tutoring_platform.dto';
import { UpdateTutoringPlatformDto } from './dto/update_tutoring_platform.dto';
import { TutoringPlatform } from './entities/tutoring_platform.entity';

@Injectable()
export class TutoringPlatformsService {
  private readonly db = admin.firestore();
  private readonly collectionName = this.db.collection('tutoring_platform');

  private mapDocToTutoringPlatform(
    doc: FirebaseFirestore.DocumentSnapshot,
  ): TutoringPlatform {
    const data = doc.data();
    if (!data) {
      throw new Error(`No data found for platform ${doc.id}`);
    }
    return {
      id: doc.id,
      name: data.name,
      url: data.url,
      description: data.description ?? null,
      is_active: data.is_active ?? true,
      instructions: data.instructions ?? null,
      tutoring_sessions: data.tutoring_sessions ?? [],
      group_tutoring_sessions: data.group_tutoring_sessions ?? [],
    };
  }

  async create(dto: CreateTutoringPlatformDto): Promise<TutoringPlatform> {
    const exists = await this.collectionName
      .where('name', '==', dto.name)
      .limit(1)
      .get();
    if (!exists.empty) {
      throw new ConflictException('Platform name already exists');
    }

    const data = {
      name: dto.name,
      url: dto.url,
      description: dto.description ?? null,
      is_active: dto.is_active ?? true,
      instructions: dto.instructions ?? null,
      tutoring_sessions: [] as any[],
      group_tutoring_sessions: [] as any[],
    };

    const ref = await this.collectionName.add(data);
    const doc = await ref.get();
    return this.mapDocToTutoringPlatform(doc);
  }

  async findAll(): Promise<TutoringPlatform[]> {
    const snap = await this.collectionName.get();
    return snap.docs.map((doc) => this.mapDocToTutoringPlatform(doc));
  }

  async findOne(id: string): Promise<TutoringPlatform> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutoring platform with ID ${id} not found`);
    }
    return this.mapDocToTutoringPlatform(doc);
  }

  async findByName(name: string): Promise<TutoringPlatform> {
    const snap = await this.collectionName
      .where('name', '==', name)
      .limit(1)
      .get();
    if (snap.empty) {
      throw new NotFoundException(
        `Tutoring platform with name ${name} not found`,
      );
    }
    return this.mapDocToTutoringPlatform(snap.docs[0]);
  }

  async findActive(): Promise<TutoringPlatform[]> {
    const snap = await this.collectionName.where('is_active', '==', true).get();
    return snap.docs.map((doc) => this.mapDocToTutoringPlatform(doc));
  }

  async update(
    id: string,
    dto: UpdateTutoringPlatformDto,
  ): Promise<TutoringPlatform> {
    const ref = this.collectionName.doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutoring platform with ID ${id} not found`);
    }

    const updateData: Partial<TutoringPlatform> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.url !== undefined) updateData.url = dto.url;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.is_active !== undefined) updateData.is_active = dto.is_active;
    if (dto.instructions !== undefined)
      updateData.instructions = dto.instructions;

    await ref.update(updateData);
    const updatedDoc = await ref.get();
    return this.mapDocToTutoringPlatform(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const ref = this.collectionName.doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutoring platform with ID ${id} not found`);
    }
    await ref.delete();
  }

  async toggleActive(id: string): Promise<TutoringPlatform> {
    const ref = this.collectionName.doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      throw new NotFoundException(`Tutoring platform with ID ${id} not found`);
    }

    const current = this.mapDocToTutoringPlatform(doc);
    await ref.update({ is_active: !current.is_active });
    const updatedDoc = await ref.get();
    return this.mapDocToTutoringPlatform(updatedDoc);
  }
}
