import { useState, useMemo } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
} from '@mui/material'
import { DataGridPro, GridColDef, GridPaginationModel } from '@mui/x-data-grid-pro'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@quable/ui'
import { ProductFormModal } from '../components/ProductFormModal'
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

// Données de démonstration
const generateMockProducts = (t: (key: string) => string): Product[] => {
  const categories = [
    t('products.categories.electronics'),
    t('products.categories.clothing'),
    t('products.categories.food'),
    t('products.categories.home'),
    t('products.categories.sports'),
  ]
  const statuses: Product['status'][] = ['active', 'inactive', 'draft']

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: t('products.product', { id: i + 1 }),
    sku: `SKU-${String(i + 1).padStart(4, '0')}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.round(Math.random() * 1000 * 100) / 100,
    stock: Math.floor(Math.random() * 200),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

export function ProductsPage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>(() => generateMockProducts(t))
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm(t('products.confirmDelete'))) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setModalOpen(true)
  }

  const handleSaveProduct = (product: Partial<Product>) => {
    if (selectedProduct) {
      // Mise à jour
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...product } : p
        )
      )
    } else {
      // Création
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || '',
        price: product.price || 0,
        stock: product.stock || 0,
        status: product.status || 'draft',
      }
      setProducts([newProduct, ...products])
    }
    setModalOpen(false)
  }

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'error'
      case 'draft':
        return 'warning'
    }
  }

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return t('products.status.active')
      case 'inactive':
        return t('products.status.inactive')
      case 'draft':
        return t('products.status.draft')
    }
  }

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('products.columns.id'),
        width: 70,
      },
      {
        field: 'name',
        headerName: t('products.columns.name'),
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'sku',
        headerName: t('products.columns.sku'),
        width: 130,
      },
      {
        field: 'category',
        headerName: t('products.columns.category'),
        width: 150,
      },
      {
        field: 'price',
        headerName: t('products.columns.price'),
        width: 120,
        renderCell: (params) => `${params.value}€`,
      },
      {
        field: 'stock',
        headerName: t('products.columns.stock'),
        width: 100,
      },
      {
        field: 'status',
        headerName: t('products.columns.status'),
        width: 130,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Chip
            label={getStatusLabel(params.value)}
            color={getStatusColor(params.value)}
            size="small"
          />
        ),
      },
      {
        field: 'actions',
        headerName: t('common.actions'),
        width: 120,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [products, t]
  )

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {t('products.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {t('products.totalProducts', { count: products.length })}
            </Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            {t('products.newProduct')}
          </Button>
        </Box>

        <Paper elevation={2}>
          <DataGridPro
            rows={products}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          />
        </Paper>
      </Stack>

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
    </Container>
  )
}
