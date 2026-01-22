'use client'

import { AppBar, Toolbar, Typography, Box, Tab, Tabs, IconButton, Tooltip, Divider } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import SettingsIcon from '@mui/icons-material/Settings'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import InventoryIcon from '@mui/icons-material/Inventory'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue)
  }

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

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mr: 2 }}>
          {t('navigation.appTitle')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Tabs
            value={pathname}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: { backgroundColor: 'white' },
            }}
            sx={{
              '& .MuiTab-root': {
                color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            <Tab icon={<HomeIcon />} iconPosition="start" label={t('navigation.home')} value="/" />
          </Tabs>

          <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

          <Tooltip title={t('navigation.examplePagesHint')}>
            <DesignServicesIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 1, fontSize: 18 }} />
          </Tooltip>

          <Tabs
            value={pathname === '/config' || pathname === '/products' ? pathname : false}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: { backgroundColor: 'white' },
            }}
            sx={{
              '& .MuiTab-root': {
                color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            <Tab
              icon={<SettingsIcon />}
              iconPosition="start"
              label={t('navigation.configuration')}
              value="/config"
            />
            <Tab
              icon={<ListAltIcon />}
              iconPosition="start"
              label={t('navigation.products')}
              value="/products"
            />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {externalLinks.map((link) => (
            <Tooltip key={link.url} title={t(link.labelKey)}>
              <IconButton
                color="inherit"
                onClick={() => window.open(link.url, '_blank')}
                sx={{ color: 'white' }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          ))}
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
