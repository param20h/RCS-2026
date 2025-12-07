import { z } from 'zod'

export const registerFormSchema = z.object({
    name: z.string().min(1, 'Invalid Name'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    contact_no: z
        .string()
        .min(10, 'Invalid Phone Number')
        .max(10, 'Invalid Phone Number'),
    uni_id: z.string().optional(),
    uni_name: z.string().optional(),
    where_you_reside: z.string().min(1, 'Invalid Address'),
    team_name: z.string().min(1, 'Team Name is required'),
    team_members: z.array(
        z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().email('Invalid Email'),
            contact_no: z.string().min(10, 'Invalid Phone').max(10, 'Invalid Phone'),
        })
    ).max(3, 'Max 3 additional members allowed').optional(),
})

export type RegisterForm = z.infer<typeof registerFormSchema>