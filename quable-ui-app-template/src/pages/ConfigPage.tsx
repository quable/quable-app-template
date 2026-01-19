import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Stack,
  Grid,
  Box,
  Alert,
  Divider,
} from '@mui/material'
import { Button, TextField, Select, Switch, PasswordField } from '@quable/ui'
import { useTranslation } from 'react-i18next'

interface ApiConfig {
  apiUrl: string
  apiKey: string
  apiSecret: string
  environment: string
  timeout: string
  enableLogging: boolean
  retryAttempts: string
  description: string
}

export function ConfigPage() {
  const { t } = useTranslation()
  const [config, setConfig] = useState<ApiConfig>({
    apiUrl: '',
    apiKey: '',
    apiSecret: '',
    environment: 'production',
    timeout: '30',
    enableLogging: true,
    retryAttempts: '3',
    description: '',
  })

  const [saved, setSaved] = useState(false)

  const environments = [
    { label: t('config.environments.production'), value: 'production' },
    { label: t('config.environments.staging'), value: 'staging' },
    { label: t('config.environments.development'), value: 'development' },
  ]

  const handleChange = (field: keyof ApiConfig) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
  ) => {
    setConfig({ ...config, [field]: e.target.value })
    setSaved(false)
  }

  const handleSwitchChange = (field: keyof ApiConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig({ ...config, [field]: e.target.checked })
    setSaved(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Configuration saved:', config)
    // Ici vous pouvez envoyer la config à votre API
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleTestConnection = () => {
    console.log('Testing connection with:', config)
    alert(t('config.messages.testConnection'))
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('config.title')}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t('config.description')}
        </Typography>

        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {t('config.successMessage')}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Section: Informations de base */}
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {t('config.sections.connectionInfo')}
            </Typography>

            <TextField
              label={t('config.fields.apiUrl')}
              placeholder={t('config.fields.apiUrlPlaceholder')}
              value={config.apiUrl}
              onChange={handleChange('apiUrl')}
              required
              fullWidth
            />

            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('config.fields.apiKey')}
                  placeholder={t('config.fields.apiKeyPlaceholder')}
                  value={config.apiKey}
                  onChange={handleChange('apiKey')}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PasswordField
                  label={t('config.fields.apiSecret')}
                  placeholder={t('config.fields.apiSecretPlaceholder')}
                  value={config.apiSecret}
                  onChange={handleChange('apiSecret')}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Select
              label={t('config.fields.environment')}
              value={config.environment}
              onChange={handleChange('environment')}
              options={environments}
              required
              fullWidth
            />

            <Divider sx={{ my: 2 }} />

            {/* Section: Paramètres avancés */}
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {t('config.sections.advancedSettings')}
            </Typography>

            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('config.fields.timeout')}
                  type="number"
                  value={config.timeout}
                  onChange={handleChange('timeout')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('config.fields.retryAttempts')}
                  type="number"
                  value={config.retryAttempts}
                  onChange={handleChange('retryAttempts')}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                label={t('config.fields.enableLogging')}
                checked={config.enableLogging}
                onChange={handleSwitchChange('enableLogging')}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {t('config.fields.loggingHelp')}
              </Typography>
            </Box>

            <TextField
              label={t('config.fields.description')}
              placeholder={t('config.fields.descriptionPlaceholder')}
              value={config.description}
              onChange={handleChange('description')}
              multiline
              rows={3}
              fullWidth
            />

            <Divider sx={{ my: 2 }} />

            {/* Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                onClick={handleTestConnection}
              >
                {t('config.buttons.testConnection')}
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {t('config.buttons.saveConfiguration')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
