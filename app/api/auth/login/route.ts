import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Organizer from '@/models/Organizer'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        await dbConnect()
        const { email, password } = await request.json()

        // Super Admin Hardcoded Backdoor
        if (email === 'admin@rcs.com') {
            if (password === 'admin123') {
                 return NextResponse.json({
                    id: 'admin',
                    name: 'Super Admin',
                    email: 'admin@rcs.com',
                    role: 'superadmin',
                }, { status: 200 })
            } else {
                 return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 })
            }
        }

        // 2. Check Organizer Collection First
        let organizer = await Organizer.findOne({ email })

        if (organizer) {
            // Scenario: First time login (Password not set)
            if (!organizer.password) {
                const hashedPassword = await bcrypt.hash(password, 10)
                organizer.password = hashedPassword
                await organizer.save()
                
                // Login successful after setting password
                const orgData = organizer.toObject()
                orgData.id = orgData._id.toString()
                delete orgData._id
                delete orgData.password
                return NextResponse.json(orgData, { status: 200 })
            }

            // Scenario: Regular Organizer Login
            const isMatch = await bcrypt.compare(password, organizer.password)
            if (!isMatch) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
            }

            const orgData = organizer.toObject()
            orgData.id = orgData._id.toString()
            delete orgData._id
            delete orgData.password
            return NextResponse.json(orgData, { status: 200 })
        }

        // 3. Check User Collection (Attendees)
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found. Please register first.' },
                { status: 404 }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const userData = user.toObject()
        userData.id = userData._id.toString()
        delete userData._id
        delete userData.password

        return NextResponse.json(userData, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}