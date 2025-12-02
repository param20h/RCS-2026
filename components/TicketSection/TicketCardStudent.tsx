import React from 'react'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

function TicketCard({
    setTicketType,
    setTicketBookingOpen,
}: {
    setTicketType: (val: string) => void
    setTicketBookingOpen: (val: boolean) => void
}) {
    const router = useRouter()
    return (
        <>
            <div className="card w-full max-w-sm glass-card text-white p-5 hover:scale-105 transition-transform duration-300 neon-border">
                <p className="font-bold text-4xl">Student Pass</p>
                <p className="mt-8 text-lg">
                    For students from other colleges and schools.
                </p>

                <div className="mt-8 text-lg">
                    <p className="text-primary">Includes: </p>
                    <div className="flex flex-col gap-2">
                        <p>
                            {' '}
                            - Welcome Kit Includes: 1 x ID-Lanyard,
                            Stickers
                        </p>
                        <p> - Access to CTF</p>
                        <p> - 2 x Meals Provided</p>
                        <p> - Complimentry Swags</p>
                        <p> - Conference Attendee Certificate</p>
                    </div>
                </div>
                <div className="button mt-8">
                    <Button
                        size={'full'}
                        onClick={() => {
                            router.push(
                                `${process.env.NEXT_PUBLIC_PAYMENT_WEBSITE}/standard_pass`
                            )
                        }}
                        disabled
                        className="bg-red-950"
                    >
                        Registrations are Closed
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TicketCard
