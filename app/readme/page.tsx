'use client'

import { Box, Container, Stack } from '@mui/material'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { ApiDocumentation } from '@/components/ApiDocumentation'

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5',
      }}
    >
      <Navigation />
      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack spacing={6} alignItems="center" sx={{ width: '100%' }}>
            <Hero />
            <ApiDocumentation />
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
