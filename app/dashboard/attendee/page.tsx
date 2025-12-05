'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/validators/register.validator'
import { api, User } from '@/services/api'

export default function AttendeeDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const currentUser = api.getCurrentUser()
        if (!currentUser) {
            router.push('/register')
            return
        }
        setUser(currentUser)
    }, [router])

    if (!user) return null

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="max-w-7xl mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight glitch">
                            Welcome, {user.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Attendee Dashboard
                        </p>
                    </div>
                    <div className="mt-4 flex md:ml-4 md:mt-0">
                        <button
                            type="button"
                            onClick={() => {
                                api.logout()
                                router.push('/')
                            }}
                            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-medium leading-6 text-white">
                        Your Registered Events
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="relative flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-primary transition-colors">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    RCS
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-white">RCS CTF 2026</p>
                                    <p className="truncate text-sm text-gray-400">Status: Registered</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-medium leading-6 text-white">
                        Profile Details
                    </h3>
                    <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">Email</dt>
                            <dd className="mt-1 text-sm text-white">{user.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">Contact</dt>
                            <dd className="mt-1 text-sm text-white">{user.contact_no}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">University</dt>
                            <dd className="mt-1 text-sm text-white">{user.uni_name || 'N/A'}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">Residence</dt>
                            <dd className="mt-1 text-sm text-white">{user.where_you_reside}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-400">Team Name</dt>
                            <dd className="mt-1 text-sm text-white">{user.team_name}</dd>
                        </div>
                    </dl>
                </div>

                {user.team_members && user.team_members.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium leading-6 text-white">
                            Team Members
                        </h3>
                        <div className="mt-4 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border border-white/10">
                                        <table className="min-w-full divide-y divide-white/10 bg-white/5">
                                            <thead className="bg-white/10">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                        Contact
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/10 bg-transparent">
                                                {user.team_members.map((member: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                                            {member.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{member.email}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{member.contact_no}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
