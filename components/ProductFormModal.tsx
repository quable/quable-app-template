'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Button, TextField, Select } from '@quable/ui'
import { useTranslation } from 'react-i18next'

export interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'draft'
}

interface ProductFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (product: Partial<Product>) => void
  product: Product | null
}

export function ProductFormModal({ open, onClose, onSave, product }: ProductFormModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'draft',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: 0,
        stock: 0,
        status: 'draft',
      })
    }
    setErrors({})
  }, [product, open])

  const categories = [
    { displayedValue: t('products.categories.electronics'), value: t('products.categories.electronics'), key: 'electronics' },
    { displayedValue: t('products.categories.clothing'), value: t('products.categories.clothing'), key: 'clothing' },
    { displayedValue: t('products.categories.food'), value: t('products.categories.food'), key: 'food' },
    { displayedValue: t('products.categories.home'), value: t('products.categories.home'), key: 'home' },
    { displayedValue: t('products.categories.sports'), value: t('products.categories.sports'), key: 'sports' },
  ]

  const statuses = [
    { displayedValue: t('products.status.active'), value: 'active', key: 'active' },
    { displayedValue: t('products.status.inactive'), value: 'inactive', key: 'inactive' },
    { displayedValue: t('products.status.draft'), value: 'draft', key: 'draft' },
  ]

  const handleChange =
    (field: keyof Product) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      setFormData({ ...formData, [field]: e.target.value })
      if (errors[field]) {
        setErrors({ ...errors, [field]: '' })
      }
    }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = t('errors.nameRequired')
    }

    if (!formData.sku || formData.sku.trim() === '') {
      newErrors.sku = t('errors.skuRequired')
    }

    if (!formData.category) {
      newErrors.category = t('errors.categoryRequired')
    }

    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = t('errors.pricePositive')
    }

    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = t('errors.stockPositive')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSave(formData)
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'draft',
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
          {product ? t('products.modal.titleEdit') : t('products.modal.titleNew')}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ py: 3 }}>
          <Stack spacing={3}>
            <TextField
              label={t('products.modal.fields.name')}
              placeholder={t('products.modal.fields.namePlaceholder')}
              value={formData.name}
              onChange={handleChange('name')}
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('products.modal.fields.sku')}
                  placeholder={t('products.modal.fields.skuPlaceholder')}
                  value={formData.sku}
                  onChange={handleChange('sku')}
                  required
                  fullWidth
                  error={!!errors.sku}
                  helperText={errors.sku}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  label={t('products.modal.fields.category')}
                  value={formData.category}
                  onChange={handleChange('category')}
                  options={categories}
                  required
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('products.modal.fields.price')}
                  type="number"
                  value={formData.price}
                  onChange={handleChange('price')}
                  required
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={t('products.modal.fields.stock')}
                  type="number"
                  value={formData.stock}
                  onChange={handleChange('stock')}
                  required
                  fullWidth
                  error={!!errors.stock}
                  helperText={errors.stock}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>

            <Select
              label={t('products.modal.fields.status')}
              value={formData.status}
              onChange={handleChange('status')}
              options={statuses}
              required
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {product ? t('products.modal.buttons.update') : t('products.modal.buttons.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
