"use server";

import { getCurrentSession } from "../session";
import prisma from "../prisma";
import { KeyValueModel, QuablePimClient } from "@quable/quable-pim-js";
import { getTranslations } from "next-intl/server";

export async function addKeyValue(
  key: string,
  value: string
): Promise<{ keyValue?: KeyValueModel | null; error?: string | null }> {
  const t = await getTranslations("common");
  try {
    const session = await getCurrentSession();
    if (!session) {
      throw new Error("Session not found");
    }

    const quableInstance = await prisma.quableInstance.findUniqueOrThrow({
      where: {
        id: session.quableInstanceId,
      },
    });

    const quablePimClint = new QuablePimClient({
      apiToken: quableInstance.token,
      instanceName: quableInstance.name,
    });

    const keyValue = await quablePimClint.API.REST.KeyValue.create({
      isProtected: false,
      isPublic: true,
      id: key,
      value: value,
    });

    return { keyValue, error: null };
  } catch (error) {
    if (typeof error === "object") {
      const err = error as {
        response?: { code?: number; message?: string };
      };

      if (err.response?.code === 400) {
        return { keyValue: null, error: err.response.message };
      }
    }
    return { keyValue: null, error: t("toasts.add_key_value_error") };
  }
}
