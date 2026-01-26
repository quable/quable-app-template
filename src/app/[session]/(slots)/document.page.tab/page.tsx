import SessionDetails from "@/components/SessionDetails";
import { Typography, Box } from "@mui/material";

export default function DocumentPageTab() {
  return (
    <div className="page-layout">
      <Typography variant="h4">Document Page Tab</Typography>
      <Box sx={{ height: "var(--q-space-500)" }} />
      <SessionDetails />
    </div>
  );
}
