# Quable App Template

A modern Next.js application template for building Quable PIM Platform applications with the [@quable/ui](https://www.npmjs.com/package/@quable/ui) component library.

## Features

- **Next.js 14** with App Router
- **@quable/ui** - Quable's design system based on MUI v5
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **i18n** with react-i18next (EN/FR)
- **API Routes** for Quable PIM lifecycle integration
- **pnpm** for efficient package management

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Quick Start

1. **Install dependencies:**

```bash
pnpm install
```

2. **Configure environment variables:**

Copy `.env` and update with your values:

```env
DATABASE_URL="file:./database/dev.db"
QUABLE_APP_PORT=4000
QUABLE_APP_HOST_URL=http://localhost:4000
QUABLE_PARTNER_ID=your_partner_id
QUABLE_PARTNER_SECRET=your_partner_secret
```

3. **Set up the database:**

```bash
pnpm prisma:generate
pnpm prisma:push
```

4. **Start the development server:**

```bash
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Project Structure

```
quable-app-template/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Configuration page (/)
│   ├── providers.tsx             # ThemeContextProvider from @quable/ui
│   ├── globals.css               # Global styles
│   ├── readme/page.tsx           # Readme page (/readme)
│   ├── products/page.tsx         # Products page (/products)
│   ├── quable-config/page.tsx    # Quable PIM iframe configuration
│   ├── route.ts                  # POST /?slot=x (slot interactions)
│   ├── permission/route.ts       # GET /permission
│   ├── install/route.ts          # POST /install
│   ├── session/[id]/page.tsx     # Dynamic session pages
│   └── session/[id]/route.ts     # GET /session/:id
├── components/                   # React components
│   ├── Navigation.tsx            # App navigation bar
│   ├── Hero.tsx                  # Hero section
│   ├── ExampleForm.tsx           # Example form with @quable/ui
│   ├── ProductFormModal.tsx      # Product edit modal
│   ├── LanguageSwitcher.tsx      # Language toggle (EN/FR)
│   └── session/                  # Session page components
│       ├── SingleActionPage.tsx
│       ├── BulkActionPage.tsx
│       ├── PageTabPage.tsx
│       ├── DefaultSessionPage.tsx
│       └── ConfigurationPage.tsx
├── i18n/                         # Internationalization
│   ├── config.ts                 # i18next configuration
│   └── locales/                  # Translation files
│       ├── en.json
│       └── fr.json
├── lib/                          # Utilities
│   ├── prisma.ts                 # Prisma client singleton
│   └── config.ts                 # App configuration loader
├── database/
│   └── schema.prisma             # Database schema
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── quable.app.yml                # Quable PIM app configuration
└── tsconfig.json                 # TypeScript configuration
```

## Available Scripts

```bash
pnpm dev          # Start development server on port 4000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

pnpm prisma:generate  # Generate Prisma client
pnpm prisma:push      # Push schema to database
```

## Using @quable/ui Components

Import and use components directly:

```tsx
import { Button, TextField, Select, Checkbox } from '@quable/ui'

function MyComponent() {
  return (
    <div>
      <TextField label="Name" />
      <Select
        label="Category"
        options={[
          { displayedValue: 'Option 1', value: '1', key: '1' },
          { displayedValue: 'Option 2', value: '2', key: '2' },
        ]}
      />
      <Checkbox label="Subscribe" />
      <Button color="primary" variant="contained">
        Submit
      </Button>
    </div>
  )
}
```

### Available Components

- **Actions**: Button
- **Forms**: Autocomplete, Checkbox, Chip, ChoiceList, ColorPicker, DateField, DateRangePicker, DropZone, NumberField, PasswordField, Radio, RichTextEditor, Select, Switch, TextArea, TextField, TimeField, ToggleButtonGroup

Explore all components in the [live Storybook documentation](https://quable-ui-storybook.web.app/).

## Quable PIM Integration

### API Routes

The template implements the Quable App Lifecycle:

| Route | Method | Description |
|-------|--------|-------------|
| `/permission` | GET | Returns app permissions scope |
| `/install` | POST | Called when app is installed |
| `/?slot=x` | POST | Slot interaction handler |
| `/session/:id` | GET | Get session data |
| `/quable-config` | GET | Configuration page for PIM iframe |

### Configuration

Configure your app in `quable.app.yml`:

```yaml
quable_pim_scope:
  - full_access
```

## Customization

### Add new pages

Create a new file in `app/` directory:

```tsx
// app/my-page/page.tsx
export default function MyPage() {
  return <div>My new page</div>
}
```

### Add new API routes

Create a new file in `app/`:

```tsx
// app/my-endpoint/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello!' })
}
```

### Modify translations

Edit files in `i18n/locales/`:

```json
// i18n/locales/en.json
{
  "myKey": "My translation"
}
```

## Learn More

- [@quable/ui Storybook](https://quable-ui-storybook.web.app/)
- [@quable/ui npm](https://www.npmjs.com/package/@quable/ui)
- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Documentation](https://mui.com)
- [Prisma Documentation](https://www.prisma.io/docs)

## License

MIT - Quable
