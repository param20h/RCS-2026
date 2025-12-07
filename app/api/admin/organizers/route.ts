import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Organizer from '@/models/Organizer'
import User from '@/models/User'
import { headers } from 'next/headers'

// Helper to verify Super Admin
const isSuperAdmin = (req: Request) => {
    const headersList = headers()
    const email = headersList.get('x-user-email')
    return email === 'admin@rcs.com'
}

export async function GET(request: Request) {
    try {
        await dbConnect()
        if (!isSuperAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
        }
        const organizers = await Organizer.find().sort({ addedAt: -1 })
        return NextResponse.json(organizers)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect()
        if (!isSuperAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
        }
        const { email } = await request.json()
        
        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

        // Check if already an organizer
        const existingOrg = await Organizer.findOne({ email })
        if (existingOrg) {
            return NextResponse.json({ error: 'Already an organizer' }, { status: 400 })
        }

        // Check if User exists (Attendee) -> Promote
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            // Create Organizer entry copying relevant data
            await Organizer.create({
                email: existingUser.email,
                name: existingUser.name,
                password: existingUser.password,
                role: 'organizer'
            })
            
            // Remove from User collection
            await User.deleteOne({ _id: existingUser._id })
            
            return NextResponse.json({ success: true, message: 'User promoted to Organizer' }, { status: 201 })
        } else {
            // Create new Organizer
            await Organizer.create({
                email,
                name: 'Organizer', // Default name
                role: 'organizer'
                // Password left undefined for first-login setup
            })
            
            return NextResponse.json({ success: true, message: 'Organizer added' }, { status: 201 })
        }

    } catch (error: any) {
        console.error("Admin Add Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect()
        if (!isSuperAdmin(request)) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
        }
        const { email } = await request.json()
        
        await Organizer.findOneAndDelete({ email })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}