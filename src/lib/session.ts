"use server";

import { Session } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/headers";

export async function getSession(
  sessionId: string
): Promise<null | (Session & { quableInstance: { name: string } })> {
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { quableInstance: { select: { name: true } } },
  });
  if (!session) return null;

  const now = new Date();
  const createdAt = new Date(session.createdAt);
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // +24 hours in ms

  if (expiresAt < now) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  return session;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || "";
  return await getSession(sessionId);
}
