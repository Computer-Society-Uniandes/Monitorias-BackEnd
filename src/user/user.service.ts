import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserMajor } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly db = admin.firestore();
  private readonly collectionName = this.db.collection('user');

  private mapDocToUser(doc: FirebaseFirestore.DocumentSnapshot): User {
    const data = doc.data();
    if (!data) {
      throw new Error(`No data found for user ${doc.id}`);
    }

    return {
      id: doc.id,
      name: data.name,
      bio: data.bio ?? null,
      phone_number: data.phone_number,
      major: data.major as UserMajor,
      created_at: data.created_at?.toDate() ?? null,
      updated_at: data.updated_at?.toDate() ?? null,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = {
      name: createUserDto.name,
      bio: createUserDto.bio ?? null,
      phone_number: createUserDto.phone_number,
      major: createUserDto.major,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    const ref = await this.collectionName.add(userData);
    const doc = await ref.get();
    return this.mapDocToUser(doc);
  }

  async findAll(): Promise<User[]> {
    const snap = await this.collectionName.get();
    return snap.docs.map((doc) => this.mapDocToUser(doc));
  }

  async findOne(id: string): Promise<User> {
    const doc = await this.collectionName.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapDocToUser(doc);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const ref = this.collectionName.doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedData = {
      name: updateUserDto.name,
      bio: updateUserDto.bio ?? null,
      phone_number: updateUserDto.phone_number,
      major: updateUserDto.major,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await ref.update(updatedData);

    const updatedDoc = await ref.get();
    return this.mapDocToUser(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const ref = this.collectionName.doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await ref.delete();
  }
}
