import { RegisterForm } from '@/validators/register.validator'

export interface User extends RegisterForm {
    id: string
    role: 'attendee' | 'organizer'
    registeredAt: string
}

export interface LoginCredentials {
    email: string
}

// Mock implementation using localStorage
// Replace these with real API calls
class ApiService {
    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async login(credentials: LoginCredentials): Promise<User> {
        await this.delay(500) // Simulate network delay

        if (credentials.email === 'admin@rcs.com') {
            const adminUser: User = {
                id: 'admin',
                name: 'Organizer',
                email: 'admin@rcs.com',
                contact_no: '',
                role: 'organizer',
                registeredAt: new Date().toISOString(),
                where_you_reside: '',
                uni_id: '',
                uni_name: '',
                team_name: '',
            }
            this.setCurrentUser(adminUser)
            return adminUser
        }

        const allRegistrations = this.getStoredRegistrations()
        const user = allRegistrations.find((u) => u.email === credentials.email)

        if (!user) {
            throw new Error('User not found')
        }

        this.setCurrentUser(user)
        return user
    }

    async register(data: RegisterForm): Promise<User> {
        await this.delay(500)

        const user: User = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            role: 'attendee',
            registeredAt: new Date().toISOString(),
        }

        const allRegistrations = this.getStoredRegistrations()
        allRegistrations.push(user)
        localStorage.setItem('allRegistrations', JSON.stringify(allRegistrations))

        this.setCurrentUser(user)
        return user
    }

    async getRegistrations(): Promise<User[]> {
        await this.delay(500)
        return this.getStoredRegistrations()
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

    private getStoredRegistrations(): User[] {
        if (typeof window === 'undefined') return []
        const stored = localStorage.getItem('allRegistrations')
        return stored ? JSON.parse(stored) : []
    }
}

export const api = new ApiService()
