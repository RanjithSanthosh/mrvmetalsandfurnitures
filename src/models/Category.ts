import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  types: string[];
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    types: { type: [String], default: [] },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent Mongoose model recompilation error in development
if (process.env.NODE_ENV === "development" && mongoose.models.Category) {
  delete mongoose.models.Category;
}

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
