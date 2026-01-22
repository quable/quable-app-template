'use client'

import { Box, Typography, Paper, Stack, Alert } from '@mui/material'

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

interface PageTabPageProps {
  session: SessionData
}

export function PageTabPage({ session }: PageTabPageProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
          color: 'white',
          p: 4,
        }}
      >
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          📑
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Document Page Tab
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {session.object.type || 'Document'}: {session.object.ids[0] || '-'}
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Alert
          severity="info"
          sx={{
            mb: 3,
            bgcolor: '#fff0f0',
            borderLeft: '4px solid #ff6b6b',
            '& .MuiAlert-icon': { color: '#ff6b6b' },
          }}
        >
          This tab is embedded in the document page of the Quable PIM.
        </Alert>

        <Stack spacing={3}>
          <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#ff6b6b', textTransform: 'uppercase', mb: 2, pb: 1, borderBottom: '2px solid #fff0f0' }}
            >
              Context
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Instance
                </Typography>
                <Typography variant="body2">{session.instance.name || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Instance URL
                </Typography>
                <Typography variant="body2">{session.instance.url || '-'}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#ff6b6b', textTransform: 'uppercase', mb: 2, pb: 1, borderBottom: '2px solid #fff0f0' }}
            >
              User
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Email
                </Typography>
                <Typography variant="body2">{session.user.email || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Admin
                </Typography>
                <Typography variant="body2">{session.user.admin ? 'Yes' : 'No'}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#ff6b6b', textTransform: 'uppercase', mb: 2, pb: 1, borderBottom: '2px solid #fff0f0' }}
            >
              Locale
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Data
                </Typography>
                <Typography variant="body2">{session.locale.data || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
                  Interface
                </Typography>
                <Typography variant="body2">{session.locale.interface || '-'}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            Session: {session.id}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
