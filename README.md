# Admin Panel Frontend

A modern, responsive admin panel built with Next.js 16, featuring Google OAuth authentication, user management, and real-time statistics.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: Redux Toolkit + RTK Query
- **Charts**: Recharts
- **Authentication**: Google OAuth + JWT
- **Data Verification**: Protocol Buffers + Web Crypto API

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Backend server running on `http://localhost:4000`

## Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## Installation

```bash
# Install dependencies
pnpm install
```

## Running the Application

### Development Mode

```bash
pnpm run dev
```

The application will start on `http://localhost:3001`

### Production Mode

```bash
# Build the application
pnpm run build

# Start production server
pnpm run start
```

## Features

### Authentication
- Google OAuth 2.0 integration
- JWT token management
- Protected routes
- Automatic token refresh

### Dashboard
- User statistics overview
- 7-day user creation chart
- Real-time data updates
- Responsive design

### User Management
- Create, read, update, delete users
- Role and status management
- Pagination support
- Protocol Buffers export with signature verification
- Toast notifications for all actions

## Application Structure

```
app/
├── dashboard/           # Dashboard pages
│   ├── layout.tsx      # Dashboard layout with sidebar
│   ├── page.tsx        # Dashboard home with stats
│   └── users/          # User management
│       └── page.tsx    # Users CRUD interface
├── auth/               # Authentication pages
│   ├── login/          # Login page
│   └── success/        # OAuth callback
└── providers/          # Context providers

components/
├── ui/                 # shadcn/ui components
├── users/              # User management components
│   ├── UserTable.tsx
│   ├── UserForm.tsx
│   └── DeleteUserDialog.tsx
├── Sidebar.tsx         # Navigation sidebar
└── ProtectedRoute.tsx  # Route protection

store/
├── services/           # RTK Query APIs
│   ├── api.ts         # Base API configuration
│   ├── auth.ts        # Auth endpoints
│   └── users.ts       # User endpoints
├── features/
│   └── authSlice.ts   # Auth state management
└── store.ts           # Redux store configuration

types/
├── auth.ts            # Authentication types
└── user.ts            # User management types

utils/
├── crypto.ts          # SHA-384 & signature verification
└── token.ts           # Token management
```

## Available Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - Login page

### Protected Routes
- `/dashboard` - Dashboard home with statistics
- `/dashboard/users` - User management interface

## Key Features

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile devices
- Adaptive table columns
- Touch-friendly interface

### State Management
- Redux Toolkit for global state
- RTK Query for API calls and caching
- Automatic cache invalidation
- Optimistic updates

### Security
- JWT token stored in sessionStorage and cookies
- Automatic token attachment to API requests
- Client-side signature verification
- Protected routes with authentication checks

### User Experience
- Toast notifications (sonner)
- Loading states
- Error handling
- Confirmation dialogs
- Real-time data updates

## Development

### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn@latest add [component-name]
```

### Code Quality

```bash
# Run linter
pnpm run lint

# Type checking
npx tsc --noEmit
```

## API Integration

The frontend communicates with the backend through RTK Query endpoints:

### Auth API (`store/services/auth.ts`)
- `useGetProfileQuery` - Get user profile
- `useInitiateGoogleAuthMutation` - Start OAuth flow

### Users API (`store/services/users.ts`)
- `useGetUsersQuery` - Fetch users with pagination
- `useCreateUserMutation` - Create new user
- `useUpdateUserMutation` - Update user
- `useDeleteUserMutation` - Delete user
- `useGetUserStatsQuery` - Fetch statistics
- `useGetPublicKeyQuery` - Get RSA public key

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm run dev
```

### API Connection Issues
- Verify backend is running on port 4000
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env`
- Ensure CORS is configured correctly on backend

### Authentication Issues
- Clear browser cookies and sessionStorage
- Verify Google OAuth credentials
- Check JWT token expiration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Server-side rendering (SSR)
- Automatic code splitting
- Image optimization
- Route prefetching
- API response caching

## Environment Variables for Production

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

## License

Private - All Rights Reserved
