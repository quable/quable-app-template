import { Box, Typography, Link, Paper } from '@mui/material'

export function Banner() {
  return (
    <Paper
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 0,
        py: 3,
        px: 4,
      }}
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Quable App Template v2.0
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.95)',
            mb: 2,
          }}
        >
          This application template will help you to speed up the development of
          quable apps.
        </Typography>
        <Link
          href="https://github.com/quable/ui"
          target="_blank"
          rel="noreferrer"
          sx={{
            color: 'white',
            textDecoration: 'underline',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          View documentation
        </Link>
      </Box>
    </Paper>
  )
}
