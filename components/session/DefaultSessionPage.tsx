'use client'

import { Box, Typography, Paper, Stack, Chip } from '@mui/material'

interface SessionData {
  id: string
  slot: string
  instance: {
    name: string | null
    url: string | null
  }
  user: {
    email: string | null
    admin: boolean
  }
  object: {
    type: string | null
    ids: string[]
  }
  locale: {
    data: string | null
    interface: string | null
  }
  createdAt: string
}

interface DefaultSessionPageProps {
  session: SessionData
}

export function DefaultSessionPage({ session }: DefaultSessionPageProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
        p: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 600,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Session Parameters
          </Typography>

          <Chip
            label={session.slot}
            sx={{
              bgcolor: '#636e72',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              alignSelf: 'flex-start',
            }}
          />

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#636e72', textTransform: 'uppercase', mb: 1.5, fontWeight: 600 }}
            >
              Instance
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Name:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.instance.name || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  URL:
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                  {session.instance.url || '-'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#636e72', textTransform: 'uppercase', mb: 1.5, fontWeight: 600 }}
            >
              User
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Email:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.user.email || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Admin:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.user.admin ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#636e72', textTransform: 'uppercase', mb: 1.5, fontWeight: 600 }}
            >
              Object
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Type:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.object.type || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  IDs:
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                  {session.object.ids.length > 0 ? session.object.ids.join(', ') : '-'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#636e72', textTransform: 'uppercase', mb: 1.5, fontWeight: 600 }}
            >
              Locale
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Data:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.locale.data || '-'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
                  Interface:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {session.locale.interface || '-'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Typography variant="caption" color="text.secondary">
            Session ID: {session.id}
            <br />
            Created: {new Date(session.createdAt).toISOString()}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
