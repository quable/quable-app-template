import { Box, Typography, Stack, Paper } from '@mui/material'
import { Button } from '@quable/ui'
import { useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 3,
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Box
          component="img"
          src="https://cdn.prod.website-files.com/60c1c6d8535a23e2cf5da739/67628cb42778548ec54aa3c0_Logo%20Quable%20Part%20of%20QNTM.svg"
          alt={t('hero.logoAlt')}
          sx={{
            height: 80,
            filter: 'brightness(0) invert(1)',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            maxWidth: 700,
            opacity: 0.95,
          }}
        >
          {t('hero.description')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={() => navigate('/config')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {t('navigation.configuration')}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<ListAltIcon />}
            onClick={() => navigate('/products')}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            {t('navigation.products')}
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="text"
            onClick={() => window.open('https://quable-ui-storybook.web.app/', '_blank')}
            sx={{ color: 'white', textDecoration: 'underline' }}
          >
            {t('hero.viewStorybook')}
          </Button>
          <Button
            variant="text"
            onClick={() => window.open('https://github.com/quable/ui', '_blank')}
            sx={{ color: 'white', textDecoration: 'underline' }}
          >
            {t('hero.githubQuableUI')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
