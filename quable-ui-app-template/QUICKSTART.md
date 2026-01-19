# Guide de démarrage rapide

Ce guide vous aidera à démarrer avec le template Quable UI en quelques minutes.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.0.0 ([Télécharger](https://nodejs.org/))
- **pnpm** >= 9.0.0

### Installation de pnpm

Si vous n'avez pas pnpm :

```bash
npm install -g pnpm
```

## Étape 1 : Installation des dépendances

```bash
cd quable-ui-app-template
pnpm install
```

Cette commande installera toutes les dépendances nécessaires, y compris :
- React et React DOM
- @quable/ui et ses peer dependencies
- Express et ses middlewares
- TypeScript et les outils de build

## Étape 2 : Configuration de l'environnement

Ouvrez le fichier `.env` et configurez vos variables :

```env
DATABASE_URL=file:./dev.db
QUABLE_APP_PORT=4000
QUABLE_APP_HOST_URL=localhost:4000
QUABLE_PARTNER_ID=your_partner_id_here
QUABLE_PARTNER_SECRET=your_partner_secret_here
```

⚠️ **Important** : Remplacez `your_partner_id_here` et `your_partner_secret_here` par vos vraies credentials Quable.

## Étape 3 : Initialiser la base de données

```bash
pnpm prisma:generate
pnpm prisma:push
```

Ces commandes :
1. Génèrent le client Prisma TypeScript
2. Créent la base de données SQLite et appliquent le schéma

## Étape 4 : Lancer le serveur de développement

```bash
pnpm dev
```

Cette commande lance simultanément :
- **Frontend React** sur `http://localhost:3000`
- **Backend Express** sur `http://localhost:4000`

Ouvrez votre navigateur à `http://localhost:3000` pour voir l'application.

## Étape 5 : Explorer l'application

### Page d'accueil

L'application affiche :
1. **Une bannière** avec un gradient violet
2. **Un hero** avec le logo Quable et des boutons
3. **Un formulaire d'exemple** utilisant les composants @quable/ui

### Essayer les composants

Le formulaire d'exemple montre comment utiliser :
- `TextField` pour les champs de texte
- `Select` pour les listes déroulantes
- `Checkbox` pour les cases à cocher
- `Button` pour les actions

Remplissez et soumettez le formulaire pour voir les données dans la console du navigateur.

## Structure du code

### Modifier le frontend

Les fichiers principaux à éditer :

```
src/
├── App.tsx                 # Point d'entrée de l'app
├── components/
│   ├── Banner.tsx          # Bannière en haut
│   ├── Hero.tsx            # Section hero
│   └── ExampleForm.tsx     # Formulaire exemple
└── index.css               # Styles globaux
```

**Exemple** : Modifier le titre dans `Hero.tsx`

```tsx
<Typography variant="h3" component="h2">
  Mon Super Titre    // Changez ici
</Typography>
```

Sauvegardez et le navigateur se rafraîchira automatiquement grâce à Vite HMR.

### Modifier le backend

Les fichiers principaux :

```
server/
├── index.ts                 # Serveur Express
├── routes/
│   └── app.routes.ts       # Définition des routes
├── controllers/
│   └── app.controller.ts   # Logique des routes
└── services/
    └── app.service.ts      # Logique métier
```

**Exemple** : Ajouter une nouvelle route API

1. Dans `server/routes/app.routes.ts` :
```typescript
router.get('/hello', appController.sayHello)
```

2. Dans `server/controllers/app.controller.ts` :
```typescript
public sayHello = async (_req: Request, res: Response) => {
  return res.status(200).send({ message: 'Hello from Quable!' })
}
```

3. Testez : `http://localhost:4000/api/hello`

## Ajouter de nouveaux composants @quable/ui

### Étape 1 : Explorer le Storybook

Visitez [https://quable-ui-storybook.web.app/](https://quable-ui-storybook.web.app/) pour voir tous les composants disponibles.

### Étape 2 : Importer et utiliser

Exemple avec un `DateField` :

```tsx
import { DateField } from '@quable/ui'

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

### Composants fréquemment utilisés

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
  RichTextEditor
} from '@quable/ui'
```

## Commandes utiles

### Développement

```bash
# Lance tout (recommandé)
pnpm dev

# Seulement le frontend
pnpm dev:client

# Seulement le backend
pnpm dev:server
```

### Build de production

```bash
# Build complet
pnpm build

# Build seulement le frontend
pnpm build:client

# Build seulement le backend
pnpm build:server

# Lancer en production
pnpm start
```

### Base de données

```bash
# Générer le client Prisma
pnpm prisma:generate

# Appliquer le schéma
pnpm prisma:push

# Ouvrir Prisma Studio (GUI)
npx prisma studio
```

### Qualité du code

```bash
# Linter ESLint
pnpm lint

# Formater avec Prettier (à ajouter si souhaité)
npx prettier --write .
```

## Problèmes courants

### Port déjà utilisé

Si le port 3000 ou 4000 est déjà utilisé :

**Option 1** : Arrêtez le processus utilisant le port
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill
lsof -ti:4000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option 2** : Changez le port dans la config
- Frontend : `vite.config.ts` → `server.port`
- Backend : `.env` → `QUABLE_APP_PORT`

### Erreur "Cannot find module @quable/ui"

```bash
# Réinstallez les dépendances
rm -rf node_modules
pnpm install
```

### Erreur Prisma

```bash
# Régénérez le client
pnpm prisma:generate
pnpm prisma:push
```

### HMR ne fonctionne pas

1. Vérifiez que vous êtes sur `http://localhost:3000` (pas 4000)
2. Sauvegardez le fichier modifié
3. Vérifiez la console du terminal pour les erreurs

## Prochaines étapes

1. **Explorez le Storybook** : [https://quable-ui-storybook.web.app/](https://quable-ui-storybook.web.app/)
2. **Lisez la doc @quable/ui** : [https://github.com/quable/ui](https://github.com/quable/ui)
3. **Consultez ARCHITECTURE.md** pour comprendre la structure
4. **Modifiez les composants** pour vos besoins
5. **Ajoutez vos routes API** dans le backend
6. **Intégrez avec Quable PIM** en configurant `quable.app.yml`

## Ressources

- 📚 [README complet](./README.md)
- 🏗️ [Architecture détaillée](./ARCHITECTURE.md)
- 🎨 [Storybook @quable/ui](https://quable-ui-storybook.web.app/)
- 📦 [Package npm @quable/ui](https://www.npmjs.com/package/@quable/ui)
- ⚛️ [Documentation React](https://react.dev)
- ⚡ [Documentation Vite](https://vite.dev)

## Support

Pour toute question :
1. Consultez le [Storybook](https://quable-ui-storybook.web.app/)
2. Lisez la [doc @quable/ui](https://github.com/quable/ui)
3. Vérifiez les [issues GitHub](https://github.com/quable/ui/issues)

Bon développement ! 🚀
