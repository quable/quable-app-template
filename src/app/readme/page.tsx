import {
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Chip } from "@quable/ui";

const routes = [
  {
    route: "/",
    method: "GET",
    description:
      "Redirects to configuration or creates session (AppStore flow)",
  },
  {
    route: "/",
    method: "POST",
    description: "Slot interaction handler - creates session and returns URL",
  },
  {
    route: "/permission",
    method: "GET",
    description: "Returns app permissions scope from quable.app.yml",
  },
  {
    route: "/install",
    method: "POST",
    description: "Called when app is installed - stores instance credentials",
  },
  {
    route: "/readme",
    method: "GET",
    description: "Readme page (this page)",
  },
  {
    route: "/session-id/page",
    method: "GET",
    description: "Default page slot for a session",
  },
  {
    route: "/session-id/document.action.single",
    method: "GET",
    description: "Single action slot page",
  },
  {
    route: "/session-id/document.action.bulk",
    method: "GET",
    description: "Bulk action slot page",
  },
  {
    route: "/session-id/document.page.tab",
    method: "GET",
    description: "Page tab slot page",
  },
  {
    route: "/session-id/product",
    method: "GET",
    description: "Product page",
  },
];

export default function ReadmePage() {
  return (
    <div className="page-layout">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Readme
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Overview
            </Typography>
            <Typography variant="body-lg" sx={{ mb: 2 }}>
              This is a Quable PIM Platform application template built with
              Next.js 16 and the @quable/ui component library. It provides a
              foundation for building applications that integrate seamlessly
              with the Quable PIM ecosystem.
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              How it works
            </Typography>
            <Typography variant="body-lg" sx={{ mb: 2 }}>
              The app integrates with Quable PIM through various integration
              points called &quot;slots&quot;:
            </Typography>

            <Box sx={{ pl: 2, mb: 2 }}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body1" component="div">
                  <strong>Page slot:</strong> The main page view when accessing
                  the app from Quable PIM or slot interaction
                </Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body1" component="div">
                  <strong>Single action slot:</strong> The page displayed when
                  performing an action on a single document
                </Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body1" component="div">
                  <strong>Bulk action slot:</strong> The page displayed when
                  performing an action on multiple documents
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="div">
                  <strong>Page tab slot:</strong> The page displayed when
                  accessing a the app from document page tabs
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 1 }}>
              When a user accesses the app, a session is automatically created
              that stores user information, locale settings, and any selected
              document IDs. Sessions expire after 24 hours.
            </Typography>

            <Typography variant="body1">
              The app uses React Query for data fetching, Prisma with SQLite for
              database management, and supports internationalization (English
              and French).
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Features
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip label="Session-based user context" color="brand" />
              <Chip label="Quable PIM API integration" color="brand" />
              <Chip label="Multi-language support (EN/FR)" color="brand" />
              <Chip label="TypeScript for type safety" color="brand" />
              <Chip label="React Query for data fetching" color="brand" />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Available Routes
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                      Route
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "10%" }}>
                      Method
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routes.map((route, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                            color: "primary.main",
                          }}
                        >
                          {route.route}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={route.method}
                          color={
                            route.method === "GET"
                              ? "brand"
                              : route.method === "POST"
                                ? "success"
                                : "default"
                          }
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {route.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
