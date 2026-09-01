import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import connectToDatabase from '@/lib/mongodb';
import { Review } from '@/lib/models';

const REVIEWS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'reviews.json');

const DEFAULT_REVIEWS = [
  {
    id: "1",
    name: "Priya M.",
    rating: 5,
    text: "Absolutely stunning packaging and the candles smell divine. Gifted to my mother and she was over the moon!",
    comment: "Absolutely stunning packaging and the candles smell divine. Gifted to my mother and she was over the moon!",
    date: "Aug 28, 2026"
  },
  {
    id: "2",
    name: "Rahul S.",
    rating: 5,
    text: "The chocolates were SO good — melt in your mouth quality. Already ordered again for a wedding.",
    comment: "The chocolates were SO good — melt in your mouth quality. Already ordered again for a wedding.",
    date: "Aug 26, 2026"
  },
  {
    id: "3",
    name: "Ananya Sharma",
    rating: 5,
    text: "The scented candle bouquet looks breathtaking and smells incredible! Natural, fragrant and lasts forever. Best gifting brand in India!",
    comment: "The scented candle bouquet looks breathtaking and smells incredible! Natural, fragrant and lasts forever. Best gifting brand in India!",
    date: "Aug 20, 2026"
  }
];

// Fallback to local JSON if MongoDB is not configured
async function getReviewsFallback() {
  try {
    const data = await fs.readFile(REVIEWS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    try {
      await fs.mkdir(path.dirname(REVIEWS_FILE_PATH), { recursive: true });
      await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(DEFAULT_REVIEWS, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error creating reviews file:', e);
    }
    return DEFAULT_REVIEWS;
  }
}

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const reviews = await Review.find().sort({ timestamp: -1 });
      
      // Transform Mongoose doc to match frontend shape
      const formattedReviews = reviews.map(r => ({
        id: r._id.toString(),
        name: r.name,
        rating: r.rating,
        text: r.text,
        comment: r.text, // frontend uses comment or text
        date: r.createdAt
      }));
      
      return NextResponse.json(formattedReviews);
    }
  } catch (err) {
    console.error("MongoDB GET error, falling back to local JSON:", err);
  }

  const reviews = await getReviewsFallback();
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, text, comment } = body;

    const reviewText = (text || comment || '').trim();
    const reviewerName = (name || '').trim();
    const reviewRating = Number(rating) || 5;

    if (!reviewerName || !reviewText) {
      return NextResponse.json({ error: 'Name and review text are required' }, { status: 400 });
    }

    const newReviewData = {
      name: reviewerName,
      rating: Math.max(1, Math.min(5, reviewRating)),
      text: reviewText,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timestamp: new Date().toISOString()
    };

    if (process.env.MONGODB_URI) {
      try {
        await connectToDatabase();
        const reviewDoc = await Review.create(newReviewData);
        return NextResponse.json({
          id: reviewDoc._id.toString(),
          name: reviewDoc.name,
          rating: reviewDoc.rating,
          text: reviewDoc.text,
          comment: reviewDoc.text,
          date: reviewDoc.createdAt
        }, { status: 201 });
      } catch (err) {
        console.error("MongoDB POST error, falling back to local JSON:", err);
      }
    }

    // Fallback logic
    const reviews = await getReviewsFallback();
    const fallbackReview = {
      id: Date.now().toString(),
      name: reviewerName,
      rating: Math.max(1, Math.min(5, reviewRating)),
      text: reviewText,
      comment: reviewText,
      date: newReviewData.createdAt,
    };
    const updatedReviews = [fallbackReview, ...reviews];
    try {
      await fs.mkdir(path.dirname(REVIEWS_FILE_PATH), { recursive: true });
      await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(updatedReviews, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving review to disk:', err);
    }

    return NextResponse.json(fallbackReview, { status: 201 });
  } catch (error) {
    console.error('Failed to post review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Review id is required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      try {
        await connectToDatabase();
        await Review.findByIdAndDelete(id);
        const reviews = await Review.find().sort({ timestamp: -1 });
        const formattedReviews = reviews.map(r => ({
          id: r._id.toString(),
          name: r.name,
          rating: r.rating,
          text: r.text,
          comment: r.text,
          date: r.createdAt
        }));
        return NextResponse.json({ success: true, reviews: formattedReviews });
      } catch (err) {
        console.error("MongoDB DELETE error, falling back to local JSON:", err);
      }
    }

    const reviews = await getReviewsFallback();
    const filtered = reviews.filter((r: any) => r.id !== id);
    try {
      await fs.mkdir(path.dirname(REVIEWS_FILE_PATH), { recursive: true });
      await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving deleted review list:', err);
    }
    return NextResponse.json({ success: true, reviews: filtered });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
