import { NextRequest, NextResponse } from "next/server";
import prisma from "../lib/prisma";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const applicationType = searchParams.get("applicationType");
    const quableInstanceName = searchParams.get("quableInstanceName");
    const interfaceLocale = searchParams.get("interfaceLocale");
    const dataLocale = searchParams.get("dataLocale");
    const userId = searchParams.get("userId");

    if (
      applicationType === "AppStore" &&
      quableInstanceName &&
      interfaceLocale &&
      dataLocale &&
      userId
    ) {
      const instanceData = await prisma.quableInstance.findUnique({
        where: { name: quableInstanceName },
      });

      if (!instanceData) {
        return NextResponse.json(
          { error: "Instance not found" },
          { status: 404 }
        );
      }

      const session = await prisma.session.create({
        data: {
          userId: parseInt(userId, 10),
          dataLocale: dataLocale,
          interfaceLocale: interfaceLocale,
          quableInstanceId: instanceData.id,
        },
      });

      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_APP_URL}/${session.id}/page`,
          request.url
        )
      );
    }

    return NextResponse.json({ message: "Service is running" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Service is down" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const slot = searchParams.get("slot");
    const { data } = body;
    if (!slot) {
      return NextResponse.json(
        { error: "Slot parameter is required" },
        { status: 400 }
      );
    }

    const instanceData = await prisma.quableInstance.findUnique({
      where: { name: data.quableInstanceName },
    });

    if (!instanceData) {
      return NextResponse.json(
        { error: "Instance not found" },
        { status: 404 }
      );
    }

    const session = await prisma.session.create({
      data: {
        userId: data.userId,
        dataLocale: data.dataLocale,
        interfaceLocale: data.interfaceLocale,
        documentIds: data.documentIds ?? [],
        quableInstanceId: instanceData.id,
      },
    });

    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${session.id}/${slot}`,
      err: 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating session" },
      { status: 500 }
    );
  }
}
