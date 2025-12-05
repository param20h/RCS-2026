# Backend Integration Guide

This project is set up to easily integrate with a real backend. Currently, it uses a mock service layer (`services/api.ts`) that simulates API calls using `localStorage`.

## Architecture

The frontend communicates with the data layer exclusively through the `api` object exported from `services/api.ts`.

**UI Components** -> **API Service** -> **Data Source (Mock/Real)**

## Steps to Integrate Backend

1.  **Update Environment Variables**:
    - Rename `.env.example` to `.env.local`.
    - Set `NEXT_PUBLIC_API_URL` to your backend API URL.

2.  **Replace Mock Implementation**:
    - Open `services/api.ts`.
    - Replace the mock methods with real HTTP requests (using `fetch` or `axios`).
    - Ensure the return types match the defined interfaces (`User`, `LoginCredentials`, etc.).

## API Requirements

The backend should provide the following endpoints (or similar):

### Authentication

-   **POST /auth/login**
    -   **Body**: `{ email: string }` (Add password if needed)
    -   **Response**: `User` object

-   **POST /auth/logout**
    -   **Response**: Success message

### Registration

-   **POST /register**
    -   **Body**: `RegisterForm` data
    -   **Response**: `User` object

### Data

-   **GET /user/me**
    -   **Headers**: Authorization token (if using JWT)
    -   **Response**: `User` object

-   **GET /registrations** (Organizer only)
    -   **Headers**: Authorization token
    -   **Response**: Array of `User` objects

## Data Models

### User

```typescript
interface User {
    id: string
    name: string
    email: string
    contact_no: string
    uni_id?: string
    uni_name?: string
    where_you_reside: string
    team_name: string
    team_members?: {
        name: string
        email: string
        contact_no: string
    }[]
    role: 'attendee' | 'organizer'
    registeredAt: string
}
```
