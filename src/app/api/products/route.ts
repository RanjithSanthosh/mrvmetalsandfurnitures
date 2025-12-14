
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search'); // Global search query

    await connectToDatabase();

    const query: any = {};

    if (category) {
      // Regex for case insensitive? Or exact. Spec implies selection, so exact is better usually.
      // But let's use exact for filters.
      query.category = category;
    }
    
    if (type) {
      query.type = type;
    }

    if (search) {
      const regex = { $regex: search, $options: 'i' };
      // Search title, sku, type, category
      query.$or = [
        { title: regex },
        { sku: regex },
        { type: regex },
        { category: regex },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
