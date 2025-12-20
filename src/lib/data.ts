import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function getCategories() {
  await connectToDatabase();
  // Return plain objects to avoid serialization issues in Next.js
  const categories = await Category.find({ isActive: true })
    .sort("name")
    .lean();
  return JSON.parse(JSON.stringify(categories));
}

export async function getAllCategoriesAdmin() {
  await connectToDatabase();
  const categories = await Category.find({}).sort("name").lean();
  return JSON.parse(JSON.stringify(categories));
}

export async function getProducts(filters: {
  category?: string;
  type?: string;
  search?: string;
  price_min?: string;
  price_max?: string;
}) {
  await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.price_min || filters.price_max) {
    query.price = {};
    if (filters.price_min) query.price.$gte = Number(filters.price_min);
    if (filters.price_max) query.price.$lte = Number(filters.price_max);
  }

  if (filters.search) {
    const regex = { $regex: filters.search, $options: "i" };
    query.$or = [
      { title: regex },
      { sku: regex },
      { type: regex },
      { category: regex },
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProductById(id: string) {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}
