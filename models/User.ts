import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    password?: string
    contact_no: string
    uni_id?: string
    uni_name?: string
    where_you_reside: string
    team_name: string
    team_members: {
        name: string
        email: string
        contact_no: string
    }[]
    role: 'attendee' | 'organizer' | 'superadmin'
    registeredAt: Date
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_no: { type: String, required: true },
    uni_id: { type: String, default: 'N/A' },
    uni_name: { type: String, default: 'N/A' },
    where_you_reside: { type: String, required: true },
    team_name: { type: String, required: true },
    team_members: [{
        name: { type: String },
        email: { type: String },
        contact_no: { type: String }
    }],
    role: { 
        type: String, 
        enum: ['attendee', 'organizer', 'superadmin'], 
        default: 'attendee' 
    },
    registeredAt: { type: Date, default: Date.now }
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User