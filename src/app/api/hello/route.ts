import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.job.findMany();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const newJob = await prisma.job.create({
      data: requestData,
    });

    return NextResponse.json({ job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o Job:", error);
    return NextResponse.json({ error: "Erro ao criar o Job" }, { status: 500 });
  }
}

