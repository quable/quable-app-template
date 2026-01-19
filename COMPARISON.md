# Comparaison des Templates Quable

Ce document compare le template original (nodejs-quableapp-template) avec le nouveau template (@quable/ui).

## Vue d'ensemble

| Caractéristique | nodejs-quableapp-template | quable-ui-app-template |
|-----------------|---------------------------|------------------------|
| **Frontend** | EJS (Server-side rendering) | React 19 + TypeScript |
| **Backend** | Express.js | Express.js |
| **UI Library** | Bootstrap 5 + CSS custom | @quable/ui + MUI v5 |
| **Build Tool** | TypeScript compiler | Vite |
| **Package Manager** | npm/yarn | pnpm |
| **Réactivité** | Rechargement de page | SPA avec React |
| **Année de création** | 2022-2023 | 2026 |

## Architecture

### nodejs-quableapp-template (Ancien)

```
Template traditionnel SSR
┌─────────────────────────────────┐
│  Browser                        │
└──────────────┬──────────────────┘
               │ HTTP Request
               ↓
┌─────────────────────────────────┐
│  Express Server (Port 4000)     │
│  ├─ Routes                      │
│  ├─ Controllers                 │
│  ├─ EJS Templates               │
│  └─ Static Assets               │
└─────────────────────────────────┘
```

**Avantages** :
- Simple à comprendre
- Pas de compilation frontend complexe
- Bon pour le SEO (SSR natif)

**Inconvénients** :
- Expérience utilisateur moins fluide (rechargements de page)
- Moins de réactivité
- Difficile à tester les composants UI
- Mélange de logique UI et serveur

### quable-ui-app-template (Nouveau)

```
Architecture moderne SPA + API
┌─────────────────────────────────┐
│  Browser                        │
│  React SPA (Client-side)        │
└──────────────┬──────────────────┘
               │ API Calls
               ↓
┌─────────────────────────────────┐
│  Express Server (Port 4000)     │
│  ├─ API Routes (/api/*)         │
│  ├─ Controllers                 │
│  ├─ Services                    │
│  └─ Static Files (Production)   │
└─────────────────────────────────┘
```

**Avantages** :
- Expérience utilisateur moderne et fluide
- Composants UI réutilisables
- Meilleure séparation frontend/backend
- Écosystème React riche
- Tests unitaires plus faciles
- Design system cohérent avec @quable/ui

**Inconvénients** :
- Courbe d'apprentissage React
- Build process plus complexe
- Nécessite plus de ressources navigateur

## Composants UI

### Ancien Template (Bootstrap + CSS custom)

**Fichiers UI** :
- `public/views/layouts/layout.ejs` - Layout principal
- `public/views/components/banner.ejs` - Bannière
- `public/views/pages/index.ejs` - Page d'accueil
- `public/styles/app.css` - Styles custom (8603 lignes)

**Bibliothèques externes** :
- Bootstrap 5.3.2 (via CDN)
- Boxicons (via CDN)
- Material Symbols (via CDN)
- Notyf (notifications)

**Exemple de code** :
```html
<div class="blueBanner">
  <div>
    <div class="blueBanner-container">
      <h4 class="blueBanner-header">Quable App Template</h4>
      <p class="blueBanner-body">
        This application template will help you...
      </p>
    </div>
  </div>
</div>
```

### Nouveau Template (@quable/ui)

**Fichiers UI** :
- `src/components/Banner.tsx` - Composant React
- `src/components/Hero.tsx` - Composant React
- `src/components/ExampleForm.tsx` - Formulaire avec @quable/ui
- `src/App.tsx` - Composant principal
- `src/index.css` - Styles globaux minimaux

**Bibliothèque UI** :
- @quable/ui 0.0.14
- MUI v5 (peer dependency)
- Emotion (CSS-in-JS)

**Exemple de code** :
```tsx
import { Box, Typography, Link, Paper } from '@mui/material'

export function Banner() {
  return (
    <Paper
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 3,
        px: 4,
      }}
    >
      <Typography variant="h5" component="h1">
        Quable App Template
      </Typography>
      <Typography variant="body1">
        This application template will help you...
      </Typography>
    </Paper>
  )
}
```

**Composants @quable/ui disponibles** :
- Button, TextField, Select, Checkbox
- Autocomplete, DatePicker, ColorPicker
- DropZone, RichTextEditor
- Et plus de 20 autres composants...

## Backend

Les deux templates partagent une architecture backend similaire :

### Similitudes
- Express.js pour le serveur
- JWT pour l'authentification Quable PIM
- Middleware de session
- Routes API
- Prisma ORM pour la base de données
- Structure controllers/services

