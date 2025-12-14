
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  type: string;
  price: number;
  mrpPrice: number;
  images: string[];
  sku?: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  attributes?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    mrpPrice: { type: Number, required: true },
    images: { type: [String], required: true, validate: [(val: string[]) => val.length >= 1 && val.length <= 5, '{PATH} exceeds the limit of 5'] },
    sku: { type: String },
    stockStatus: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
    attributes: { type: Map, of: String },
  },
  { timestamps: true }
);

// Prevent overwrite on hot reload
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
