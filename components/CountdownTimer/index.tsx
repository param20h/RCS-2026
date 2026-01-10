'use client'
import React, { useState, useEffect } from 'react'

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const targetDate = new Date('2026-01-30T00:00:00').getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now

            if (distance < 0) {
                clearInterval(interval)
                return
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex gap-4 md:gap-8 justify-center items-center mt-10 glass-card p-6 rounded-xl neon-border">
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-primary neon-text">
                    {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-gray-300 uppercase tracking-widest">
                    Days
                </span>
            </div>
            <span className="text-2xl md:text-4xl font-bold text-white mb-6">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-primary neon-text">
                    {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-gray-300 uppercase tracking-widest">
                    Hours
                </span>
            </div>
            <span className="text-2xl md:text-4xl font-bold text-white mb-6">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-primary neon-text">
                    {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-gray-300 uppercase tracking-widest">
                    Mins
                </span>
            </div>
            <span className="text-2xl md:text-4xl font-bold text-white mb-6">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold text-primary neon-text">
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-gray-300 uppercase tracking-widest">
                    Secs
                </span>
            </div>
        </div>
    )
}

export default CountdownTimer
