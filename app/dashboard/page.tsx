'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, User, Organizer } from '../../services/api'
import toast from 'react-hot-toast'
import { TrashIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

export default function UnifiedDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [registrations, setRegistrations] = useState<User[]>([])
    const [organizers, setOrganizers] = useState<Organizer[]>([])
    const [newOrgEmail, setNewOrgEmail] = useState('')
    const [loading, setLoading] = useState(true)

    // State for expanding team details
    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null)

    const fetchAllData = async (currentUser: User) => {
        if (currentUser.role === 'organizer' || currentUser.role === 'superadmin') {
            try {
                const data = await api.getRegistrations()
                setRegistrations(data)
            } catch (err) {
                console.error('Failed to fetch reg data')
            }
        }
        if (currentUser.role === 'superadmin') {
            try {
                const orgs = await api.getOrganizers()
                setOrganizers(orgs)
            } catch (err) {
                console.error('Failed to fetch organizers')
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        const currentUser = api.getCurrentUser()
        if (!currentUser) {
            router.push('/login')
            return
        }
        setUser(currentUser)
        fetchAllData(currentUser)
    }, [router])

    const handleAddOrganizer = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newOrgEmail) return
        try {
            await api.addOrganizer(newOrgEmail)
            toast.success('Organizer added')
            setNewOrgEmail('')
            if (user) fetchAllData(user)
        } catch (err: any) {
            toast.error(err.message || 'Failed to add')
        }
    }

    const handleRemoveOrganizer = async (email: string) => {
        if (!confirm('Remove this organizer?')) return
        try {
            await api.removeOrganizer(email)
            toast.success('Organizer removed')
            if (user) fetchAllData(user)
        } catch (err) {
            toast.error('Failed to remove')
        }
    }

    const toggleTeam = (id: string) => {
        if (expandedTeamId === id) setExpandedTeamId(null)
        else setExpandedTeamId(id)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <p className="text-xl text-primary animate-pulse">Loading Dashboard...</p>
            </div>
        )
    }

    if (!user) return null

    return (
        <main className="relative min-h-screen px-4 pt-24 pb-12 overflow-hidden sm:px-6 lg:px-8">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="pb-6 mb-8 border-b md:flex md:items-center md:justify-between border-white/10">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-bold leading-7 text-white sm:truncate sm:tracking-tight glitch">
                            {user.role === 'superadmin' ? 'Super Admin Panel' : user.role === 'organizer' ? 'Organizer Dashboard' : `Welcome, ${user.name}`}
                        </h2>
                        <p className="mt-2 text-sm text-gray-400 capitalize">
                            Role: <span className="font-bold text-primary">{user.role}</span>
                        </p>
                    </div>
                    <div className="flex mt-4 md:ml-4 md:mt-0">
                        <button
                            type="button"
                            onClick={() => {
                                api.logout()
                                router.push('/')
                            }}
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-all rounded-md shadow-sm bg-white/10 ring-1 ring-inset ring-white/20 hover:bg-white/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* --- SUPER ADMIN ONLY SECTION --- */}
                {user.role === 'superadmin' && (
                    <div className="mb-12 duration-500 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 mb-8 border rounded-lg bg-primary/5 border-primary/20">
                            <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-primary">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Manage Organizers
                            </h3>
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* Add Form */}
                                <div className="p-6 border rounded-lg bg-black/40 border-white/10">
                                    <h4 className="mb-4 font-medium text-gray-300 text-md">Grant Organizer Access</h4>
                                    <form onSubmit={handleAddOrganizer} className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="Enter organizer email..."
                                            className="flex-1 px-3 py-2 text-white transition-all border rounded outline-none bg-white/5 border-white/20 focus:border-primary focus:ring-1 focus:ring-primary"
                                            value={newOrgEmail}
                                            onChange={(e) => setNewOrgEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="flex items-center justify-center px-4 py-2 text-white transition-colors rounded bg-primary hover:bg-primary/80">
                                            <PlusIcon className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>

                                {/* List */}
                                <div className="p-6 border rounded-lg lg:col-span-2 bg-black/40 border-white/10">
                                    <h4 className="mb-4 font-medium text-gray-300 text-md">Authorized Organizers List</h4>
                                    <div className="pr-2 space-y-2 overflow-y-auto max-h-60 custom-scrollbar">
                                        {organizers.map(org => (
                                            <div key={org._id} className="flex items-center justify-between p-3 transition-colors border rounded bg-white/5 hover:bg-white/10 border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="font-mono text-sm text-white">{org.email}</span>
                                                    <span className="text-xs text-gray-500">{org.name || 'Pending Setup'}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveOrganizer(org.email)}
                                                    className="p-1 text-gray-400 transition-colors hover:text-red-500"
                                                    title="Revoke Access"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {organizers.length === 0 && <p className="text-sm italic text-gray-500">No organizers have been authorized yet.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ORGANIZER & SUPERADMIN: REGISTRATIONS VIEW --- */}
                {(user.role === 'organizer' || user.role === 'superadmin') && (
                    <div className="duration-700 animate-in fade-in slide-in-from-bottom-8">
                        <h3 className="mb-4 text-xl font-bold text-white">Event Registrations</h3>
                        <div className="overflow-hidden border rounded-lg shadow-xl bg-black/40 border-white/10 backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-white/10">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6">Team Name</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Leader</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Email</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Contact</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Residence</th>
                                            <th className="px-3 py-3.5 text-center text-sm font-semibold text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-transparent divide-y divide-white/10">
                                        {registrations.map((team) => (
                                            <>
                                                <tr key={team.id || 'unknown'} className="transition-colors cursor-pointer hover:bg-white/5" onClick={() => toggleTeam(team.id || '')}>
                                                    <td className="py-4 pl-4 pr-3 text-sm font-bold text-white whitespace-nowrap sm:pl-6">
                                                        {team.team_name}
                                                    </td>
                                                    <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">{team.name}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">{team.email}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">{team.contact_no}</td>
                                                    <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">{team.where_you_reside}</td>
                                                    <td className="px-3 py-4 text-sm text-center whitespace-nowrap">
                                                        <button className="transition-colors text-primary hover:text-white">
                                                            {expandedTeamId === team.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                                                        </button>
                                                    </td>
                                                </tr>

                                                {expandedTeamId === team.id && (
                                                    <tr className="bg-white/5">
                                                        <td colSpan={6} className="px-4 py-4 sm:px-6">
                                                            <div className="p-4 border rounded-md bg-black/50 border-white/10">
                                                                <h4 className="mb-3 text-sm font-bold text-primary">Team Members & Details</h4>
                                                                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                                                                    <div>
                                                                        <span className="text-xs text-gray-500 uppercase">University:</span>
                                                                        <p className="text-sm text-white">{team.uni_name} ({team.uni_id})</p>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-xs text-gray-500 uppercase">Registration Date:</span>
                                                                        <p className="text-sm text-white">{team.registeredAt ? new Date(team.registeredAt).toLocaleString() : 'N/A'}</p>
                                                                    </div>
                                                                </div>

                                                                {team.team_members && team.team_members.length > 0 ? (
                                                                    <div className="overflow-hidden border rounded-md border-white/10">
                                                                        <table className="min-w-full divide-y divide-white/10">
                                                                            <thead className="bg-white/10">
                                                                                <tr>
                                                                                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-300">Name</th>
                                                                                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-300">Email</th>
                                                                                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-300">Contact</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="divide-y divide-white/10">
                                                                                {team.team_members.map((member: any, idx: number) => (
                                                                                    <tr key={idx}>
                                                                                        <td className="px-3 py-2 text-sm text-gray-300">{member.name}</td>
                                                                                        <td className="px-3 py-2 text-sm text-gray-300">{member.email}</td>
                                                                                        <td className="px-3 py-2 text-sm text-gray-300">{member.contact_no}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm italic text-gray-500">No additional team members.</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        ))}
                                        {registrations.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-gray-500">
                                                    No team registrations found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-right text-gray-500">
                            Total Records: {registrations.length}
                        </div>
                    </div>
                )}

                {/* --- ATTENDEE VIEW --- */}
                {user.role === 'attendee' && (
                    <div className="space-y-8 duration-500 animate-in fade-in slide-in-from-bottom-4">
                        {/* Status Card */}
                        <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6 shadow-[0_0_20px_rgba(var(--color-primary),0.1)]">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 text-xl font-bold border rounded-full bg-primary/20 border-primary text-primary">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Registration Confirmed</h3>
                                    <p className="text-sm text-gray-400">You are all set for RCS CTF 2026!</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border rounded-lg bg-black/40 border-white/10 backdrop-blur-sm">
                            <h3 className="pb-2 mb-4 text-lg font-medium leading-6 text-white border-b border-white/10">
                                Team Details
                            </h3>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div><dt className="text-xs tracking-widest text-gray-500 uppercase">Team Name</dt><dd className="mt-1 font-mono text-white">{user.team_name}</dd></div>
                                <div><dt className="text-xs tracking-widest text-gray-500 uppercase">Email</dt><dd className="mt-1 font-mono text-white">{user.email}</dd></div>
                                <div><dt className="text-xs tracking-widest text-gray-500 uppercase">Contact</dt><dd className="mt-1 font-mono text-white">{user.contact_no}</dd></div>
                                <div><dt className="text-xs tracking-widest text-gray-500 uppercase">University</dt><dd className="mt-1 font-mono text-white">{user.uni_name || 'N/A'}</dd></div>
                            </dl>
                        </div>

                        {user.team_members && user.team_members.length > 0 && (
                            <div className="overflow-hidden border rounded-lg bg-black/40 border-white/10 backdrop-blur-sm">
                                <div className="p-6 border-b border-white/10">
                                    <h3 className="text-lg font-medium leading-6 text-white">Team Members</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-white/10">
                                        <thead className="bg-white/5">
                                            <tr>
                                                <th className="py-3 pl-6 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase">Name</th>
                                                <th className="py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase">Email</th>
                                                <th className="py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase">Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {user.team_members.map((member: any, index: number) => (
                                                <tr key={index} className="hover:bg-white/5">
                                                    <td className="py-4 pl-6 text-sm font-medium text-white whitespace-nowrap">{member.name}</td>
                                                    <td className="py-4 text-sm text-gray-300 whitespace-nowrap">{member.email}</td>
                                                    <td className="py-4 text-sm text-gray-300 whitespace-nowrap">{member.contact_no}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}