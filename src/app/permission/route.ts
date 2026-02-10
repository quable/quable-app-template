import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import * as yaml from "js-yaml";
import { join } from "path";

interface QuableConfig {
  application_type: string;
  quable_pim_scope: string[];
}

export async function GET(): Promise<NextResponse> {
  try {
    const filePath = join(process.cwd(), "quable.app.yml");
    const yamlContent = await readFile(filePath, "utf8");
    const config = yaml.load(yamlContent) as QuableConfig;

    return NextResponse.json(config.quable_pim_scope);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
