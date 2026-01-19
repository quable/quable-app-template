# Fonctionnalités de l'Application

Ce document décrit les 3 pages principales de l'application et leurs fonctionnalités.

## 🏠 Page d'Accueil (/)

[src/pages/Home.tsx](src/pages/Home.tsx)

### Description
Page d'accueil présentant l'application avec un hero section et un formulaire d'exemple.

### Composants utilisés
- **Hero** - Section principale avec navigation rapide
- **ExampleForm** - Formulaire de démonstration avec validation

### Fonctionnalités
- Présentation de l'application
- Navigation rapide vers les autres pages
- Liens vers le Storybook et GitHub
- Formulaire d'exemple avec composants @quable/ui

---

## ⚙️ Page de Configuration (/config)

[src/pages/ConfigPage.tsx](src/pages/ConfigPage.tsx)

### Description
Formulaire complet pour configurer la connexion à un service API externe.

### Composants @quable/ui utilisés
- `TextField` - Champs de texte (URL, API Key)
- `PasswordField` - Champ pour le secret API
- `Select` - Sélecteur d'environnement (Production/Staging/Dev)
- `Switch` - Toggle pour activer/désactiver le logging
- `Button` - Boutons d'action (Sauvegarder, Tester)

### Sections du formulaire

#### 1. Informations de connexion
```typescript
- URL de l'API (TextField)
- API Key (TextField)
- API Secret (PasswordField)
- Environnement (Select)
  - Production
  - Staging
  - Development
```

#### 2. Paramètres avancés
```typescript
- Timeout (secondes) (TextField type="number")
- Tentatives de retry (TextField type="number")
- Activer le logging (Switch)
- Description (TextField multiline)
```

### Fonctionnalités
- ✅ Validation des champs requis
- ✅ Gestion du state avec useState
- ✅ Notification de succès après sauvegarde
- ✅ Bouton "Tester la connexion"
- ✅ Design responsive avec Grid
- ✅ Sections organisées avec Divider

### Capture d'écran du formulaire
```
┌─────────────────────────────────────────┐
│ Configuration API                       │
├─────────────────────────────────────────┤
│ Informations de connexion               │
│ ┌─────────────────────────────────────┐ │
│ │ URL de l'API *                      │ │
│ └─────────────────────────────────────┘ │
│ ┌──────────────────┐ ┌───────────────┐ │
│ │ API Key *        │ │ API Secret *  │ │
│ └──────────────────┘ └───────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Environnement *  ▼ Production       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Paramètres avancés                      │
│ ┌──────────────────┐ ┌───────────────┐ │
│ │ Timeout: 30      │ │ Retry: 3      │ │
│ └──────────────────┘ └───────────────┘ │
│ [✓] Activer le logging                 │
│ ┌─────────────────────────────────────┐ │
│ │ Description                         │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│        [Tester]  [Sauvegarder]         │
└─────────────────────────────────────────┘
```

---

## 📦 Page Produits (/products)

[src/pages/ProductsPage.tsx](src/pages/ProductsPage.tsx)

### Description
Interface de gestion des produits avec tableau paginé et CRUD complet.

### Composants MUI utilisés
- `DataGrid` - Tableau avec pagination intégrée
- `Chip` - Affichage des statuts colorés
- `IconButton` - Boutons d'action (Éditer, Supprimer)

### Structure des données

```typescript
interface Product {
  id: number
  name: string           // Nom du produit
  sku: string           // Code SKU unique
  category: string      // Catégorie
  price: number         // Prix en euros
  stock: number         // Quantité en stock
  status: 'active' | 'inactive' | 'draft'
}
```

### Colonnes du tableau

| Colonne | Description | Type |
|---------|-------------|------|
| ID | Identifiant unique | number |
| Nom du produit | Nom complet | string |
| SKU | Code produit | string |
| Catégorie | Catégorie du produit | string |
| Prix | Prix en euros | number (€) |
| Stock | Quantité disponible | number |
| Statut | État du produit | Chip coloré |
| Actions | Boutons Éditer/Supprimer | IconButtons |

