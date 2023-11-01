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

    return NextResponse.json(
      { job: newJob, message: `Job ${newJob.title} adicionado com sucesso!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar o Job:", error);
    return NextResponse.json({ error: "Erro ao criar o Job" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get("id");
  try {
    if (!jobId) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const jobTitle = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
    });

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json(
      { message: `Job ${jobTitle?.title} excluído com sucesso!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir o Job" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestData = await request.json();

    if (!requestData) {
      return NextResponse.json(
        { error: "Job não encontrado" },
        { status: 404 }
      );
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: requestData.id,
      },
      data: requestData,
    });

    return NextResponse.json(
      {
        job: updatedJob,
        message: `Job ${updatedJob.title} atualizado com sucesso!`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar o Job" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const requestData = await request.json();

    if (!requestData) {
      return NextResponse.json(
        { error: "Job não encontrado" },
        { status: 404 }
      );
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: requestData.id,
      },
      data: requestData,
    });

    return NextResponse.json(
      {
        job: updatedJob,
        message: `Job ${updatedJob.title} atualizado com sucesso!`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar o Job" },
      { status: 500 }
    );
  }
}
