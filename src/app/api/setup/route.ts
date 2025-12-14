
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectToDatabase();
    
    const count = await AdminUser.countDocuments();
    if (count > 0) {
      return NextResponse.json({ error: 'Admin user already exists' }, { status: 400 });
    }

    // Create default admin
    const passwordHash = await bcrypt.hash('admin123', 10);
    await AdminUser.create({
      userId: 'admin',
      passwordHash: passwordHash
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin created with credentials: userId="admin", password="admin123". Please change password immediately.' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}