### Fonctionnalités

#### Tableau
- ✅ Pagination (5, 10, 25, 50 par page)
- ✅ Tri sur toutes les colonnes
- ✅ 50 produits de démonstration générés
- ✅ Design responsive
- ✅ Statuts colorés avec Chip
  - 🟢 Actif (vert)
  - 🔴 Inactif (rouge)
  - 🟡 Brouillon (jaune)

#### Actions CRUD
- ✅ **Create** - Bouton "Nouveau Produit"
- ✅ **Read** - Affichage dans le tableau
- ✅ **Update** - Bouton "Éditer" (icône crayon)
- ✅ **Delete** - Bouton "Supprimer" (icône poubelle)

### Catégories disponibles
- Électronique
- Vêtements
- Alimentation
- Maison
- Sport

---

## 📝 Popin Formulaire Produit (Modal)

[src/components/ProductFormModal.tsx](src/components/ProductFormModal.tsx)

### Description
Modal (Dialog) avec formulaire pour créer ou modifier un produit.

### Composants @quable/ui utilisés
- `TextField` - Champs de texte (nom, SKU, prix, stock)
- `Select` - Sélecteurs (catégorie, statut)
- `Button` - Boutons d'action (Annuler, Créer/Mettre à jour)

### Structure du formulaire

```typescript
┌──────────────────────────────────────────────┐
│ ✕ Nouveau produit / Modifier le produit     │
├──────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────┐ │
│ │ Nom du produit *                         │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌────────────────────┐ ┌──────────────────┐ │
│ │ SKU *              │ │ Catégorie * ▼    │ │
│ └────────────────────┘ └──────────────────┘ │
│                                              │
│ ┌────────────────────┐ ┌──────────────────┐ │
│ │ Prix (€) *         │ │ Stock *          │ │
│ └────────────────────┘ └──────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Statut * ▼ Actif                         │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│              [Annuler]  [Créer/Modifier]    │
└──────────────────────────────────────────────┘
```

### Fonctionnalités

#### Validation
- ✅ Tous les champs sont requis
- ✅ Le nom ne peut pas être vide
- ✅ Le SKU ne peut pas être vide
- ✅ Le prix doit être positif
- ✅ Le stock doit être positif
- ✅ Messages d'erreur sous chaque champ

#### Comportement
- ✅ Mode Création - Tous les champs vides
- ✅ Mode Édition - Champs pré-remplis avec les données du produit
- ✅ Fermeture avec bouton X ou Annuler
- ✅ Effacement des erreurs lors de la saisie
- ✅ Réinitialisation du formulaire à la fermeture

#### États du formulaire
```typescript
const [formData, setFormData] = useState<Partial<Product>>({
  name: '',
  sku: '',
  category: '',
  price: 0,
  stock: 0,
  status: 'draft',
})

const [errors, setErrors] = useState<Record<string, string>>({})
```

---

## 🎨 Navigation

[src/components/Navigation.tsx](src/components/Navigation.tsx)

### Description
Barre de navigation principale avec onglets.

### Fonctionnalités
- ✅ Navigation par onglets (Tabs)
- ✅ Icônes pour chaque page
- ✅ Indicateur de page active
- ✅ Design avec gradient violet
- ✅ Responsive

### Pages accessibles
1. 🏠 Accueil (/)
2. ⚙️ Configuration (/config)
3. 📦 Produits (/products)

---

## 📊 Technologies utilisées

### Routing
- **react-router-dom** v7.1.3
  - `BrowserRouter` pour le routing
  - `Routes` et `Route` pour les pages
  - `useNavigate` pour la navigation programmatique
  - `useLocation` pour détecter la page active

### Composants @quable/ui
- Button
- TextField
- PasswordField
- Select
- Switch

