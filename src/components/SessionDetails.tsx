import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getCurrentSession } from "@/lib/session";

export default async function SessionDetails() {
  const session = await getCurrentSession();

  if (!session) {
    return <Typography variant="body1">No active session</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Property
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Value
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Session ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{session.id}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                User ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{session.userId}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Data locale
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{session.dataLocale}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Interface locale
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{session.interfaceLocale}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Quable instance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {session.quableInstance.name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Document IDs
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
              >
                {session.documentIds
                  ? JSON.stringify(session.documentIds, null, 2)
                  : "—"}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Created at
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {formatDate(session.createdAt)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                Updated at
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {formatDate(session.updatedAt)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formatDate(date: Date) {
  return date.toLocaleString();
}