### Différences

| Aspect | Ancien | Nouveau |
|--------|--------|---------|
| Module system | CommonJS | ESM (type: "module") |
| Watch mode | nodemon | tsx watch |
| Chemins | tsconfig-paths | Résolution ESM native |
| Module alias | module-alias | Non nécessaire (ESM) |
| Routes rendering | EJS templates | API JSON uniquement |

**Ancien (CommonJS)** :
```typescript
import appRouter from './routes/app.routes';
// Utilise tsconfig-paths et module-alias
```

**Nouveau (ESM)** :
```typescript
import appRouter from './routes/app.routes.js'
// Extension .js obligatoire en ESM
```

## Dépendances

### nodejs-quableapp-template

**Dependencies (15)** :
- express, ejs, express-ejs-layouts
- axios, cors, cookie-parser
- jsonwebtoken
- prisma, @prisma/client
- @quable/quable-pim-js
- morgan, yaml
- module-alias, tsconfig-paths, rimraf

**DevDependencies (9)** :
- TypeScript, ts-node, nodemon
- ESLint
- @types/*

### quable-ui-app-template

**Dependencies (21)** :
- express, cors, cookie-parser
- jsonwebtoken
- prisma, @prisma/client
- @quable/quable-pim-js
- **react, react-dom**
- **@quable/ui**
- **@mui/material, @mui/icons-material**
- **@mui/x-data-grid-pro, @mui/x-date-pickers-pro**
- **@emotion/react, @emotion/styled**
- **react-router-dom**
- **moment, react-i18next, react-toastify**
- **Froala, react-beautiful-dnd, etc.**
- morgan, yaml

**DevDependencies (13)** :
- TypeScript
- **Vite, @vitejs/plugin-react**
- **tsx** (remplace ts-node)
- **concurrently**
- ESLint
- @types/*

## Scripts

### Ancien Template

```json
{
  "build": "rimraf ./dist && tsc --build",
  "start": "node -r module-alias/register ./dist",
  "dev": "nodemon",
  "lint": "npx eslint --ext .ts src/"
}
```

### Nouveau Template

```json
{
  "dev": "concurrently \"pnpm dev:server\" \"pnpm dev:client\"",
  "dev:server": "tsx watch server/index.ts",
  "dev:client": "vite",
  "build": "pnpm build:client && pnpm build:server",
  "build:client": "tsc -b && vite build",
  "build:server": "tsc -p tsconfig.server.json",
  "start": "NODE_ENV=production node dist/server/index.js",
  "lint": "eslint . --ext ts,tsx",
  "preview": "vite preview",
  "prisma:generate": "prisma generate",
  "prisma:push": "prisma db push"
}
```

## Migration

### Si vous migrez de l'ancien vers le nouveau template

1. **Composants UI** : Convertir les templates EJS en composants React
2. **Styles** : Remplacer CSS custom par composants @quable/ui
3. **Routes** : Les routes backend restent similaires
4. **Scripts** : Adapter les scripts npm
5. **Package manager** : Installer pnpm

### Checklist de migration

- [ ] Installer pnpm
- [ ] Copier les variables `.env`
- [ ] Copier le schéma Prisma si customisé
- [ ] Convertir les vues EJS en composants React
- [ ] Adapter les routes API si nécessaire
- [ ] Migrer la logique métier
- [ ] Tester l'authentification Quable PIM
- [ ] Mettre à jour `quable.app.yml`

## Quand utiliser quel template ?

### Utiliser **nodejs-quableapp-template** si :
- Vous préférez le SSR traditionnel
- Vous voulez une stack simple sans React
- Vous n'avez pas besoin d'une UI complexe
- Vous voulez un meilleur SEO out-of-the-box
- Votre équipe n'est pas familière avec React

### Utiliser **quable-ui-app-template** si :
- Vous voulez une expérience utilisateur moderne
- Vous avez besoin de composants UI réutilisables
- Vous voulez utiliser le design system @quable/ui
- Vous construisez une application interactive
- Votre équipe connaît React
- Vous voulez bénéficier de l'écosystème React

## Conclusion

Le nouveau template **quable-ui-app-template** offre :
- ✅ Une architecture moderne et scalable
- ✅ Un design system cohérent avec @quable/ui
- ✅ Une meilleure expérience développeur
- ✅ Des composants UI testables et réutilisables
- ✅ Une UX fluide et réactive

L'ancien template **nodejs-quableapp-template** reste valide pour :
- ✅ Des projets simples
- ✅ Des besoins de SEO importants
- ✅ Des équipes sans expérience React

Les deux templates partagent la même logique backend et s'intègrent de la même manière avec Quable PIM.