### Composants MUI
- AppBar, Toolbar, Tabs, Tab
- Container, Paper, Box, Stack, Grid
- Typography
- Dialog, DialogTitle, DialogContent, DialogActions
- DataGrid (from @mui/x-data-grid)
- Chip, IconButton, Divider, Alert

### Gestion d'état
- `useState` pour le state local
- Pas de Redux ou context global (simple)

---

## 🚀 Comment tester

### 1. Démarrer l'application
```bash
cd quable-ui-app-template
pnpm install
pnpm dev
```

### 2. Naviguer dans l'application
- Accueil : http://localhost:3000/
- Configuration : http://localhost:3000/config
- Produits : http://localhost:3000/products

### 3. Tester la page Configuration
1. Remplir le formulaire avec des données
2. Cliquer sur "Tester la connexion"
3. Cliquer sur "Sauvegarder" → voir la notification de succès

### 4. Tester la page Produits
1. Voir la liste des 50 produits
2. Cliquer sur "Nouveau Produit" → ouvre la modal
3. Remplir le formulaire → "Créer"
4. Cliquer sur l'icône crayon → éditer un produit
5. Cliquer sur l'icône poubelle → supprimer un produit
6. Changer la pagination (5, 10, 25, 50)
7. Trier par colonne

### 5. Tester la validation
- Essayer de soumettre des formulaires vides
- Voir les messages d'erreur en rouge
- Les erreurs disparaissent lors de la saisie

---

## 📁 Structure des fichiers

```
src/
├── App.tsx                      # Point d'entrée avec routing
├── main.tsx                     # Bootstrap React
│
├── components/
│   ├── Navigation.tsx           # Barre de navigation
│   ├── Hero.tsx                 # Hero section page d'accueil
│   ├── ExampleForm.tsx          # Formulaire exemple
│   └── ProductFormModal.tsx     # Modal formulaire produit
│
└── pages/
    ├── Home.tsx                 # Page d'accueil
    ├── ConfigPage.tsx           # Page configuration API
    └── ProductsPage.tsx         # Page gestion produits
```

---

## 💡 Points clés de l'implémentation

### 1. Validation des formulaires
```typescript
const validate = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.name || formData.name.trim() === '') {
    newErrors.name = 'Le nom est requis'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

### 2. Pagination avec DataGrid
```typescript
const [paginationModel, setPaginationModel] = useState({
  page: 0,
  pageSize: 10,
})

<DataGrid
  rows={products}
  columns={columns}
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[5, 10, 25, 50]}
/>
```

### 3. Modal réutilisable
```typescript
<ProductFormModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  onSave={handleSaveProduct}
  product={selectedProduct}  // null = création, objet = édition
/>
```

### 4. Navigation avec React Router
```typescript
const navigate = useNavigate()

<Button onClick={() => navigate('/config')}>
  Configuration
</Button>
```

---

## 🎯 Prochaines améliorations possibles

1. **Backend intégration**
   - Connecter les formulaires à l'API Express
   - Persister les données en base de données (Prisma)

2. **État global**
   - Ajouter React Context ou Redux pour partager l'état
   - Gérer l'authentification globalement

3. **Plus de composants @quable/ui**
   - DatePicker pour les dates de création
   - Autocomplete pour les recherches
   - DropZone pour l'upload d'images produits
   - RichTextEditor pour les descriptions

4. **Recherche et filtres**
   - Barre de recherche dans le tableau
   - Filtres par catégorie et statut
   - Export CSV/Excel

5. **Notifications**
   - Toast notifications avec react-toastify
   - Confirmations d'actions

6. **Tests**
   - Tests unitaires avec Jest
   - Tests d'intégration avec React Testing Library

---

## 📚 Ressources

- [Documentation @quable/ui](https://github.com/quable/ui)
- [Storybook @quable/ui](https://quable-ui-storybook.web.app/)
- [MUI DataGrid](https://mui.com/x/react-data-grid/)
- [React Router](https://reactrouter.com/)
