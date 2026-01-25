import { Typography } from "@mui/material";
import { readFileSync } from "fs";
import Markdown from "react-markdown";

export default function ReadmePage() {
  const readmeContent = readFileSync("README.md", "utf8");
  return (
    <div className="page-layout">
      <Typography variant="h4">Readme</Typography>

      <div className="content-wrapper">
        <Markdown>{readmeContent}</Markdown>
      </div>
    </div>
  );
}
