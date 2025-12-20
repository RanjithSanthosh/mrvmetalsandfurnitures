import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectToDatabase();
    // Update all categories that don't have the image field
    const result = await Category.updateMany(
      { image: { $exists: false } },
      { $set: { image: "" } }
    );
    return NextResponse.json({
      success: true,
      matched: result.matchedCount,
      modified: result.modifiedCount,
      message: "Migration completed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Migration failed", details: error },
      { status: 500 }
    );
  }
}
