"use server";

import { QuablePimClient } from "@quable/quable-pim-js";
import prisma from "../prisma";
import { getCurrentSession } from "../session";

export async function getProducts(): Promise<
  { image: string | null; name: string; code: string; productType: string }[]
> {
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

    const products = await quablePimClint.API.REST.Document.getAll({});
    const formattedProducts = products.map((product) => {
      const productName = product.attributes[`${product.documentType.id}_name`];

      return {
        image: product.mainAssetThumbnailUrl,
        name: productName[session.dataLocale]
          ? productName[session.dataLocale]
          : product.id,
        code: product.id,
        productType: product.documentType.id,
        directUrl: `https://${quableInstance.name}.quable.com/#classification/product-new/${product.legacyId}/edit`,
      };
    });

    return formattedProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
