# Quable App Template

A modern Next.js application template for building Quable PIM Platform applications with the [@quable/ui](https://www.npmjs.com/package/@quable/ui) component library.

## Features

- **Next.js 16** with App Router
- **@quable/ui** - Quable's design system based on MUI v5
- **TypeScript** for type safety
- **Prisma ORM** with SQLite for database management
- **i18n** with next-intl (EN/FR)
- **React Query** (@tanstack/react-query) for data fetching
- **API Routes** for Quable PIM lifecycle integration
- **yarn** or **pnpm** for package management

## Prerequisites

- Node.js >= 18.0.0
- yarn or pnpm >= 9.0.0

## Quick Start

1. **Install dependencies:**

```bash
yarn install
# or
pnpm install
```

2. **Configure environment variables:**

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Set up the database:**

```bash
yarn prisma generate
yarn prisma migrate dev
# or
pnpm prisma generate
pnpm prisma migrate dev
```

4. **Start the development server:**

```bash
yarn dev
# or
pnpm dev
```

The app will be available at the URL specified in `NEXT_PUBLIC_APP_URL` (default: [http://localhost:3000](http://localhost:3000)).

## Project Structure

```
nextjs-app-template/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── globals.css           # Global styles
│   │   ├── route.ts              # GET / and POST /?slot=x (slot interactions)
│   │   ├── configuration/        # Configuration page (/configuration)
│   │   │   └── page.tsx
│   │   ├── readme/               # Readme page (/readme)
│   │   │   └── page.tsx
│   │   ├── [session]/            # Dynamic session routes
│   │   │   ├── (slots)/          # Slot-based pages
│   │   │   │   ├── page/         # Default page slot
│   │   │   │   ├── document.action.single/  # Single action slot
│   │   │   │   ├── document.action.bulk/    # Bulk action slot
│   │   │   │   └── document.page.tab/       # Page tab slot
│   │   │   └── product/          # Product page
│   │   ├── permission/           # GET /permission
│   │   │   └── route.ts
│   │   └── install/              # POST /install
│   │       └── route.ts
│   ├── components/               # React components
│   │   └── session-details.tsx  # Session details component
│   ├── lib/                      # Utilities
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── session.ts           # Session utilities
│   │   └── actions/             # Server actions
│   │       └── products.ts
│   ├── providers/               # React providers
│   │   └── react-query.tsx      # React Query provider
│   ├── i18n/                    # Internationalization
│   │   └── request.ts           # next-intl configuration
│   └── proxy.ts                 # Proxy utilities
├── prisma/                      # Prisma configuration
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── translations/                # Translation files
│   ├── en.json
│   └── fr.json
├── next.config.ts               # Next.js configuration
├── prisma.config.ts             # Prisma configuration
├── package.json                 # Dependencies and scripts
├── quable.app.yml              # Quable PIM app configuration
└── tsconfig.json               # TypeScript configuration
```

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint

# Prisma commands
yarn prisma generate     # Generate Prisma client
yarn prisma migrate dev  # Create and apply migrations
yarn prisma studio       # Open Prisma Studio
```

Replace `yarn` with `pnpm` if using pnpm.

## Using @quable/ui Components

Import and use components directly. Make sure to import the theme CSS in your layout:

```tsx
import "@quable/ui/theme/index.css";
import "@quable/ui/index.css";
import { Button, TextField, Select, Checkbox } from "@quable/ui";

function MyComponent() {
  return (
    <div>
      <TextField label="Name" />
      <Select
        label="Category"
        options={[
          { displayedValue: "Option 1", value: "1", key: "1" },
          { displayedValue: "Option 2", value: "2", key: "2" },
        ]}
      />
      <Checkbox label="Subscribe" />
      <Button color="primary" variant="contained">
        Submit
      </Button>
    </div>
  );
}
```

### Available Components

- **Actions**: Button
- **Forms**: Autocomplete, Checkbox, Chip, ChoiceList, ColorPicker, DateField, DateRangePicker, DropZone, NumberField, PasswordField, Radio, RichTextEditor, Select, Switch, TextArea, TextField, TimeField, ToggleButtonGroup

Explore all components in the [live Storybook documentation](https://quable-ui-storybook.web.app/).

## Quable PIM Integration

### API Routes

The template implements the Quable App Lifecycle:

| Route                               | Method | Description                                                   |
| ----------------------------------- | ------ | ------------------------------------------------------------- |
| `/`                                 | GET    | Redirects to configuration or creates session (AppStore flow) |
| `/`                                 | POST   | Slot interaction handler - creates session and returns URL    |
| `/permission`                       | GET    | Returns app permissions scope from `quable.app.yml`           |
| `/install`                          | POST   | Called when app is installed - stores instance credentials    |
| `/[session]/page`                   | GET    | Default page slot for a session                               |
| `/[session]/document.action.single` | GET    | Single action slot page                                       |
| `/[session]/document.action.bulk`   | GET    | Bulk action slot page                                         |
| `/[session]/document.page.tab`      | GET    | Page tab slot page                                            |
| `/[session]/product`                | GET    | Product page for a session                                    |
| `/configuration`                    | GET    | Configuration page                                            |

### Session Management

Sessions are automatically created when:

- A user accesses the app from the AppStore (GET `/`)
- A slot interaction is triggered (POST `/?slot=x`)

Each session stores:

- User ID
- Data locale and interface locale
- Document IDs (for action slots)
- Quable instance information

### Configuration

Configure your app in `quable.app.yml`:

```yaml
application_type: AppStore
quable_pim_scope:
  - full_access
```

## Customization

### Add new pages

Create a new file in `src/app/` directory:

```tsx
// src/app/my-page/page.tsx
import { useTranslations } from "next-intl";

export default function MyPage() {
  const t = useTranslations();
  return <div>{t("myKey")}</div>;
}
```

### Add new API routes

Create a new file in `src/app/`:

```tsx
// src/app/my-endpoint/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello!" });
}
```

### Modify translations

Edit files in `translations/`:

```json
// translations/en.json
{
  "common": {
    "app_name": "My App"
  },
  "myKey": "My translation"
}
```

### Using React Query

The app includes React Query for data fetching. Use it in your components:

```tsx
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["myData"],
    queryFn: async () => {
      const res = await fetch("/api/my-endpoint");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data.message}</div>;
}
```

## Learn More

- [@quable/ui Storybook](https://quable-ui-storybook.web.app/)
- [@quable/ui npm](https://www.npmjs.com/package/@quable/ui)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [MUI Documentation](https://mui.com)
- [Prisma Documentation](https://www.prisma.io/docs)

## License

MIT - Quable
