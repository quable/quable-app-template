'use client'

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Button } from '@quable/ui'
import { useTranslation } from 'react-i18next'

const apiEndpoints = [
  {
    method: 'GET',
    path: '/permission',
    description: 'Returns app permissions scope (from quable.app.yml)',
    example: 'curl http://localhost:4000/permission',
  },
  {
    method: 'POST',
    path: '/install',
    description: 'Called when the app is installed on a Quable instance',
    example:
      'curl -X POST "http://localhost:4000/install?quableInstanceName=demo&interfaceLocale=en&dataLocale=fr_FR"',
  },
  {
    method: 'POST',
    path: '/?slot=x',
    description: 'Handles slot interactions (single action, bulk action, page tab)',
    example: `curl -X POST "http://localhost:4000/?slot=document.action.single" \\
  -H "Content-Type: application/json" \\
  -d '{"instance":{"name":"demo"},"user":{"email":"test@test.com","admin":true},"object":{"type":"product","ids":["123"]},"locale":{"data":"fr","interface":"en"}}'`,
  },
  {
    method: 'GET',
    path: '/session/:id',
    description: 'Get session data by ID (JSON)',
    example: 'curl http://localhost:4000/session/<SESSION_ID>',
  },
  {
    method: 'GET',
    path: '/',
    description: 'Configuration page displayed in PIM iframe',
    example:
      'http://localhost:4000/?applicationType=document&quableInstanceName=demo&interfaceLocale=en&dataLocale=fr_FR&userId=123',
  },
]

const slotTypes = [
  {
    slot: 'document.action.single',
    description: 'Action on a single document',
    color: 'success' as const,
  },
  {
    slot: 'document.action.bulk',
    description: 'Action on multiple documents',
    color: 'primary' as const,
  },
  {
    slot: 'document.page.tab',
    description: 'Tab embedded in document page',
    color: 'warning' as const,
  },
]

export function ApiDocumentation() {
  const { t } = useTranslation()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('apiDoc.title')}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('apiDoc.description')}
        </Typography>

        {/* API Endpoints Table */}
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 600 }}>{t('apiDoc.method')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('apiDoc.endpoint')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('apiDoc.descriptionCol')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiEndpoints.map((endpoint, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Chip
                      label={endpoint.method}
                      size="small"
                      color={endpoint.method === 'GET' ? 'info' : 'success'}
                      sx={{ fontWeight: 600, fontFamily: 'monospace' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: '0.85rem' }}>
                      {endpoint.path}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {endpoint.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Slot Types */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          {t('apiDoc.slotTypes')}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 4 }}>
          {slotTypes.map((slot) => (
            <Chip
              key={slot.slot}
              label={slot.slot}
              color={slot.color}
              variant="outlined"
              sx={{ fontFamily: 'monospace', mb: 1 }}
            />
          ))}
        </Stack>

        {/* Examples */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
          {t('apiDoc.examples')}
        </Typography>

        {apiEndpoints.slice(0, 4).map((endpoint, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={endpoint.method}
                  size="small"
                  color={endpoint.method === 'GET' ? 'info' : 'success'}
                  sx={{ fontFamily: 'monospace' }}
                />
                <Typography variant="body2" fontFamily="monospace">
                  {endpoint.path}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  bgcolor: 'grey.900',
                  color: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  position: 'relative',
                }}
              >
                {endpoint.example}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => copyToClipboard(endpoint.example)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    minWidth: 'auto',
                    color: 'grey.400',
                    '&:hover': { color: 'white' },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Test file info */}
        <Paper
          variant="outlined"
          sx={{ p: 2, mt: 4, bgcolor: 'info.50', borderColor: 'info.main' }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            {t('apiDoc.testFile')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('apiDoc.testFileDescription')}
          </Typography>
          <Typography
            variant="body2"
            fontFamily="monospace"
            sx={{ mt: 1, color: 'info.dark' }}
          >
            test.http
          </Typography>
        </Paper>
      </Paper>
    </Box>
  )
}
