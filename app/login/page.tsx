'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { api } from '@/services/api'

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await api.login(formData)
            toast.success('Welcome back!')
            router.push('/dashboard')
        } catch (err: any) {
            toast.error(err.message || 'Invalid credentials')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-12 overflow-hidden sm:px-6 lg:px-8">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative z-10 w-full max-w-md p-8 space-y-8 border shadow-2xl bg-black/50 rounded-xl border-white/10 backdrop-blur-md">
                <div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-white glitch">
                        Login to RCS CTF
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-400">
                        Enter your credentials to access the dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="block mb-1 text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 bg-white/5 py-1.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border-0 bg-white/5 py-1.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-primary),0.5)] disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/register" className="text-sm text-primary hover:text-primary/80">
                            Don&apos;t have an account? Sign up here
                        </a>
                    </div>
                </form>
            </div>
        </main>
    )
}