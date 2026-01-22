'use client'

import { Box, Typography, Paper, Stack, List, ListItem, Chip, Divider } from '@mui/material'

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

interface BulkActionPageProps {
  session: SessionData
}

export function BulkActionPage({ session }: BulkActionPageProps) {
  const docCount = session.object.ids.length

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            📚
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#667eea' }}>
            Bulk Document Action
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Action on multiple documents
          </Typography>

          <Chip
            label={`${docCount} document${docCount > 1 ? 's' : ''} selected`}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          />

          <Paper sx={{ p: 2.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              textTransform="uppercase"
              sx={{ mb: 1, display: 'block' }}
            >
              Document IDs
            </Typography>
            <List dense disablePadding>
              {session.object.ids.map((id, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    mb: 1,
                    py: 1,
                    px: 1.5,
                  }}
                >
                  <Typography variant="body2" fontFamily="monospace" color="#667eea">
                    {id}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Stack spacing={1} divider={<Divider />}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Document Type
              </Typography>
              <Typography variant="body2" fontFamily="monospace">
                {session.object.type || '-'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Instance
              </Typography>
              <Typography variant="body2" fontFamily="monospace">
                {session.instance.name || '-'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                User
              </Typography>
              <Typography variant="body2" fontFamily="monospace">
                {session.user.email || '-'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Admin
              </Typography>
              <Typography variant="body2" fontFamily="monospace">
                {session.user.admin ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            Session: {session.id}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
