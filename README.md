# Quable App Template

A modern Next.js application template for building Quable PIM Platform applications with the [@quable/ui](https://www.npmjs.com/package/@quable/ui) component library.

## Features

- **Next.js 16** with App Router
- **@quable/ui** - Quable's design system based on MUI v5
- **@quable/quable-pim-js** - Quable PIM JavaScript SDK
- **TypeScript** for type safety
- **Prisma ORM** with SQLite for database management
- **i18n** with next-intl (EN/FR)
- **React Query** (@tanstack/react-query) for data fetching

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
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEV_ALLOWED_ORIGINS=localhost:3000
```

**Note:** `DEV_ALLOWED_ORIGINS` is required for server actions in development mode. Add your development domain(s) separated by commas.

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
│   │   ├── readme/               # Readme page (/readme)
│   │   │   └── page.tsx
│   │   ├── error/                # Error page (/error)
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
│   │   ├── SessionDetails.tsx    # Session details component
│   │   └── ToastContainer/       # Toast notification container
│   │       ├── ToastContainer.tsx
│   │       └── ToastContainer.scss
│   ├── lib/                      # Utilities
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── session.ts           # Session utilities
│   │   ├── actions/             # Server actions
│   │   │   ├── products.ts
│   │   │   └── key-value.ts
│   │   └── proxy.ts             # Proxy
│   ├── providers/               # React providers
│   │   └── react-query.tsx      # React Query provider
│   └── i18n/                    # Internationalization
│       └── request.ts           # next-intl configuration
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
├── test.http                    # HTTP requests for testing API endpoints
├── tsconfig.json               # TypeScript configuration
└── .env.dist                    # Environment variables template
```

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Format code with Prettier
yarn format:check # Check code formatting

# Prisma commands
yarn prisma generate     # Generate Prisma client
yarn prisma migrate dev  # Create and apply migrations
yarn prisma studio       # Open Prisma Studio
```

Replace `yarn` with `pnpm` if using pnpm.

## Quable PIM Integration

### API Routes

The template implements the Quable App Lifecycle:

| Route                                | Method | Description                                                   |
| ------------------------------------ | ------ | ------------------------------------------------------------- |
| `/`                                  | GET    | Redirects to configuration or creates session (AppStore flow) |
| `/`                                  | POST   | Slot interaction handler - creates session and returns URL    |
| `/permission`                        | GET    | Returns app permissions scope from `quable.app.yml`           |
| `/install`                           | POST   | Called when app is installed - stores instance credentials    |
| `/readme`                            | GET    | Readme page with app documentation                            |
| `/error`                             | GET    | Error page                                                    |
| `/session-id/page`                   | GET    | Default page slot for a session                               |
| `/session-id/document.action.single` | GET    | Single action slot page                                       |
| `/session-id/document.action.bulk`   | GET    | Bulk action slot page                                         |
| `/session-id/document.page.tab`      | GET    | Page tab slot page                                            |
| `/session-id/product`                | GET    | Product page                                                  |

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

## Testing

The project includes a `test.http` file that contains HTTP requests for testing all API endpoints. This file can be used with REST Client extensions in VS Code or other HTTP client tools.

### Prerequisites

1. **Start the development server:**

   ```bash
   yarn dev
   # or
   pnpm dev
   ```

2. **Install a REST Client extension** (if using VS Code):
   - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) by Huachao Mao
   - Or use any HTTP client like Postman, Insomnia, or curl

### Using test.http

1. **Open the `test.http` file** in your editor

2. **Update the base URL** if needed (default: `http://localhost:3000`):

   ```http
   @baseUrl = http://localhost:3000
   ```

3. **Test endpoints in order:**

   **Step 1: Install the app**
   - First, install the app on a Quable instance using `POST /install`
   - Update the `quableAuthToken` with a valid token from your Quable instance
   - This creates the instance in the database

   **Step 2: Test permissions**
   - Use `GET /permission` to verify app permissions are correctly loaded

   **Step 3: Test AppStore flow**
   - Use `GET /?applicationType=AppStore&...` to simulate opening the app from AppStore
   - This creates a session and redirects to the default page

   **Step 4: Test slot interactions**
   - Use `POST /?slot=document.action.single` for single document actions
   - Use `POST /?slot=document.action.bulk` for bulk document actions
   - Use `POST /?slot=document.page.tab` for document page tabs
   - Each request returns a session URL: `{ "url": "...", "err": 0 }`

   **Step 5: Access session pages**
   - Extract the session ID from the URL returned in step 4
   - Replace `{{sessionId}}` in the GET requests with the actual session ID
   - Test accessing different slot pages and the product page

### Example Workflow

1. **Install the app:**

   ```http
   POST http://localhost:3000/install
   Content-Type: application/json

   {
     "data": {
       "quableInstanceName": "demo-instance",
       "quableAuthToken": "your-token-here"
     }
   }
   ```

2. **Create a session via slot:**

   ```http
   POST http://localhost:3000/?slot=document.action.single
   Content-Type: application/json

   {
     "data": {
       "quableInstanceName": "demo-instance",
       "userId": 1,
       "dataLocale": "fr_FR",
       "interfaceLocale": "en-US",
       "documentIds": ["PROD-001"]
     }
   }
   ```

3. **Access the session page:**
   ```http
   GET http://localhost:3000/{sessionId}/document.action.single
   ```
   Replace `{sessionId}` with the ID from the URL returned in step 2.

### Tips

- **Session IDs**: When testing, copy the session ID from the response URL and replace `{{sessionId}}` in subsequent requests
- **Instance Name**: Make sure the `quableInstanceName` matches the one used in `/install`
- **User ID**: Use numeric user IDs (e.g., `1`, `2`) as they are stored as integers in the database
- **Locales**: Test with different locale combinations to verify i18n functionality

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

### Toast Notifications

The app includes React Toastify for toast notifications. The `ToastContainer` component is already included in the root layout. Use it in your components:

```tsx
import { toast } from "react-toastify";

function MyComponent() {
  const handleClick = () => {
    toast.success("Operation completed!");
    // or toast.error(), toast.info(), toast.warning()
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## Learn More

- [@quable/ui Storybook](https://quable-ui-storybook.web.app/)
- [@quable/ui npm](https://www.npmjs.com/package/@quable/ui)
- [@quable/quable-pim-js npm](https://www.npmjs.com/package/@quable/quable-pim-js)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [MUI Documentation](https://mui.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Toastify Documentation](https://fkhadra.github.io/react-toastify/)

## License

MIT - Quable
