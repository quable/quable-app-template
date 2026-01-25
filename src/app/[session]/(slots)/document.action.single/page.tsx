import SessionDetails from "@/components/SessionDetails";
import { Typography } from "@mui/material";

export default function DocumentActionSinglePage() {
  return (
    <div className="page-layout">
      <Typography variant="h4">Document Action Single</Typography>
      <div className="content-wrapper">
        <SessionDetails />
      </div>
    </div>
  );
}
