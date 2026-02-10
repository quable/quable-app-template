import SessionDetails from "@/components/SessionDetails";
import { Box, Typography } from "@mui/material";

export default function DocumentActionSinglePage() {
  return (
    <div className="page-layout">
      <Typography variant="h4">Document Action Single</Typography>
      <Box sx={{ height: "var(--q-space-500)" }} />
      <SessionDetails />
    </div>
  );
}
