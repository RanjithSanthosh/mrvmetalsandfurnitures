
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic validation is handled by Mongoose Schema (required fields)
    
    await connectToDatabase();
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) { // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(error);
    return NextResponse.json({ error: (error as any).message || 'Failed to create product' }, { status: 500 });
  }
}
