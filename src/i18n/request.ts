import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED_LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const sessionLocale = cookieStore.get("locale")?.value;
  const locale = sessionLocale?.split("-")[0] ?? DEFAULT_LOCALE;

  const selectedLocale = SUPPORTED_LOCALES.includes(locale)
    ? locale
    : DEFAULT_LOCALE;

  const messages = (await import(`../../translations/${selectedLocale}.json`))
    .default;

  return { locale: selectedLocale, messages };
});
