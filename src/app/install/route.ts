import prisma from "@/lib/prisma";
import { QuablePimClient } from "@quable/quable-pim-js";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const payload = await request.json();
    const { quableInstanceName, quableAuthToken } = payload.data;

    const pimClient = new QuablePimClient({
      apiToken: quableAuthToken,
      instanceName: quableInstanceName,
    });
    await pimClient.API.REST.User.getAll({ limit: 1, type: "api" });

    await prisma.quableInstance.upsert({
      where: { name: quableInstanceName },
      create: { name: quableInstanceName, token: quableAuthToken },
      update: { name: quableInstanceName, token: quableAuthToken },
    });

    return NextResponse.json(
      { message: `QuableApp installed on ${quableInstanceName}.quable.com` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Installation error:", error);
    return NextResponse.json(
      {
        message: "Installation failed. Verify your credentials and try again.",
      },
      { status: 500 }
    );
  }
}
