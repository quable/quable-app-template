import { AppBar, Toolbar, Typography, Box, Tab, Tabs } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue)
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t('navigation.appTitle')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs
            value={location.pathname}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: { backgroundColor: 'white' }
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
              icon={<HomeIcon />}
              iconPosition="start"
              label={t('navigation.home')}
              value="/"
            />
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
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
