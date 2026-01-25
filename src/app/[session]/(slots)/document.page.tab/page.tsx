import SessionDetails from "@/components/SessionDetails";
import { Typography } from "@mui/material";

export default function DocumentPageTab() {
  return (
    <div className="page-layout">
      <Typography variant="h4">Document Page Tab</Typography>
      <div className="content-wrapper">
        <SessionDetails />
      </div>
    </div>
  );
}
