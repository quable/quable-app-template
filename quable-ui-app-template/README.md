# Quable App Template with @quable/ui

A modern React application template built with TypeScript, Vite, Express, and the [@quable/ui](https://www.npmjs.com/package/@quable/ui) component library for building Quable PIM Platform applications.

## Features

- ⚛️ **React 19** with TypeScript
- ⚡ **Vite** for fast development and optimized builds
- 🎨 **@quable/ui** - Modern component library with MUI v5 theming
- 🚀 **Express.js** backend for API routes
- 🔐 **JWT Authentication** for Quable PIM integration
- 💾 **Prisma ORM** for database management
- 🎯 **TypeScript** throughout the stack
- 📦 **pnpm** for efficient package management

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Configure your environment variables in `.env`:

```env
DATABASE_URL=file:./dev.db
QUABLE_APP_PORT=4000
QUABLE_APP_HOST_URL=localhost:4000
QUABLE_PARTNER_ID=your_partner_id
QUABLE_PARTNER_SECRET=your_partner_secret
```

3. Set up the database:

```bash
pnpm prisma generate
pnpm prisma db push
```

## Development

Run the development server (starts both backend and frontend):

```bash
pnpm dev
```

This will start:
- Frontend (Vite) on `http://localhost:3000`
- Backend (Express) on `http://localhost:4000`

### Separate Development Commands

Run backend only:
```bash
pnpm dev:server
```

Run frontend only:
```bash
pnpm dev:client
```

## Building for Production

Build the application:

```bash
pnpm build
```

This will:
1. Build the React frontend to `dist/client`
2. Build the Express backend to `dist/server`

Start the production server:

```bash
pnpm start
```

## Project Structure

```
quable-ui-app-template/
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── helpers/            # Helper functions (auth, etc.)
│   ├── middlewares/        # Express middlewares
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── config.ts           # App configuration
│   └── index.ts            # Server entry point
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Frontend entry point
│   └── index.css           # Global styles
├── database/               # Prisma database schema
├── public/                 # Static assets
├── .env                    # Environment variables
├── quable.app.yml          # Quable app configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config (frontend)
├── tsconfig.server.json    # TypeScript config (backend)
└── vite.config.ts          # Vite configuration
```

## Using @quable/ui Components

The template uses the [@quable/ui](https://www.npmjs.com/package/@quable/ui) component library. You can import and use components directly:

```tsx
import { Button, TextField, Autocomplete } from '@quable/ui'

function MyComponent() {
  return (
    <div>
      <TextField label="Name" />
      <Button color="primary">Submit</Button>
    </div>
  )
}
```

### Available Components

The library provides a wide range of components including:

- **Actions**: Button
- **Forms**: Autocomplete, Checkbox, Chip, ChoiceList, ColorPicker, DateField, DateRangePicker, DropZone, InlineError, Label, ListItems, NumberField, PasswordField, Radio, RichTextEditor, Select, Switch, TextArea, TextField, TimeField, ToggleButtonGroup
- **Table**: TransferListInput

📖 **Explore all components in the [live Storybook documentation](https://quable-ui-storybook.web.app/)**

### Theme Provider

The app is wrapped with `ThemeContextProvider` from `@quable/ui/theme` to provide consistent theming across all components. This is already set up in `src/main.tsx`.

## API Routes

The backend exposes the following API endpoints:

- `GET /api/quable-pim-scope` - Get Quable PIM scope configuration
- `POST /api/install` - Install the Quable app
- `POST /api/launch` - Launch document app

## Quable PIM Integration

The template includes authentication middleware that:
- Validates JWT tokens from Quable PIM
- Generates new tokens from query parameters
- Stores tokens in HTTP-only cookies

Configure your app in `quable.app.yml`:

```yaml
application_type: document
quable_pim_scope:
  - full_access
```

## Scripts

- `pnpm dev` - Start development server (backend + frontend)
- `pnpm dev:server` - Start backend only
- `pnpm dev:client` - Start frontend only
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Learn More

- [@quable/ui Documentation](https://github.com/quable/ui)
- [@quable/ui Storybook](https://quable-ui-storybook.web.app/)
- [@quable/ui npm package](https://www.npmjs.com/package/@quable/ui)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Express Documentation](https://expressjs.com)
- [MUI Documentation](https://mui.com)

## Customization

Feel free to customize and extend this template:
- Add more routes in `server/routes/`
- Create new React components in `src/components/`
- Modify the theme in `src/main.tsx`
- Add new API endpoints in the backend
- Expand database schema in `database/schema.prisma`

## License

MIT © Quable

Happy coding!
