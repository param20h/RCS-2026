import { RegisterForm } from '@/validators/register.validator'
import axios from 'axios';

export interface User {
    id: string
    name: string
    email: string
    contact_no: string
    uni_id?: string
    uni_name?: string
    where_you_reside: string
    team_name: string
    team_members?: any[]
    role: 'attendee' | 'organizer' | 'superadmin'
    registeredAt: string
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
    private get baseUrl() {
        return process.env.NEXT_PUBLIC_API_URL || '/api'
    }

    private getAuthHeaders() {
        const user = this.getCurrentUser()
        if (user && user.email) {
            return {
                'x-user-email': user.email
            }
        }
        return {}
    }

    async login(credentials: LoginCredentials): Promise<User> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, credentials)
            const user = response.data
            this.setCurrentUser(user)
            return user
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed')
        }
    }

    async register(data: RegisterForm): Promise<User> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/register`, data)
            const user = response.data.user
            this.setCurrentUser(user)
            return user
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Registration failed')
        }
    }

    async getRegistrations(): Promise<User[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/registrations`, {
                headers: this.getAuthHeaders()
            })
            return response.data
        } catch (error: any) {
            if (error.response?.status === 403) throw new Error("Unauthorized")
            return []
        }
    }

    // --- Admin Methods ---
    async getOrganizers(): Promise<Organizer[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/admin/organizers`, {
                headers: this.getAuthHeaders()
            })
            return response.data
        } catch (error) { return [] }
    }

    async addOrganizer(email: string): Promise<void> {
        try {
            await axios.post(`${this.baseUrl}/admin/organizers`, { email }, {
                headers: this.getAuthHeaders()
            })
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to add')
        }
    }

    async removeOrganizer(email: string): Promise<void> {
        await axios.delete(`${this.baseUrl}/admin/organizers`, {
            data: { email },
            headers: this.getAuthHeaders()
        })
    }

    getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null
        const stored = localStorage.getItem('currentUser')
        return stored ? JSON.parse(stored) : null
    }

    logout(): void {
        localStorage.removeItem('currentUser')
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }
}

export const api = new ApiService()