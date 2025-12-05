'use client'

import { useEffect, useState } from 'react'
import { RegisterForm } from '@/validators/register.validator'
import { api, User } from '@/services/api'

export default function OrganizerDashboard() {
    const [registrations, setRegistrations] = useState<User[]>([])

    useEffect(() => {
        const fetchRegistrations = async () => {
            const data = await api.getRegistrations()
            setRegistrations(data)
        }
        fetchRegistrations()
    }, [])

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="max-w-7xl mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight glitch">
                            Organizer Dashboard
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage Registrations
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-medium leading-6 text-white">
                        Overview
                    </h3>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white/5 px-4 py-5 shadow sm:p-6 border border-white/10">
                            <dt className="truncate text-sm font-medium text-gray-400">Total Registrations</dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{registrations.length}</dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h3 className="text-base font-semibold leading-6 text-white">Registrations</h3>
                            <p className="mt-2 text-sm text-gray-400">
                                A list of all users who have registered for the event.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
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
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    University
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Team Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Registered At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10 bg-transparent">
                                            {registrations.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.email}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.contact_no}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.uni_name || 'N/A'}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.team_name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                        {new Date(person.registeredAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
