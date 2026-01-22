# Guide de demarrage rapide

Ce guide vous aidera a demarrer avec le template Quable App en quelques minutes.

## Prerequisites

Avant de commencer, assurez-vous d'avoir installe :

- **Node.js** >= 18.0.0 ([Telecharger](https://nodejs.org/))
- **pnpm** >= 9.0.0

### Installation de pnpm

Si vous n'avez pas pnpm :

```bash
npm install -g pnpm
```

## Etape 1 : Installation des dependances

```bash
pnpm install
```

Cette commande installera toutes les dependances necessaires, y compris :

- Next.js et React 18
- @quable/ui et MUI
- Prisma ORM
- TypeScript

## Etape 2 : Configuration de l'environnement

Ouvrez le fichier `.env` et configurez vos variables :

```env
DATABASE_URL="file:./database/dev.db"
QUABLE_APP_PORT=4000
QUABLE_APP_HOST_URL=http://localhost:4000
QUABLE_PARTNER_ID=your_partner_id_here
QUABLE_PARTNER_SECRET=your_partner_secret_here
```

**Important** : Remplacez `your_partner_id_here` et `your_partner_secret_here` par vos vraies credentials Quable.

## Etape 3 : Initialiser la base de donnees

```bash
pnpm prisma:generate
pnpm prisma:push
```

Ces commandes :

1. Generent le client Prisma TypeScript
1. Creent la base de donnees SQLite et appliquent le schema

## Etape 4 : Lancer le serveur de developpement

```bash
pnpm dev
```

Ouvrez votre navigateur a `http://localhost:4000` pour voir l'application.

## Etape 5 : Explorer l'application

### Pages disponibles

| URL | Description |
| --- | --- |
| `/` | Page d'accueil avec Hero et formulaire d'exemple |
| `/config` | Page de configuration API |
| `/products` | Gestion des produits avec DataGrid |

### Essayer les composants @quable/ui

Le formulaire d'exemple sur la page d'accueil montre comment utiliser :

- `TextField` pour les champs de texte
- `Select` pour les listes deroulantes
- `Checkbox` pour les cases a cocher
- `Button` pour les actions

Remplissez et soumettez le formulaire pour voir les donnees dans la console du navigateur.

## Structure du code

### Modifier les pages

Les pages sont dans le dossier `app/` :

```text
app/
├── page.tsx           # Page d'accueil (/)
├── config/page.tsx    # Configuration (/config)
├── products/page.tsx  # Produits (/products)
└── layout.tsx         # Layout global
```

**Exemple** : Modifier le titre dans `components/Hero.tsx`

```tsx
<Typography variant="h6">
  Mon Super Titre    // Changez ici
</Typography>
```

Sauvegardez et le navigateur se rafraichira automatiquement grace au HMR de Next.js.

### Ajouter une nouvelle page

Creez un nouveau dossier dans `app/` :

```tsx
// app/ma-page/page.tsx
'use client'

import { Box, Typography } from '@mui/material'
import { Button } from '@quable/ui'

export default function MaPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Ma nouvelle page</Typography>
      <Button color="primary" variant="contained">
        Click me
      </Button>
    </Box>
  )
}
```

Accessible sur `http://localhost:4000/ma-page`

### Ajouter une API route

Creez un nouveau fichier dans `app/api/` :

```tsx
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello from Quable!' })
}
```

Testez : `http://localhost:4000/api/hello`

## Ajouter de nouveaux composants @quable/ui

### Etape 1 : Explorer le Storybook

Visitez [https://quable-ui-storybook.web.app/](https://quable-ui-storybook.web.app/) pour voir tous les composants disponibles.

### Etape 2 : Importer et utiliser

Exemple avec un `DateField` :

```tsx
import { DateField } from '@quable/ui'
import { useState } from 'react'

function MyComponent() {
  const [date, setDate] = useState(null)

  return (
    <DateField
      label="Select a date"
      value={date}
      onChange={(newDate) => setDate(newDate)}
    />
  )
}
```

### Composants frequemment utilises

```tsx
import {
  Button,
  TextField,
  Select,
  Checkbox,
  Autocomplete,
  DateField,
  ColorPicker,
  DropZone,
  RichTextEditor,
  PasswordField,
  Switch
} from '@quable/ui'
```

## Commandes utiles

### Developpement

```bash
pnpm dev      # Lance le serveur de developpement
```

### Build de production

```bash
pnpm build    # Build l'application
pnpm start    # Lance en production
```

### Base de donnees

```bash
pnpm prisma:generate   # Genere le client Prisma
pnpm prisma:push       # Applique le schema
npx prisma studio      # Ouvre Prisma Studio (GUI)
```

### Qualite du code

```bash
pnpm lint    # Linter ESLint
```

## Problemes courants

### Port deja utilise

Si le port 4000 est deja utilise :

```bash
# macOS/Linux
lsof -ti:4000 | xargs kill

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Erreur "Cannot find module @quable/ui"

```bash
rm -rf node_modules
pnpm install
```

### Erreur Prisma

```bash
pnpm prisma:generate
pnpm prisma:push
```

## Prochaines etapes

1. **Explorez le Storybook** : [https://quable-ui-storybook.web.app/](https://quable-ui-storybook.web.app/)
1. **Lisez la doc @quable/ui** : [https://github.com/quable/ui](https://github.com/quable/ui)
1. **Consultez README.md** pour la documentation complete
1. **Modifiez les composants** pour vos besoins
1. **Ajoutez vos routes API** dans `app/api/`
1. **Integrez avec Quable PIM** en configurant `quable.app.yml`

## Ressources

- [README complet](./README.md)
- [Storybook @quable/ui](https://quable-ui-storybook.web.app/)
- [Package npm @quable/ui](https://www.npmjs.com/package/@quable/ui)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)

## Support

Pour toute question :

1. Consultez le [Storybook](https://quable-ui-storybook.web.app/)
1. Lisez la [doc @quable/ui](https://github.com/quable/ui)
1. Verifiez les [issues GitHub](https://github.com/quable/ui/issues)

Bon developpement!
