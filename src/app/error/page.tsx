import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("error");
  return (
    <div className="page-layout">
      <Typography variant="h4">Error</Typography>
      <div className="content-wrapper">
        <div className="text-center">
          <Typography variant="h4">{t("title")}</Typography>
          <Box className={"h-4"} />
          <Typography variant="body-lg">{t("description")}</Typography>
        </div>
      </div>
    </div>
  );
}
