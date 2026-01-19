# Quable App Templates

Ce repository contient les templates d'applications pour la plateforme Quable PIM.

## Templates disponibles

### 1. nodejs-quableapp-template (Original - 2022-2023)

Template traditionnel avec Express.js et EJS pour le server-side rendering.

**Technologies** :
- Express.js + EJS
- Bootstrap 5
- TypeScript
- Prisma ORM
- JWT Authentication

**Quand l'utiliser** :
- Applications simples
- Besoin de SEO important
- Équipe non familière avec React

[📁 Voir le template](./nodejs-quableapp-template/)

---

### 2. quable-ui-app-template (Nouveau - 2026) ⭐

Template moderne avec React et la bibliothèque de composants [@quable/ui](https://www.npmjs.com/package/@quable/ui).

**Technologies** :
- React 19 + TypeScript
- @quable/ui (MUI v5)
- Vite
- Express.js backend
- Prisma ORM
- JWT Authentication

**Caractéristiques** :
- ⚛️ Architecture moderne SPA
- 🎨 Design system cohérent avec @quable/ui
- ⚡ Hot Module Replacement avec Vite
- 🔐 Authentification Quable PIM intégrée
- 📦 +20 composants UI prêts à l'emploi
- 🚀 Expérience développeur optimale

**Quand l'utiliser** :
- Applications interactives modernes
- Besoin de composants UI réutilisables
- Interface utilisateur riche
- Équipe connaissant React

[📁 Voir le template](./quable-ui-app-template/) | [🚀 Guide de démarrage](./quable-ui-app-template/QUICKSTART.md)

---

## Comparaison des templates

| Critère | nodejs-quableapp-template | quable-ui-app-template |
|---------|---------------------------|------------------------|
| **Frontend** | EJS (SSR) | React (SPA) |
| **UI Library** | Bootstrap 5 | @quable/ui + MUI v5 |
| **Build Tool** | tsc | Vite |
| **Réactivité** | Pages reloads | Single Page App |
| **Composants** | Templates EJS | Composants React |
| **Package Manager** | npm/yarn | pnpm |
| **Complexité** | ⭐⭐ Simple | ⭐⭐⭐ Intermédiaire |
| **Expérience UX** | ⭐⭐⭐ Bonne | ⭐⭐⭐⭐⭐ Excellente |

[📊 Comparaison détaillée](./COMPARISON.md)

## Démarrage rapide

### Option 1 : Template moderne avec @quable/ui (Recommandé)

```bash
cd quable-ui-app-template
pnpm install
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

[📖 Guide complet](./quable-ui-app-template/QUICKSTART.md)

### Option 2 : Template classique

```bash
cd nodejs-quableapp-template
npm install
npm run dev
```

Ouvrez [http://localhost:4000](http://localhost:4000)

## Ressources @quable/ui

Le nouveau template utilise la bibliothèque [@quable/ui](https://www.npmjs.com/package/@quable/ui) développée par Quable.

### Documentation et exemples

- 🎨 **[Storybook interactif](https://quable-ui-storybook.web.app/)** - Explorez tous les composants
- 📦 **[npm package](https://www.npmjs.com/package/@quable/ui)** - Installation et versions
- 💻 **[GitHub Repository](https://github.com/quable/ui)** - Code source et issues

### Composants disponibles

La bibliothèque @quable/ui offre plus de 20 composants prêts à l'emploi :

**Formulaires** :
- TextField, TextArea, PasswordField
- Select, Autocomplete
- DateField, DateRangePicker, TimeField
- Checkbox, Radio, Switch
- ColorPicker, DropZone
- RichTextEditor

**Actions** :
- Button
- ToggleButtonGroup

**Tables** :
- TransferListInput

[Voir tous les composants dans le Storybook](https://quable-ui-storybook.web.app/)

## Architecture

Les deux templates partagent une architecture backend similaire :

```
Backend (Express.js)
├── Controllers     → Gèrent les requêtes HTTP
├── Services        → Logique métier
├── Middlewares     → Session, Auth, Logging
├── Routes          → Définition des endpoints
└── Helpers         → Fonctions utilitaires (JWT, etc.)
```

**Frontend** :

- **nodejs-quableapp-template** : Templates EJS + CSS/JS
- **quable-ui-app-template** : React Components + @quable/ui

## Configuration Quable PIM

Les deux templates incluent l'intégration Quable PIM :

### fichier `quable.app.yml`

```yaml
application_type: document
quable_pim_scope:
  - full_access
```

### Variables d'environnement `.env`

```env
DATABASE_URL=file:./dev.db
QUABLE_APP_PORT=4000
QUABLE_APP_HOST_URL=localhost:4000
QUABLE_PARTNER_ID=your_partner_id
QUABLE_PARTNER_SECRET=your_partner_secret
```

### Authentification JWT

Les templates gèrent automatiquement :
- ✅ Génération de tokens JWT
- ✅ Validation des tokens
- ✅ Renouvellement automatique
- ✅ Stockage sécurisé en cookies HTTP-only

## Structure du repository

```
quable-app-template/
├── nodejs-quableapp-template/    # Template original (2022-2023)
│   ├── src/                      # Backend Express + TypeScript
│   ├── public/                   # Frontend (EJS, CSS, JS)
│   ├── database/                 # Schéma Prisma
│   └── README.md
│
├── quable-ui-app-template/       # Nouveau template (2026)
│   ├── server/                   # Backend Express + TypeScript
│   ├── src/                      # Frontend React + @quable/ui
│   ├── database/                 # Schéma Prisma
│   ├── README.md
│   ├── QUICKSTART.md            # Guide de démarrage
│   └── ARCHITECTURE.md          # Documentation architecture
│
├── COMPARISON.md                 # Comparaison détaillée
└── README.md                     # Ce fichier
```

## Migration

Si vous souhaitez migrer de l'ancien vers le nouveau template :

1. Lisez le [guide de comparaison](./COMPARISON.md)
2. Installez pnpm : `npm install -g pnpm`
3. Suivez le [guide de démarrage](./quable-ui-app-template/QUICKSTART.md)
4. Convertissez progressivement vos templates EJS en composants React
5. Utilisez les composants @quable/ui pour l'UI

## Prérequis

### Pour nodejs-quableapp-template
- Node.js >= 16.0.0
- npm ou yarn

### Pour quable-ui-app-template
- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Scripts communs

Les deux templates partagent des scripts similaires :

```bash
# Développement
npm/pnpm dev          # Lance le serveur de développement

# Production
npm/pnpm build        # Build l'application
npm/pnpm start        # Lance en production

# Base de données
npx/pnpm prisma:generate    # Génère le client Prisma
npx/pnpm prisma:push        # Applique le schéma

# Qualité
npm/pnpm lint         # Vérifie le code
```

## Support et contributions

### Questions et problèmes

- Pour @quable/ui : [GitHub Issues](https://github.com/quable/ui/issues)
- Pour les templates : Contactez l'équipe Quable

### Documentation

- [@quable/ui Documentation](https://github.com/quable/ui)
- [Storybook interactif](https://quable-ui-storybook.web.app/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Express Documentation](https://expressjs.com)

## Licence

MIT © Quable

---

## Recommandation

Pour les nouveaux projets, nous recommandons d'utiliser **quable-ui-app-template** qui offre :
- ✨ Une expérience moderne et fluide
- 🎨 Un design system cohérent
- 🚀 De meilleures performances
- 🧪 Une meilleure testabilité
- 📦 Des composants réutilisables

Le template **nodejs-quableapp-template** reste disponible pour les projets nécessitant du SSR traditionnel ou pour les équipes préférant une stack plus simple.
