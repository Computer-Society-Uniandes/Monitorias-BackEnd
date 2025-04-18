import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserMajor } from './entities/user.entity';

@Injectable()
export class UserService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName = 'user';

  constructor() {
    this.firestore = admin.firestore();
  }

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
      created_at: data.created_at ? data.created_at.toDate() : null,
      updated_at: data.updated_at ? data.updated_at.toDate() : null,
    };
  }

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = {
      name: createUserDto.name,
      bio: createUserDto.bio ?? null,
      phone_number: createUserDto.phone_number,
      major: createUserDto.major,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await this.firestore
      .collection(this.collectionName)
      .add(userData);
    const doc = await docRef.get();
    return this.mapDocToUser(doc); // Retornamos el usuario con el ID generado
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    const snapshot = await this.firestore.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => this.mapDocToUser(doc)); // Mapeamos los documentos
  }

  // Obtener un solo usuario por ID
  async findOne(id: string): Promise<User> {
    const doc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();
    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapDocToUser(doc); // Retornamos el usuario con la data de Firestore
  }

  // Actualizar un usuario
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userRef = this.firestore.collection(this.collectionName).doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Actualizar solo los campos que están siendo modificados
    const updatedData = {
      name: updateUserDto.name,
      bio: updateUserDto.bio ?? null,
      phone_number: updateUserDto.phone_number,
      major: updateUserDto.major,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.update(updatedData);

    const updatedDoc = await userRef.get();
    return this.mapDocToUser(updatedDoc); // Retornamos el usuario actualizado
  }

  // Eliminar un usuario
  async remove(id: string): Promise<void> {
    const userRef = this.firestore.collection(this.collectionName).doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await userRef.delete(); // Eliminamos el documento de Firestore
  }
}
