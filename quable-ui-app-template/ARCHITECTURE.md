# Architecture du Template

Ce document explique l'architecture du template Quable avec @quable/ui.

## Vue d'ensemble

Ce template utilise une architecture moderne full-stack avec :
- **Frontend** : React 19 + TypeScript + Vite
- **Backend** : Express.js + TypeScript
- **UI Library** : @quable/ui (basé sur MUI v5)
- **Base de données** : Prisma ORM

## Structure du projet

```
quable-ui-app-template/
│
├── 📁 server/                      # Backend Express
│   ├── controllers/                # Contrôleurs de routes
│   │   └── app.controller.ts       # Contrôleur principal de l'app
│   ├── helpers/                    # Fonctions utilitaires
│   │   └── auth.ts                 # Gestion JWT et authentification
│   ├── middlewares/                # Middlewares Express
│   │   └── session.middleware.ts   # Middleware de session
│   ├── routes/                     # Définition des routes API
│   │   └── app.routes.ts           # Routes de l'application
│   ├── services/                   # Logique métier
│   │   └── app.service.ts          # Service principal
│   ├── config.ts                   # Configuration de l'application
│   └── index.ts                    # Point d'entrée du serveur
│
├── 📁 src/                         # Frontend React
│   ├── components/                 # Composants React
│   │   ├── Banner.tsx              # Bannière avec gradient
│   │   ├── ExampleForm.tsx         # Exemple de formulaire @quable/ui
│   │   └── Hero.tsx                # Section hero avec boutons
│   ├── App.tsx                     # Composant principal
│   ├── App.css                     # Styles de l'app
│   ├── main.tsx                    # Point d'entrée React
│   ├── index.css                   # Styles globaux
│   └── vite-env.d.ts               # Types Vite
│
├── 📁 database/                    # Base de données Prisma
│   └── schema.prisma               # Schéma de la DB
│
├── 📄 Configuration files
│   ├── .env                        # Variables d'environnement
│   ├── .gitignore                  # Fichiers ignorés par git
│   ├── .eslintrc.json              # Configuration ESLint
│   ├── .eslintignore               # Fichiers ignorés par ESLint
│   ├── .prettierrc                 # Configuration Prettier
│   ├── .prettierignore             # Fichiers ignorés par Prettier
│   ├── tsconfig.json               # Config TypeScript (frontend)
│   ├── tsconfig.server.json        # Config TypeScript (backend)
│   ├── vite.config.ts              # Configuration Vite
│   ├── package.json                # Dépendances et scripts
│   ├── quable.app.yml              # Configuration Quable PIM
│   └── index.html                  # Template HTML
│
└── 📄 Documentation
    ├── README.md                   # Documentation principale
    └── ARCHITECTURE.md             # Ce fichier
```

## Flux de données

### Développement

1. **Frontend (port 3000)** : Vite sert l'application React
2. **Backend (port 4000)** : Express sert les APIs
3. **Proxy** : Vite redirige `/api/*` vers le backend

```
[Browser] → [Vite:3000] → [React App]
                ↓
        [Proxy /api/*]
                ↓
          [Express:4000] → [API Routes]
```

### Production

1. Le frontend est buildé en fichiers statiques dans `dist/client`
2. Le backend est compilé en JavaScript dans `dist/server`
3. Express sert à la fois l'API et les fichiers statiques

```
[Browser] → [Express:4000] → [Static Files] (React App)
                           → [API Routes]
```

## Authentification Quable PIM

Le template intègre l'authentification Quable PIM via JWT :

1. **Middleware de session** : Vérifie le token dans les cookies
2. **Génération de token** : Crée un token depuis les query params Quable
3. **Stockage** : Token stocké en cookie HTTP-only

```typescript
// Flow d'authentification
Request → Session Middleware → Verify JWT → Continue
                              ↓
                         JWT expired/invalid
                              ↓
                     Generate new token from query params
                              ↓
                        Store in cookie → Continue
```

## Composants @quable/ui

Le template démontre l'utilisation de plusieurs composants @quable/ui :

### Dans Banner.tsx
- MUI Paper, Typography, Link avec styles personnalisés

### Dans Hero.tsx
- `Button` de @quable/ui avec variantes contained et outlined
- Stack et Box pour la mise en page

### Dans ExampleForm.tsx
- `TextField` : Champs de texte avec validation
- `Select` : Sélecteur avec options
- `Checkbox` : Case à cocher
- `Button` : Bouton de soumission

## Points d'extension

### Ajouter de nouvelles routes API

1. Créer un nouveau fichier dans `server/routes/`
2. Créer le contrôleur dans `server/controllers/`
3. Créer la logique métier dans `server/services/`
4. Importer et utiliser dans `server/index.ts`

### Ajouter de nouveaux composants React

1. Créer le composant dans `src/components/`
2. Importer dans `App.tsx` ou autre composant parent
3. Utiliser les composants @quable/ui pour la cohérence

### Modifier le thème

Le thème @quable/ui est fourni par `ThemeContextProvider`. Pour personnaliser :

1. Modifier dans `src/main.tsx`
2. Consulter la [documentation @quable/ui](https://github.com/quable/ui)

### Ajouter des tables avec Prisma

1. Modifier `database/schema.prisma`
2. Exécuter `pnpm prisma:generate`
3. Exécuter `pnpm prisma:push`

## Technologies utilisées

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 19.x | Framework UI frontend |
| TypeScript | 5.x | Typage statique |
| Vite | 6.x | Build tool frontend |
| Express | 4.x | Serveur backend |
| @quable/ui | 0.0.14 | Bibliothèque de composants |
| MUI | 5.x | Foundation de @quable/ui |
| Prisma | 5.x | ORM base de données |
| JWT | 9.x | Authentification |

## Scripts disponibles

```bash
# Développement
pnpm dev              # Lance frontend + backend
pnpm dev:client       # Lance uniquement le frontend
pnpm dev:server       # Lance uniquement le backend

# Build
pnpm build            # Build frontend + backend
pnpm build:client     # Build frontend uniquement
pnpm build:server     # Build backend uniquement

# Production
pnpm start            # Lance le serveur en production

# Base de données
pnpm prisma:generate  # Génère le client Prisma
pnpm prisma:push      # Applique le schéma à la DB

# Qualité de code
pnpm lint             # Vérifie avec ESLint
```

## Prochaines étapes

1. Configurer les variables d'environnement dans `.env`
2. Installer les dépendances avec `pnpm install`
3. Générer le client Prisma avec `pnpm prisma:generate`
4. Lancer le dev server avec `pnpm dev`
5. Explorer le Storybook @quable/ui : https://quable-ui-storybook.web.app/
