import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  private firestore: FirebaseFirestore.Firestore;
  private collectionName = 'reviews';

  constructor() {
    this.firestore = admin.firestore();
  }

  private mapDocumentToReview(doc: FirebaseFirestore.DocumentSnapshot): Review {
    const data = doc.data();

    if (!data) {
      throw new Error(`No data found for document ${doc.id}`);
    }

    return {
      id: doc.id,
      date: data.date.toDate(),
      comment: data.comment,
      suggestions: data.suggestions,
      score: data.score,
      tutor_id: data.tutor_id,
      tutoring_session_id: data.tutoring_session_id,
    };
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const reviewRef = this.firestore.collection(this.collectionName).doc();

    const reviewData = {
      date: admin.firestore.Timestamp.fromDate(createReviewDto.date),
      comment: createReviewDto.comment,
      suggestions: createReviewDto.suggestions,
      score: createReviewDto.score,
      tutor_id: createReviewDto.tutor_id,
      tutoring_session_id: createReviewDto.tutoring_session_id,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await reviewRef.set(reviewData);

    return {
      id: reviewRef.id,
      ...createReviewDto,
    };
  }

  async findAll(): Promise<Review[]> {
    const snapshot = await this.firestore.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => this.mapDocumentToReview(doc));
  }

  async findOne(id: string): Promise<Review> {
    const doc = await this.firestore
      .collection(this.collectionName)
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.mapDocumentToReview(doc);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const reviewRef = this.firestore.collection(this.collectionName).doc(id);
    const doc = await reviewRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const updated_ata: Partial<Review> = {
      ...updateReviewDto,
    };

    if (updateReviewDto.date) {
      updated_ata.date = admin.firestore.Timestamp.fromDate(
        updateReviewDto.date,
      ) as any;
    }

    await reviewRef.update(updated_ata);

    const updatedDoc = await reviewRef.get();
    return this.mapDocumentToReview(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const reviewRef = this.firestore.collection(this.collectionName).doc(id);
    const doc = await reviewRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    await reviewRef.delete();
  }
}
