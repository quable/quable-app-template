'use client'

import { Box, Typography, Paper, Stack, Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface ConfigurationPageProps {
  applicationType?: string | null
  quableInstanceName?: string | null
  interfaceLocale?: string | null
  dataLocale?: string | null
  userId?: string | null
}

export function ConfigurationPage({
  applicationType,
  quableInstanceName,
  interfaceLocale,
  dataLocale,
  userId,
}: ConfigurationPageProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2.5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Quable App Configuration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your Quable App is successfully configured and ready to use.
          </Typography>

          <Chip
            icon={<CheckCircleIcon />}
            label="Application is active"
            color="success"
            sx={{ alignSelf: 'flex-start', py: 2.5, px: 1 }}
          />

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              textTransform="uppercase"
              sx={{ mb: 2, display: 'block' }}
            >
              Configuration Parameters
            </Typography>
            <Stack spacing={1} divider={<Box sx={{ borderBottom: '1px solid #e0e0e0' }} />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Application Type
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {applicationType || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Instance
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {quableInstanceName || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Interface Locale
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {interfaceLocale || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Data Locale
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {dataLocale || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {userId || '-'}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Box>
  )
}
