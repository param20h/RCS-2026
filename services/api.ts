import { RegisterForm } from '@/validators/register.validator'
import axios from 'axios';

// Interfaces matching Backend or Frontend requirements
export interface User {
    id?: string
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
    role?: 'attendee' | 'organizer' | 'superadmin'
    registeredAt?: string
}

export interface Organizer {
    _id: string
    name: string
    email: string
    addedAt: string
}

export interface LoginCredentials {
    email: string
    password?: string
}

class ApiService {
    // Use relative path for Next.js internal API
    private get baseUrl() {
        return '/api'
    }

    private getAuthHeaders() {
        // Internal API relies on cookies or passing ID if needed, 
        // but typically Next.js API routes might verify session differently.
        // For this simple implementation we just proceed.
        return {}
    }

    // --- Auth Methods ---

    async login(credentials: LoginCredentials): Promise<User> {
        try {
            // Internal login route returns the user object directly on success
            const response = await axios.post<User>(`${this.baseUrl}/auth/login`, credentials)

            const user = response.data
            this.setCurrentUser(user)
            return user

        } catch (error: any) {
            console.error("Login Error:", error.response?.data || error.message)
            // Extract specific error message from Next.js API response
            const msg = error.response?.data?.error || error.message || 'Login failed'
            throw new Error(msg)
        }
    }

    async register(data: RegisterForm): Promise<void> {
        try {
            await axios.post(`${this.baseUrl}/auth/register`, data)
            // Register success, UI redirects to login
        } catch (error: any) {
            console.error("Register Error:", error.response?.data || error.message)
            const msg = error.response?.data?.error || 'Registration failed'
            throw new Error(msg)
        }
    }

    async logout(): Promise<void> {
        // Client-side cleanup only, as we are stateless/sessionless
        this.clearSession()
    }

    // --- Data Methods ---

    async getRegistrations(): Promise<User[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/registrations`)
            return response.data
        } catch (error: any) {
            console.error("Get Registrations Error:", error)
            return []
        }
    }

    // --- Admin Methods ---

    async getOrganizers(): Promise<Organizer[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/admin/organizers`)
            return response.data
        } catch (error: any) {
            console.error("Get Organizers Error:", error)
            return []
        }
    }

    async addOrganizer(email: string): Promise<void> {
        try {
            await axios.post(`${this.baseUrl}/admin/organizers`, { email })
        } catch (error: any) {
            const msg = error.response?.data?.error || 'Failed to add organizer'
            throw new Error(msg)
        }
    }

    async removeOrganizer(email: string): Promise<void> {
        try {
            // Using DELETE with data body requires 'data' config in axios
            await axios.delete(`${this.baseUrl}/admin/organizers`, {
                data: { email }
            })
        } catch (error: any) {
            const msg = error.response?.data?.error || 'Failed to remove organizer'
            throw new Error(msg)
        }
    }

    // --- Session Management ---

    getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null
        const stored = localStorage.getItem('currentUser')
        return stored ? JSON.parse(stored) : null
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    // No longer needed for internal backend but kept for compatibility just in case
    getToken(): string | null { return null }

    private clearSession(): void {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('access_token') // cleanup old tokens
        localStorage.removeItem('refresh_token')
    }
}

export const api = new ApiService()