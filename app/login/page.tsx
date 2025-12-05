'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { api } from '@/services/api'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const user = await api.login({ email })
            if (user.role === 'organizer') {
                toast.success('Welcome Organizer!')
                router.push('/dashboard/organizer')
            } else {
                toast.success('Welcome back!')
                router.push('/dashboard/attendee')
            }
        } catch (err) {
            toast.error('User not found. Please register first.')
        }
    }

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="w-full max-w-md space-y-8 bg-black/50 p-8 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white glitch">
                        Login to RCS CTF
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter your registered email to access the dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/register" className="text-sm text-primary hover:text-primary/80">
                            Don&apos;t have an account? Register here
                        </a>
                    </div>
                </form>
            </div>
        </main>
    )
}
