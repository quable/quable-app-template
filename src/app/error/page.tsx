import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function ErrorPage() {
  const t = useTranslations("error");
  return (
    <div className="page-layout">
      <Typography variant="h4">Error</Typography>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        <Typography variant="h4">{t("title")}</Typography>
        <Box sx={{ height: "var(--q-space-500)" }} />
        <Typography variant="body-lg">{t("description")}</Typography>
      </Box>
    </div>
  );
}
