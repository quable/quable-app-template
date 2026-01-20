import { Stack, Typography, Box } from '@mui/material'
import { Button, TextField, Checkbox, Select } from '@quable/ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ExampleForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subscribe: false,
  })

  const categories = [
    { displayedValue: t('exampleForm.categories.products'), value: 'products', key: 'products' },
    { displayedValue: t('exampleForm.categories.documents'), value: 'documents', key: 'documents' },
    { displayedValue: t('exampleForm.categories.assets'), value: 'assets', key: 'assets' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(t('exampleForm.success'))
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 500,
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {t('exampleForm.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('exampleForm.description')}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label={t('exampleForm.fields.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <TextField
          label={t('exampleForm.fields.email')}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Select
          label={t('exampleForm.fields.category')}
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value as string })
          }
          options={categories}
          required
        />

        <Checkbox
          label={t('exampleForm.fields.subscribe')}
          checked={formData.subscribe}
          onChange={(e) =>
            setFormData({ ...formData, subscribe: e.target.checked })
          }
        />

        <Button type="submit" color="primary" variant="contained" fullWidth>
          {t('exampleForm.submitButton')}
        </Button>
      </Stack>
    </Box>
  )
}
