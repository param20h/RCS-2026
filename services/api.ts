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
    role?: 'attendee' | 'organizer' | 'superadmin' // Optional as backend might not return it yet
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

export interface LoginResponse {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    user?: User; // Sometimes backend returns user object directly
}

class ApiService {
    private get baseUrl() {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    }

    private getAuthHeaders() {
        const token = this.getToken()
        if (token) {
            return {
                'Authorization': `Bearer ${token}`
            }
        }
        return {}
    }

    // --- Auth Methods ---

    async login(credentials: LoginCredentials): Promise<User> {
        try {
            // 1. Login
            console.log('Attempting login with:', credentials.email)
            const response = await axios.post<any>(`${this.baseUrl}/auth/login`, credentials)
            const data = response.data

            // CASE 1: Standard JWT (token in response)
            if (data.access_token) {
                this.setToken(data.access_token)
                if (data.refresh_token) this.setRefreshToken(data.refresh_token)

                // If user object is included, return it
                if (data.user) {
                    this.setCurrentUser(data.user)
                    return data.user
                }

                // Otherwise fetch profile
                try {
                    const userResponse = await axios.get<User>(`${this.baseUrl}/auth/me`, {
                        params: { token: data.access_token }
                    })
                    const user = userResponse.data
                    this.setCurrentUser(user)
                    return user
                } catch (meError: any) {
                    console.error("Fetch User Error:", meError)
                    throw new Error('Login successful, but failed to fetch user details: ' + (meError.response?.data?.detail || meError.message))
                }
            }

            // CASE 2: User Object Returned Directly (No explicit token)
            // Identify by presence of 'email' and 'id'
            if (data.email && (data.id || data._id)) {
                console.log('Login returned User object directly.')
                // Normalize ID if needed
                if (!data.id && data._id) {
                    data.id = data._id
                }

                // Assuming no token means we rely on cookies or sessionless for now
                this.setCurrentUser(data)
                return data as User
            }

            // CASE 3: Unknown or Error
            console.error("Login unexpected response:", data)
            throw new Error(`Login failed. Server responded with: ${JSON.stringify(data)}`)

        } catch (error: any) {
            console.error("Login Error:", error)
            const errorMessage = error.response?.data?.detail ||
                (error.response?.data ? JSON.stringify(error.response.data) : null) ||
                error.message ||
                'Login failed'
            throw new Error(errorMessage)
        }
    }

    async register(data: RegisterForm): Promise<void> {
        try {
            // Register endpoint
            await axios.post(`${this.baseUrl}/auth/register`, data)

            // Automatically login after register? 
            // Often reg returns success, let's login the user automatically if possible, 
            // or just let them login manually. 
            // For now, return void and let UI redirect to login or dashboard.

            // Attempt auto-login if you want, but safer to let them login to verify creds.
            // Or if register returns token, use it.

        } catch (error: any) {
            console.error("Register Error:", error.response?.data || error.message)
            // Handle array of errors from Validation Error
            if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
                const msg = error.response.data.detail.map((d: any) => d.msg).join(', ');
                throw new Error(msg)
            }
            throw new Error(error.response?.data?.detail || 'Registration failed')
        }
    }

    async logout(): Promise<void> {
        try {
            const refreshToken = this.getRefreshToken()
            if (refreshToken) {
                await axios.post(`${this.baseUrl}/auth/logout`, { refresh_token: refreshToken })
            }
        } catch (error) {
            console.warn("Logout failed on server", error)
        } finally {
            this.clearSession()
        }
    }

    // --- Data Methods ---

    async getRegistrations(): Promise<User[]> {
        // Feature disabled: Endpoint not provided in new spec
        console.warn("getRegistrations is currently disabled/mocked pending backend implementation")
        return []
        /* 
        try {
            const response = await axios.get(`${this.baseUrl}/registrations`, {
                headers: this.getAuthHeaders()
            })
            return response.data
        } catch (error: any) {
            if (error.response?.status === 403) throw new Error("Unauthorized")
            return []
        }
        */
    }

    // --- Admin Methods ---
    // Disabled as per missing spec

    async getOrganizers(): Promise<Organizer[]> {
        return []
    }

    async addOrganizer(email: string): Promise<void> {
        throw new Error("Feature not implemented")
    }

    async removeOrganizer(email: string): Promise<void> {
        throw new Error("Feature not implemented")
    }

    // --- Session Management ---

    getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null
        const stored = localStorage.getItem('currentUser')
        return stored ? JSON.parse(stored) : null
    }

    getToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('access_token')
    }

    getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('refresh_token')
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    private setToken(token: string): void {
        localStorage.setItem('access_token', token)
    }

    private setRefreshToken(token: string): void {
        localStorage.setItem('refresh_token', token)
    }

    private clearSession(): void {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}

export const api = new ApiService()