'use client'

import { Box, Typography, Stack, Paper, Chip, Divider } from '@mui/material'
import { Button } from '@quable/ui'
import { useRouter } from 'next/navigation'
import InventoryIcon from '@mui/icons-material/Inventory'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SettingsIcon from '@mui/icons-material/Settings'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ApiIcon from '@mui/icons-material/Api'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()
  const router = useRouter()

  const externalLinks = [
    {
      url: 'https://www.npmjs.com/package/@quable/ui?activeTab=readme',
      icon: <InventoryIcon />,
      labelKey: 'hero.npmQuableUI',
    },
    {
      url: 'https://quable-ui-storybook.web.app/',
      icon: <AutoStoriesIcon />,
      labelKey: 'hero.viewStorybook',
    },
    {
      url: 'https://developers.quable.com/quable-app/definition/',
      icon: <MenuBookIcon />,
      labelKey: 'hero.buildQuableApp',
    },
  ]

  const examplePages = [
    {
      path: '/config',
      icon: <SettingsIcon fontSize="small" />,
      labelKey: 'hero.pages.config',
    },
    {
      path: '/products',
      icon: <ListAltIcon fontSize="small" />,
      labelKey: 'hero.pages.products',
    },
  ]

  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        py: 6,
        px: 4,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 3,
        width: '100%',
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

        {/* External Links */}
        <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
          {externalLinks.map((link) => (
            <Button
              key={link.url}
              variant="outlined"
              startIcon={link.icon}
              onClick={() => window.open(link.url, '_blank')}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {t(link.labelKey)}
            </Button>
          ))}
        </Stack>

        <Divider sx={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />

        {/* Two columns: Example Pages and API Endpoints */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ width: '100%', maxWidth: 900 }}
        >
          {/* Example Pages Section */}
          <Paper
            sx={{
              flex: 1,
              p: 3,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <DesignServicesIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {t('hero.sections.examplePages')}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {t('hero.sections.examplePagesDesc')}
              </Typography>
              <Stack spacing={1}>
                {examplePages.map((page) => (
                  <Chip
                    key={page.path}
                    icon={page.icon}
                    label={t(page.labelKey)}
                    onClick={() => router.push(page.path)}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      '& .MuiChip-icon': { color: 'white' },
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Paper>

          {/* API Endpoints Section */}
          <Paper
            sx={{
              flex: 1,
              p: 3,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <ApiIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {t('hero.sections.apiEndpoints')}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {t('hero.sections.apiEndpointsDesc')}
              </Typography>
              <Stack spacing={1}>
                <Chip
                  label="/api/permission"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontFamily: 'monospace',
                  }}
                />
                <Chip
                  label="/api/install"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontFamily: 'monospace',
                  }}
                />
                <Chip
                  label="/api?slot=..."
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontFamily: 'monospace',
                  }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  )
}
