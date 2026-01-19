import { Box, Container, Stack } from '@mui/material'
import { Hero } from '../components/Hero'
import { ExampleForm } from '../components/ExampleForm'

export function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6} alignItems="center" sx={{ width: '100%' }}>
        <Hero />
        <ExampleForm />
      </Stack>
    </Container>
  )
}
