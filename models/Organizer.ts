import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrganizer extends Document {
    name: string
    email: string
    password?: string
    role: 'organizer'
    addedAt: Date
}

const OrganizerSchema: Schema = new Schema({
    name: { type: String, default: 'Organizer' },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for first-time setup
    role: { type: String, default: 'organizer' },
    addedAt: { type: Date, default: Date.now }
})

const Organizer: Model<IOrganizer> = mongoose.models.Organizer || mongoose.model<IOrganizer>('Organizer', OrganizerSchema)

export default Organizer