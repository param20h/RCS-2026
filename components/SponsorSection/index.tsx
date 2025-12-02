import React from 'react'
import SponsorsRow from './SponsorsRow'
import sponsorsData from '@/config/sponsors.json'

type Sponsor = {
    name: string
    logo: string
    url: string
}

type SponsorCategory = {
    category: string
    sponsors: Sponsor[]
}

function SponsorSection() {
    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28">
            <h2 className='font-bold text-5xl text-center lg:text-8xl lg:text-left text-primary '>Our Sponsors</h2>
                {sponsorsData.map(
                    (sponsorCategory: SponsorCategory, index: number) => (
                        <div key={index} className="mt-10">
                            <h2 className="text-4xl lg:text-6xl text-center font-semibold">{sponsorCategory.category}</h2>
                            <SponsorsRow sponsors={sponsorCategory.sponsors} />
                        </div>
                    )
                )}
        </section>
    )
}

export default SponsorSection
