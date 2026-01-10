'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import {
    RegisterForm,
    registerFormSchema,
} from '@/validators/register.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { api } from '@/services/api'

export default function RegisterPage() {
    const router = useRouter()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            team_members: [],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "team_members",
    });

    const formSubmit = async (data: RegisterForm) => {
        if (!data.uni_id) data.uni_id = 'N/A'
        if (!data.uni_name) data.uni_name = 'N/A'

        try {
            await api.register(data)
            toast.success('Successfully Registered! Please login.')
            router.push('/login')
        } catch (err: any) {
            toast.error(err.message || 'Error Registering')
        }
    }

    return (<><main className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-12 overflow-hidden sm:px-6 lg:px-8">
            <div className="scanlines"></div>
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative z-10 w-full max-w-2xl p-8 space-y-8 border shadow-2xl bg-black/50 rounded-xl border-white/10 backdrop-blur-md">
                <div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-white glitch">
                        Register for RCS CTF
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-400">
                        Join the ranks of Cyber Sentinels
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(formSubmit)}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <h3 className="pb-2 text-xl font-semibold text-white border-b border-white/10">Team Leader Details</h3>
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    {...register('name')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    {...register('email')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    {...register('password')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="contact_no" className="block text-sm font-medium text-gray-300">
                                    Contact Number
                                </label>
                                <input
                                    id="contact_no"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    {...register('contact_no')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                {errors.contact_no && <p className="mt-1 text-xs text-red-500">{errors.contact_no.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="where_you_reside" className="block text-sm font-medium text-gray-300">
                                    Where do you reside?
                                </label>
                                <input
                                    id="where_you_reside"
                                    type="text"
                                    required
                                    {...register('where_you_reside')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                {errors.where_you_reside && <p className="mt-1 text-xs text-red-500">{errors.where_you_reside.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="uni_id" className="block text-sm font-medium text-gray-300">
                                    University ID (Optional)
                                </label>
                                <input
                                    id="uni_id"
                                    type="text"
                                    {...register('uni_id')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                            </div>
                            <div>
                                <label htmlFor="uni_name" className="block text-sm font-medium text-gray-300">
                                    University Name (Optional)
                                </label>
                                <input
                                    id="uni_name"
                                    type="text"
                                    {...register('uni_name')}
                                    className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        <h3 className="pt-4 pb-2 text-xl font-semibold text-white border-b border-white/10">Team Details</h3>
                        <div>
                            <label htmlFor="team_name" className="block text-sm font-medium text-gray-300">
                                Team Name
                            </label>
                            <input
                                id="team_name"
                                type="text"
                                required
                                {...register('team_name')}
                                className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                            {errors.team_name && <p className="mt-1 text-xs text-red-500">{errors.team_name.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-white">Team Members</h4>
                                {fields.length < 3 && (
                                    <button
                                        type="button"
                                        onClick={() => append({ name: '', email: '', contact_no: '' })}
                                        className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-white/10 hover:bg-white/20"
                                    >
                                        <PlusIcon className="w-5 h-5 mr-1" />
                                        Add Member
                                    </button>
                                )}
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="relative p-4 border rounded-lg bg-white/5 border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute text-gray-400 top-2 right-2 hover:text-red-500"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                    <h5 className="mb-3 text-sm font-medium text-gray-300">Member {index + 1}</h5>
                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
                                        <div>
                                            <input
                                                placeholder="Name"
                                                {...register(`team_members.${index}.name` as const)}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                            {errors.team_members?.[index]?.name && (
                                                <p className="mt-1 text-xs text-red-500">{errors.team_members[index]?.name?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                placeholder="Email"
                                                {...register(`team_members.${index}.email` as const)}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                            {errors.team_members?.[index]?.email && (
                                                <p className="mt-1 text-xs text-red-500">{errors.team_members[index]?.email?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                placeholder="Contact"
                                                {...register(`team_members.${index}.contact_no` as const)}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3" />
                                            {errors.team_members?.[index]?.contact_no && (
                                                <p className="mt-1 text-xs text-red-500">{errors.team_members[index]?.contact_no?.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--color-primary),0.5)] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Registering...' : 'Complete Registration'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/login" className="text-sm text-primary hover:text-primary/80">
                            Already have an account? Login here
                        </a>
                    </div>
                </form>
            </div>
        </main></>
    )
}