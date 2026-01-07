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
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-4xl font-bold text-white mb-8">Get Your Tickets</h2>
                <div className="flex gap-4">
                    <a href="/register" className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all">
                        Registration Opens on 10th January
                    </a>
                </div>
            </div>
            {/* <TicketCardLPU setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <TicketCardStudent setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <TicketCardStandard setTicketType={setBookTicketType} setTicketBookingOpen={setTicketBookingOpen}/>
            <BookTicketDialog open={ticketBookingOpen} setOpen={setTicketBookingOpen} ticketType={bookTicketType} /> */}
        </section>
    )
}

export default TicketSection
