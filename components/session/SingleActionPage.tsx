'use client'

import { Box, Typography, Paper, Stack, Grid } from '@mui/material'

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

interface SingleActionPageProps {
  session: SessionData
}

export function SingleActionPage({ session }: SingleActionPageProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h2" component="div">
            📄
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#11998e' }}>
            Single Document Action
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Action on a single document
          </Typography>

          <Paper
            sx={{
              p: 2.5,
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" sx={{ opacity: 0.8, textTransform: 'uppercase' }}>
              Document ID
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5 }}>
              {session.object.ids[0] || '-'}
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.8, textTransform: 'uppercase', mt: 2, display: 'block' }}
            >
              Type
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5 }}>
              {session.object.type || '-'}
            </Typography>
          </Paper>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">
                  Instance
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ mt: 0.5 }}>
                  {session.instance.name || '-'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">
                  User
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ mt: 0.5 }}>
                  {session.user.email || '-'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">
                  Data Locale
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ mt: 0.5 }}>
                  {session.locale.data || '-'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" textTransform="uppercase">
                  Interface
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ mt: 0.5 }}>
                  {session.locale.interface || '-'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            Session: {session.id}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
