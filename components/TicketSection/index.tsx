import React, { useState } from 'react'
import TicketCardLPU from './TicketCardLPU'
import TicketCardStudent from './TicketCardStudent'
import TicketCardStandard from './TicketCardProf'
import BookTicketDialog from '../BookTicketDialog'

function TicketSection() {
    const [ticketBookingOpen, setTicketBookingOpen] = useState(false)
    const [bookTicketType, setBookTicketType] = useState('')
    return (
        <section id="ticketSection" className="flex flex-col lg:flex-row lg:h-screen max-w-7xl mx-auto px-4 lg:px-8 py-10 justify-center items-center gap-4 rcs-back-2">
            <TicketCardLPU setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <TicketCardStudent setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <TicketCardStandard setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <BookTicketDialog open={ticketBookingOpen} setOpen={setTicketBookingOpen} ticketType={bookTicketType} />
        </section>
    )
}

export default TicketSection
