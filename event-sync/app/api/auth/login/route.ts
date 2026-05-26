import { getJwtSecret } from '@/lib/config';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = getJwtSecret();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid connection" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid connection" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: "Connexion Successfull",
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
  }
}